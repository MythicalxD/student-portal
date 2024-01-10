"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { GalleryHorizontal, GraduationCap, LocateIcon, Settings2, Timer, TimerOff, User, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Job, JobFull } from "@/utils/types";

interface IndustryProps {
  params: {
    id: string;
  };
}

async function getData(
  token: string,
  session: string,
  id: string
): Promise<Job> {
  const dataToSend = {
    token: token,
    session: session,
    id: id,
  };

  const apiUrl = "/api/manage-jobs/job/get";

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


const Industry: React.FC<IndustryProps> = ({ params }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<Job>();

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
      console.log(fetchedData);

    };

    fetchData();

  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div>
        <div className="flex flex-col">
          <p className="text-xl font-bold">Job Details</p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <GraduationCap className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Course Name</p>
                <p className="text-sm text-muted-foreground">
                  {data?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <GalleryHorizontal className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Company Name</p>
                <p className="text-sm text-muted-foreground">
                  {data?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Settings2 className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Skills</p>
                <p className="text-sm text-muted-foreground">
                  {data?.job_description.skills.map((skill) => (<Badge className="mr-1 mt-1" variant={"outline"} >{skill}</Badge>))}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Timer className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Experience</p>
                <p className="text-sm text-muted-foreground">
                  {data?.job_description.exprience}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <LocateIcon className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Location</p>
                <p className="text-sm text-muted-foreground">
                  {data?.job_description.location}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Wallet className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Salary</p>
                <p className="text-sm text-muted-foreground">
                  {data?.job_description.salary}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <GraduationCap className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Courses</p>
                <p className="text-sm text-muted-foreground">
                  {data?.courses.map((skill) => (<Badge className="mr-1 mt-1" variant={"outline"} >{skill}</Badge>))}

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Industry;
