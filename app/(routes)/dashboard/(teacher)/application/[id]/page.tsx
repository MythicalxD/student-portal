"use client";
import { Separator } from "@/components/ui/separator";
import { Download, Factory, GraduationCap, Info, PersonStanding, Timer, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { JobApplication } from "@/utils/types";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(1000, {
      message: "Comment must not be longer than 1000 characters.",
    }),
  status: z.string()
})


interface AppProps {
  params: {
    id: string;
  };
}

async function getData(
  token: string,
  session: string,
  id: string
): Promise<JobApplication> {
  const dataToSend = {
    token: token,
    session: session,
    id: id,
  };

  const apiUrl = "/api/applications/get";

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

const Application: React.FC<AppProps> = ({ params }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleUpload = async (
    comment: string,
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
      formData.append("comment", comment);
      formData.append("status", status);
      formData.append("id", id);
      formData.append("session", session!);
      formData.append("token", authToken!);

      const apiUrl = "/api/applications/update";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Application Updated");
        router.push("/dashboard/application");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Application");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    handleUpload(data.comment, data.status, params.id);
    console.log(data);
  }

  const [data, setData] = useState<JobApplication>();

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

    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <main className="flex min-h-screen flex-col p-4">
      <Link
        href="./"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-[2rem] top-[5rem] z-0"
        )}
      >
        Go Back
      </Link>
      <div className="flex flex-col mb-4 ml-2">
        <div className="flex text-3xl mb-2 text-black font-bold items-center">
          <User className="w-8 h-8 mr-2" /> {data?.student_name}
        </div>
        <Separator />
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex relative w-[500px]">
            <img src="/app-bg.png" alt="Application background" className="absolute" />
            <p className="text-4xl text-white absolute top-[20px] left-[20px]" >{data?.company_name}</p>
            <p className="text-xl text-gray-300 absolute top-[80px] left-[20px]" >Company Description here</p>
          </div>

          <div className="flex flex-col mt-[150px] mb-4 ml-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Leave a Comment for the approved application."
                          className="w-[400px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can add comment to students application.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Submitted">Submitted</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                          <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                          <SelectItem value="Under Review">Under Review</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex text-3xl mb-2 text-black font-bold items-center gap-x-4 mt-4">
                  <Button variant="outline" type="submit">Submit</Button>
                </div>
              </form>
            </Form>

          </div>

        </div>

        <Separator orientation="vertical" className="h-auto mx-8" />

        <div className="flex flex-col">
          <p className="text-xl font-bold">Application Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Timer className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Created On</p>
                <p className="text-sm text-muted-foreground">
                  {data?.created_date}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <GraduationCap className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Job Name</p>
                <p className="text-sm text-muted-foreground">
                  {data?.job_name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Factory className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Status</p>
                <p className="text-sm text-muted-foreground">
                  {data?.status}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2 cursor-pointer hover:bg-gray-200">
              <Download className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Download Resume</p>
                <p className="text-sm text-muted-foreground">
                  Click to download
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Application;
