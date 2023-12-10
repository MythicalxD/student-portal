"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { Modal1 } from "../ui/modal1";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface NewModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
  loading: boolean;
}

export const NewModal: React.FC<NewModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [error, setError] = useState(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
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

      const dataToSend = {
        name: values.name,
        token: authToken,
        session: session,
      };

      const apiUrl = "/api/job/upload";
      const response = await axios.post(apiUrl, dataToSend);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Job Created");
        router.push("/dashboard/jobs");
      }
    } catch (error) {
      toast.error("Error Creating Job");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  }

  return (
    <Modal1
      title="Create a New Job"
      description="Enter the name of the job you want to create."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={`Enter Job name`} {...field} />
                  </FormControl>
                  {error ? (
                    <FormDescription>The text do not match!</FormDescription>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex pt-6 space-x-2 items-center justify-end w-full">
              <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} variant="default" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal1>
  );
};
