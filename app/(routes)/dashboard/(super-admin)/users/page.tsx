"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

import axios from "axios";
import FormData from "form-data";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  pass: z.string().min(6).max(50),
  passC: z.string().min(6).max(50),
  name: z.string().min(2),
  phone: z.string(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  sid: z.string(),
  type: z.string(),
});

const ImagePicker: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [type, setType] = useState("Account");

  const router = useRouter();

  const handleUpload = async (
    name: string,
    email: string,
    pass: string,
    dob: string,
    phone: string,
    sid: string,
    type: string
  ) => {
    try {
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
      formData.append("pass", pass);
      formData.append("dob", dob);
      formData.append("phone", phone);
      formData.append("sid", sid);
      formData.append("type", type);

      formData.append("session", session);
      formData.append("token", authToken);

      let apiUrl = "/api/users";

      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("User Created");
        router.push("/dashboard/users");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Creating User");
      // Handle the error
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pass: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (values.passC != values.pass) {
      setIsLoading(false);
      toast.error("Confirm Password does not match!");
      return;
    }

    const formattedDate = format(values.dob, "MM-dd-yyyy");

    console.log(formattedDate); // Output: 01-12-2023
    handleUpload(
      values.name,
      values.email,
      values.pass,
      formattedDate,
      values.phone,
      values.sid,
      values.type
    );
    console.log(values);
  }

  return (
    <div className="m-4">
      <p className="text-3xl text-black font-bold mb-1">Add new Users</p>
      <p className="text-sm text-gray-500 mb-2">
        You can create new user accounts with email & pass.
      </p>

      <Link
        href="/dashboard/users"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin Account</SelectItem>
                      <SelectItem value="TEACHER">Teacher Account</SelectItem>
                      <SelectItem value="STUDENT">Student Account</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You have to select an account to proceed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Account Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This email cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 000-0000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[500px]">
                  <FormLabel>Date of birth</FormLabel>
                  <DatePicker
                    onChange={field.onChange}
                    value={field.value}
                    slotProps={{ textField: { size: 'small' } }}
                    format="dd-MM-yyyy"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter {type} ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Account Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Minimum 6 Characters"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Minimum 6 Characters"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4">
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
