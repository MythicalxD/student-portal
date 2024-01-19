"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import { Icons } from "@/components/icons";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import FormData from "form-data";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { Industry } from "@/utils/types";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  website: z.string().url(),
  email: z.string().email(),
  contact: z.string().min(2).length(10),
  address: z.string().min(2),
  linkedIn: z.string().url(),
  industry: z.string({
    required_error: "Please select an Industry.",
  }),
});
// industry => dropdown selector
// logo => file picker

const ImagePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<Industry[]>([]);

  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (
    name: string,
    email: string,
    address: string,
    contact: string,
    website: string,
    linkedIn: string,
    industry: string
  ) => {
    try {
      if (!selectedFile) return;
      //TODO add error on image not selected
      // Fetch the session
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
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("linkedIn", linkedIn);
      formData.append("website", website);
      formData.append("industry", industry);

      formData.append("file", selectedFile);
      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/company/upload";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Company Created");
        router.push("/dashboard/company");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Creating Company");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      linkedIn: "",
      website: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(
      values.name,
      values.email,
      values.address,
      values.contact,
      values.website,
      values.linkedIn,
      values.industry
    );
    console.log(values);
  }

  async function getData(token: string, session: string): Promise<Industry[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/industry";

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response);
      return response.data;
    } catch (error: any) {
      window.location.href = "/login";
      console.error("Error:", error);
      return error;
    }
  }

  // get the industries here
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

      const fetchedData = await getData(authToken!, session!);
      setData(fetchedData);
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div className="m-4">
      <p className="text-3xl text-black font-bold mb-1">Create new Company</p>
      <p className="text-sm text-gray-500 mb-2">
        Please provide information for creating a new company profile.
      </p>

      <Link
        href="/dashboard/company"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-[2rem] top-[6rem] z-0"
        )}
      >
        Go Back
      </Link>
      <Separator className="mb-4" />
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
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="company@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="+91(0000-000000)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Only enter valid website url (https only).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company linkedIn Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.linkedin.com/@example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Company Industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.length != 0 &&
                        data.map((item) => (
                          <SelectItem key={item.name} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a Industry for company or{" "}
                    <Link href="/dashboard/industry/new">
                      <b>
                        <u>Create Industry</u>
                      </b>
                    </Link>
                    .
                  </FormDescription>
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
                      <span>Upload Logo</span>
                    )}
                  </label>
                </div>
                {selectedFile ? <span>{selectedFile.name}</span> : null}
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ImagePicker;
