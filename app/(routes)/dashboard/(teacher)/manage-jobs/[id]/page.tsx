"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { GalleryHorizontal, GraduationCap, LocateIcon, Settings2, Timer, TimerOff, User, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobTeacher } from "@/utils/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skill } from "../../../(super-admin)/skills/components/columns";

interface IndustryProps {
  params: {
    id: string;
  };
}

async function getData(
  token: string,
  session: string,
  id: string
): Promise<JobTeacher> {
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


const Industry: React.FC<IndustryProps> = ({ params }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<JobTeacher>();
  const [skillData, setSkillData] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState([""]);

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

      const skillNames: string[] = [];
      await fetchedDataSkill.forEach((skill) => {
        // Assuming skill.name is the name of the skill you want to match
        if (fetchedData.skills.includes(parseInt(skill.id))) {
          skillNames.push(skill.name);
        }
      });

      setSkillName(skillNames);

    };

    fetchData();

  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div>
        <div className="flex flex-col">
          <Link
            href="./"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "absolute right-[2rem] top-[5rem]"
            )}
          >
            Go Back
          </Link>
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
                  {data?.company_name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Settings2 className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Skills</p>
                <p className="text-sm text-muted-foreground">
                  {skillName.map((skill: string) => (<Badge className="mr-1 mt-1" variant={"outline"} >{skill}</Badge>))}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Timer className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Experience</p>
                <p className="text-sm text-muted-foreground">
                  {data?.experience}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <LocateIcon className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Location</p>
                <p className="text-sm text-muted-foreground">
                  {data?.location}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <Wallet className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Salary</p>
                <p className="text-sm text-muted-foreground">
                  {data?.salary}
                </p>
              </div>
            </div>

            {/* <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
              <GraduationCap className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Courses</p>
                <p className="text-sm text-muted-foreground">
                  {data?.courses?.map((skill) => (<Badge className="mr-1 mt-1" variant={"outline"} >{skill}</Badge>))}

                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Industry;
