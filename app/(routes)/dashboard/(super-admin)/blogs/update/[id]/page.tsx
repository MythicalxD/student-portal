"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import axios from "axios";
import FormData from "form-data";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Factory, Image } from "lucide-react";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Link from "next/link";
import { BlogPost } from "@/utils/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IndustryProps {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(5000),
  status: z.string().min(2)
});

async function getData(
  token: string,
  session: string,
  id: string
): Promise<BlogPost> {
  const dataToSend = {
    token: token,
    session: session,
    id: id,
  };

  const apiUrl = "/api/blogs/get";

  try {
    const response = await axios.post(apiUrl, dataToSend);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      return error;
    } else {
      console.error("Error:", error);
      return error;
    }
  }
}

const UpdateIndustry: React.FC<IndustryProps> = ({ params }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<BlogPost>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const session = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="))
        ?.split("=")[1];

      const fetchedData = await getData(authToken!, session!, params.id);
      setData(fetchedData);

      // Populate the form fields with the fetched data
      form.setValue("name", fetchedData.title);
      form.setValue("description", fetchedData.content);
      form.setValue("status", fetchedData.status);
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: ""
    },
  });

  const handleUpload = async (
    name: string,
    description: string,
    status: string,
    id: string
  ) => {
    try {

      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const session = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="))
        ?.split("=")[1];

      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", description);
      formData.append("status", status);
      formData.append("id", id);

      // add the logo if it is not empty/null
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        formData.append("file", "null");
      }

      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/blogs/update";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Blog Updated");
        router.push("/dashboard/blogs");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Blog");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(values.name, values.description, values.status, params.id);
    console.log(values);
  }

  return (
    <div className="m-4">
      <div className="flex flex-col w-[80vw]">
        <div className="flex">
          <img
            src={data?.image_url.replace(
              "https://s3.amazonaws.com/sambucketcoduty/",
              "https://sambucketcoduty.s3.ap-south-1.amazonaws.com/"
            )}
            alt="logo"
            className="w-[55px] h-[55px] rounded-md object-cover mr-4"
          />
          <div className="flex flex-col">
            <p className="text-3xl text-black font-bold">Update Blog</p>
            <p className="text-sm text-gray-600 mb-2">
              Please provide updated information for blog.
            </p>
          </div>
        </div>
        <Separator className="mb-4" />
      </div>

      <Link
        href="../"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-[2rem] top-[5rem]"
        )}
      >
        Go Back
      </Link>

      <div className="flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-[500px]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter industry description in detail."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "w-[150px] cursor-pointer relative overflow-hidden"
                  )}
                >
                  <input
                    type="file"
                    id="image"
                    accept=".jpg, .jpeg, .png"
                    className="absolute top-10 inset-0 opacity-0 cursor-pointer" // Hide the actual file input
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center justify-center w-full h-full p-2 bg-gray-200 rounded-md cursor-pointer"
                  >
                    <Image className="w-[20px] h-[20px] mr-2" />
                    {selectedFile ? (
                      <span>Uploaded</span>
                    ) : (
                      <span>Update Image</span>
                    )}
                  </label>
                </div>
                {selectedFile ? <span>{selectedFile.name}</span> : null}
              </div>

              <FormDescription>
                Leave the Image blank if there is no update.
              </FormDescription>

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Details
              </Button>
            </div>
          </form>
        </Form>
        <Separator orientation="vertical" className="h-auto mx-8" />

        <div className="flex flex-col">
          <p className="text-xl font-bold">Blog Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Factory className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Created On</p>
                <p className="text-sm text-muted-foreground">
                  {data?.created_at}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Factory className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Created By</p>
                <p className="text-sm text-muted-foreground">
                  {data?.created_by}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Factory className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Updated By</p>
                <p className="text-sm text-muted-foreground">
                  {data?.updated_by}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateIndustry;
