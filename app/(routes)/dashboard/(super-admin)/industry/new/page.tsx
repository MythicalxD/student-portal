"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
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
import { Image } from "lucide-react";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(5000),
});

const ImagePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (name: string, description: string) => {
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
      formData.append("desc", description);
      formData.append("file", selectedFile);
      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/industry/upload";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Industry Created");
        router.push("/dashboard/industry");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Creating Jobs");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(values.name, values.description);
    console.log(values);
  }

  return (
    <div className="m-4">
      <p className="text-3xl text-black font-bold mb-1">Create new Industry</p>
      <p className="text-sm text-gray-500 mb-2">
        Please provide information for creating a new industry profile.
      </p>

      <Link
        href="/dashboard/industry"
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
                  <FormLabel>Industry Name</FormLabel>
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
