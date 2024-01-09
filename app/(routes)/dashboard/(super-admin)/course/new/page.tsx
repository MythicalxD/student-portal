"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Skill } from "../../../(super-admin)/skills/components/columns";
import { Check, ChevronsUpDown } from "lucide-react";
import { Department } from "../../department/components/columns";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  skills: z.array(z.number()),
  department: z.array(z.number()),
});

const ImagePicker: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [departmentData, setDepartmentData] = useState<Department[]>([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState("");

  const router = useRouter();

  const handleUpload = async (
    name: string,
    description: string,
    skills: number[],
    department: number[]
  ) => {
    try {
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

      const dataToSend = {
        name: name,
        desc: description,
        skills: skills,
        department: department,
        token: authToken,
        session: session,
      };

      console.log(dataToSend);

      const apiUrl = "/api/course/upload";
      const response = await axios.post(apiUrl, dataToSend);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Course Created");
        router.push("/dashboard/course");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Creating Course");
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
      skills: [],
      department: []
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);

    handleUpload(
      values.name,
      values.description,
      values.skills,
      values.department
    );
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

  async function getDataDepartment(
    token: string,
    session: string
  ): Promise<Department[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/department";

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error();
      return error;
    }
  }

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

      const fetchedDataSkill = await getDataSkill(authToken!, session!);
      setSkillData(fetchedDataSkill);
      const fetchedDataDepartment = await getDataDepartment(authToken!, session!);
      setDepartmentData(fetchedDataDepartment);
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div className="m-4">
      <p className="text-3xl text-black font-bold mb-1">Create new Job</p>
      <p className="text-sm text-gray-500 mb-2">
        Please provide information for creating a new job profile.
      </p>

      <Link
        href="/dashboard/manage-jobs"
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
                  <FormLabel>Job Title</FormLabel>
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
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter job description in detail."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-y-4">
              <FormLabel>Skills in Job</FormLabel>
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
                                      setOpen(false);
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

            <div className="flex flex-col gap-y-4">
              <FormLabel>Department in Course</FormLabel>
              <Popover open={open1} onOpenChange={setOpen1}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open1}
                    className="w-[300px] justify-between"
                  >
                    {"Select Department..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Department..." />
                    <CommandEmpty>No Department found.</CommandEmpty>
                    <CommandGroup>
                      {departmentData.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="department"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <CommandItem
                                    key={item.id}
                                    onSelect={(currentValue) => {
                                      setValue1(
                                        currentValue === value1 ? "" : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.id
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
                                                item.id
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
