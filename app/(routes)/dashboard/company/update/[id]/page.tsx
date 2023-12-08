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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import axios from "axios";
import FormData from "form-data";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Factory } from "lucide-react";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { CompanyFull } from "../../components/columns";
import Link from "next/link";

interface CompanyProps {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(2),
  address: z.string().min(2),
  status: z.string({
    required_error: "Please select an Status.",
  }),
});

async function getData(
  token: string,
  session: string,
  id: string
): Promise<CompanyFull> {
  const dataToSend = {
    token: token,
    session: session,
    id: id,
  };

  const apiUrl = "/api/company/get";

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

const UpdateCompany: React.FC<CompanyProps> = ({ params }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<CompanyFull>();

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
      form.setValue("status", fetchedData.status);
      form.setValue("email", fetchedData.company_email);
      form.setValue("contact", fetchedData.company_contact);
      form.setValue("address", fetchedData.company_address);
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      status: "Active",
    },
  });

  const handleUpload = async (
    name: string,
    email: string,
    contact: string,
    address: string,
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
      formData.append("email", email);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("status", status);
      formData.append("id", id);
      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/company/update";
      const response = await axios.post(apiUrl, formData);

      const { token } = response.data;
      if (token === "done") {
        toast.success("Company Updated");
        router.push("/dashboard/company");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Company");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(
      values.name,
      values.email,
      values.contact,
      values.address,
      values.status,
      params.id
    );
  }

  return (
    <div className="m-4">
      <div className="flex flex-col w-[80vw]">
        <div className="flex">
          <img
            src={data?.company_logo.replace(
              "https://s3.amazonaws.com/sambucketcoduty/",
              "https://sambucketcoduty.s3.ap-south-1.amazonaws.com/"
            )}
            alt="logo"
            className="w-[55px] h-[55px] rounded-md object-cover mr-4"
          />
          <div className="flex flex-col">
            <p className="text-3xl text-black font-bold">Update Company</p>
            <p className="text-sm text-gray-600 mb-2">
              Please provide updated information for company profile.
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Company Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Active"}>Active</SelectItem>
                      <SelectItem value={"Inactive"}>InActive</SelectItem>
                    </SelectContent>
                  </Select>
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
          <p className="text-xl font-bold">Company Details</p>
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
                  {data?.createdby}
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
                  {data?.updatedby}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompany;
