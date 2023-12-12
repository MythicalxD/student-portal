"use client";
import React, { useState, useEffect } from "react";
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
import { Factory } from "lucide-react";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { SkillFull } from "../../components/columns";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

interface SkillProps {
  params: {
    id: string;
    description: string;
  };
}

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
});

async function getData(
  token: string,
  session: string,
  id: string
): Promise<SkillFull> {
  const dataToSend = {
    token: token,
    session: session,
    id: id,
  };

  const apiUrl = "/api/skill/get";

  try {
    const response = await axios.post(apiUrl, dataToSend);
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

const UpdateSkill: React.FC<SkillProps> = ({ params }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<SkillFull>();

  const router = useRouter();

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
      form.setValue("name", fetchedData.name);
      form.setValue("description", fetchedData.description);
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
    },
  });

  const handleUpload = async (name: string, desc: string, id: string) => {
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
      formData.append("desc", desc);
      formData.append("id", id);
      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/skill/update";
      const response = await axios.post(apiUrl, formData);

      const { token } = response.data;
      if (token === "done") {
        toast.success("Skill Updated");
        router.push("/dashboard/skills");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Skill");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(values.name, values.description, params.id);
  }

  return (
    <div className="m-4">
      <div className="flex flex-col w-[80vw]">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-3xl text-black font-bold">Update Skill</p>
            <p className="text-sm text-gray-600 mb-2">
              Please provide updated information for skill.
            </p>
          </div>
        </div>
        <Separator className="mb-4" />
      </div>

      <Link
        href="../"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-[2rem] top-[6rem]"
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
                  <FormLabel>Skill Name</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter industry description in detail."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and industries.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4">
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
          <p className="text-xl font-bold">Skill Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Factory className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Created At</p>
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
                <p className="text-sm font-medium leading-none">Updated At</p>
                <p className="text-sm text-muted-foreground">
                  {data?.updated_at}
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

export default UpdateSkill;
