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

import { Input } from "@/components/ui/input";

import axios from "axios";
import FormData from "form-data";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Factory } from "lucide-react";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { Course } from "../../components/columns";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Skill } from "../../../skills/components/columns";
import { Department } from "../../../department/components/columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompanyProps {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  skills: z.array(z.number()),
  department: z.string(),
});

async function getData(
  token: string,
  session: string,
  id: string
): Promise<Course> {
  const dataToSend = {
    token: token,
    session: session,
    id: id,
  };

  const apiUrl = "/api/course/get";

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
  const [data, setData] = useState<Course>();
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [departmentData, setDepartmentData] = useState<Department[]>([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState("3");

  const router = useRouter();

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

      const fetchedData = await getData(authToken!, session!, params.id);
      setData(fetchedData);

      const fetchedDataSkill = await getDataSkill(authToken!, session!);
      setSkillData(fetchedDataSkill);

      const fetchedDataDepartment = await getDataDepartment(authToken!, session!);
      setDepartmentData(fetchedDataDepartment);

      const skillIndices: number[] = [];
      await fetchedDataSkill.forEach((skill) => {
        // Assuming skill.name is the name of the skill you want to match
        if (fetchedData.skills.includes(skill.name)) {
          skillIndices.push(parseInt(skill.id));
        }
      });

      var departmentID: string = "";
      await fetchedDataDepartment.forEach((department) => {
        if (department.name === fetchedData.department) {
          departmentID = department.id.toString();
          setValue1(departmentID);
        }
      });

      // Populate the form fields with the fetched data
      form.setValue("name", fetchedData.name);
      form.setValue("skills", skillIndices);
      form.setValue("department", departmentID);
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
      skills: [],
      department: ""
    },
  });

  const handleUpload = async (
    name: string,
    desc: string,
    skills: number[],
    department: string,
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
      formData.append("desc", desc);
      formData.append("skills", skills);
      formData.append("department", department);
      formData.append("id", id);
      formData.append("session", session);
      formData.append("token", authToken);

      const apiUrl = "/api/course/update";

      // Axios automatically sets the correct headers for FormData
      const response = await axios.post(apiUrl, formData);

      const { token } = response.data;
      if (token === "done") {
        toast.success("Course Updated");
        router.push("/dashboard/course");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Updating Course");
      // Handle the error
    }
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    handleUpload(
      values.name,
      values.description!,
      values.skills,
      values.department,
      params.id
    );
  }

  return (
    <div className="m-4">
      <div className="flex flex-col w-[80vw]">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-3xl text-black font-bold">Update Course</p>
            <p className="text-sm text-gray-600 mb-2">
              Please provide updated information for Courses.
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course description"
                      className="resize-none"
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
                                      setOpen(true);
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(
                                        parseInt(item.id)
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                            ...field.value!,
                                            item.id,
                                          ])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== parseInt(item.id)
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
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departmentData.map((data) => (
                        <SelectItem value={data.id.toString()} key={data.id}>
                          {data.name}
                        </SelectItem>
                      ))}
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
                <p className="text-sm font-medium leading-none">Created On</p>
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
                <p className="text-sm font-medium leading-none">Updated On</p>
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

export default UpdateCompany;
