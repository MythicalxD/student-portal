"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Image } from "lucide-react";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import axios from "axios";
import FormData from "form-data";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { Training } from "../components/columns";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skill } from "../../skills/components/columns";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2),
  zoom_link: z.string().url(),
  time: z.string().min(2),
  type: z.string().min(2),
  status: z.string().min(2),
  skills: z.array(z.number()),
});
// industry => dropdown selector
// logo => file picker

const ImagePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<Training[]>([]);
  const [skillData, setSkillData] = useState<Skill[]>([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");


  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (
    name: string,
    description: string,
    zoom_link: string,
    time: string,
    type: string,
    status: string,
    skills: number[],
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
      formData.append("description", description);
      formData.append("zoom_link", zoom_link);
      formData.append("time", time);
      formData.append("type", type);
      formData.append("status", status);
      formData.append("skills", skills);

      formData.append("file", selectedFile);
      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/training/upload";
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Training Created");
        router.push("/dashboard/training");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Creating Training");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      skills: [],
      description: "",
      zoom_link: "",
      time: "",
      type: "",
      status: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(
      values.name,
      values.description,
      values.zoom_link,
      values.time,
      values.type,
      values.status,
      values.skills
    );
    console.log(values);
  }

  async function getData(token: string, session: string): Promise<Training[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/training";

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

  async function getDataSkill(
    token: string,
    session: string
  ): Promise<Skill[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/manage-jobs/job/get/skills";

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error();
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
      const fetchedDataSkill = await getDataSkill(authToken!, session!);
      setSkillData(fetchedDataSkill);
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div className="m-4">
      <p className="text-3xl text-black font-bold mb-1">Create new Training</p>
      <p className="text-sm text-gray-500 mb-2">
        Please provide information for creating a new training profile.
      </p>

      <Link
        href="./"
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
                  <FormLabel>Training Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is public display title.
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
                  <FormLabel>Training Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Course description in detail."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Time</FormLabel>
                  <FormControl>
                    <Input placeholder="yyyy-mm-ddThh:MM:ss.000000" {...field} />
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LIVE">Live</SelectItem>
                      <SelectItem value="RECORDED">Recorded</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zoom_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Zoom Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.zoom.com/@example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-y-4">
              <FormLabel>Skills in Training</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                  >
                    {"Select Skills..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search skills..." />
                    <CommandEmpty>No skills found.</CommandEmpty>
                    <CommandGroup>
                      {skillData.map((item, index) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="skills"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value ? "" : currentValue
                                      );
                                      setOpen(true);
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(
                                        Number.parseInt(item.id)
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !==
                                                Number.parseInt(item.id)
                                            )
                                          );
                                      }}
                                    />
                                  </CommandItem>
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

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
