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
import FormData from "form-data";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job, JobCategory } from "../components/columns";
import { Company } from "../../../(student)/student-company/components/columns";
import { Course } from "../../../(super-admin)/course/components/columns";
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

const formSchema = z.object({
  title: z.string(),
  company_id: z.string(),
  status: z.string(),
  description: z.string(),
  location: z.string(),
  job_category_id: z.string(),
  experience: z.string(),
  salary: z.string(),
  web_url: z.string(),
  skills: z.array(z.number()),
  courses: z.array(z.number()),
});

const ImagePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [companyData, setDataCompany] = useState<Company[]>([]);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [jobData, setJobData] = useState<JobCategory[]>([]);
  const [skillData, setSkillData] = useState<Skill[]>([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState("");

  const router = useRouter();

  const handleUpload = async (
    name: string,
    description: string,
    status: string,
    location: string,
    skills: number[],
    courses: number[],
    experience: string,
    url: string,
    salary: string,
    category: string,
    company: string
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
        status: status,
        location: location,
        skills: skills,
        courses: courses,
        category: category,
        experience: experience,
        salary: salary,
        url: url,
        company: company,
        token: authToken,
        session: session,
      };

      console.log(dataToSend);

      const apiUrl = "/api/manage-jobs/job/upload";
      const response = await axios.post(apiUrl, dataToSend);

      console.log(response.data);
      const { token } = response.data;
      if (token === "done") {
        toast.success("Job Created");
        router.push("/dashboard/manage-jobs-admin");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Creating Job");
      console.error("Error uploading file:", error);
      // Handle the error
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      courses: [],
      skills: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(
      values.title,
      values.description,
      values.status,
      values.location,
      values.skills,
      values.courses,
      values.experience,
      values.web_url,
      values.salary,
      values.job_category_id,
      values.company_id
    );
  }

  async function getDataCompany(
    token: string,
    session: string
  ): Promise<Company[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/manage-jobs/job/get/company";

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error();
      return error;
    }
  }

  async function getDataCourses(
    token: string,
    session: string
  ): Promise<Course[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/manage-jobs/job/get/course";

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error();
      return error;
    }
  }

  async function getDataJob(token: string, session: string): Promise<JobCategory[]> {
    const dataToSend = {
      id: token,
      session: session,
    };

    const apiUrl = "/api/manage-jobs/job/get/jobs";

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error();
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

      const fetchedDataCompany = await getDataCompany(authToken!, session!);
      const fetchedDataCourses = await getDataCourses(authToken!, session!);
      const fetchedDataJob = await getDataJob(authToken!, session!);
      const fetchedDataSkill = await getDataSkill(authToken!, session!);
      setDataCompany(fetchedDataCompany);
      setCourseData(fetchedDataCourses);
      setJobData(fetchedDataJob);
      setSkillData(fetchedDataSkill);
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
              name="title"
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
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job_category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Job Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Job Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobData.map((data) => (
                        <SelectItem value={`${data.id}`} key={data.id}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companyData.map((data) => (
                        <SelectItem value={`${data.id}`} key={data.id}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Salary</FormLabel>
                  <FormControl>
                    <Input placeholder="Minimum 2 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="web_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Web URL</FormLabel>
                  <FormControl>
                    <Input placeholder="http://m.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-y-4">
              <FormLabel>Courses in Job</FormLabel>
              <Popover open={open1} onOpenChange={setOpen1}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open1}
                    className="w-[300px] justify-between"
                  >
                    {"Select Courses..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search courses..." />
                    <CommandEmpty>No courses found.</CommandEmpty>
                    <CommandGroup>
                      {courseData.map((item, index) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="courses"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0 mt-2"
                              >
                                <FormControl>
                                  <CommandItem
                                    key={item.id}
                                    value={item.id.toString()}
                                    onSelect={(currentValue) => {
                                      setValue1(
                                        currentValue === value1 ? "" : currentValue
                                      );
                                      setOpen1(true);
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(
                                        Number.parseInt(item.id.toString())
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
                                                Number.parseInt(item.id.toString())
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
