"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CompanyCard } from "./components/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ApplicationStatus, JobStudent } from "@/utils/types";
import { Button } from "@/components/ui/button";

async function getData(token: string, session: string): Promise<JobStudent[]> {
  const dataToSend = {
    id: token,
    session: session,
  };

  const apiUrl = "/api/manage-jobs/job";

  try {
    const response = await axios.post(apiUrl, dataToSend);
    console.log(response);
    return response.data;
  } catch (error: any) {
    //window.location.href = "/login";
    console.error();
    return error;
  }
}

async function getApplication(token: string, session: string): Promise<ApplicationStatus[]> {
  const dataToSend = {
    id: token,
    session: session,
  };

  const apiUrl = "/api/my-application";

  try {
    const response = await axios.post(apiUrl, dataToSend);
    console.log(response);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }

  } catch (error: any) {
    //window.location.href = "/login";
    console.error();
    return [];
  }
}

const findApplicationStatusById = (name: string, statuses: ApplicationStatus[] | undefined | null): ApplicationStatus | undefined => {

  console.log(statuses);

  if (!statuses || statuses.length === 0) {
    return undefined;
  } else {
    var a = statuses.find(status => status.job_name == name);
    console.log(a);
    return a;
  }

};


export default function DemoPage() {
  const [data, setData] = useState<JobStudent[]>([]);
  const [data1, setData1] = useState<ApplicationStatus[]>([]);

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
      const fetchedData1 = await getApplication(authToken!, session!);
      setData1(fetchedData1);
    };

    fetchData(); // Call the fetchData function when the component mounts

    // Optionally, you can include a cleanup function here if needed
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div className="w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Finest Jobs Opportunities
        </h2>
        <p className="text-sm text-muted-foreground">
          where your aspirations meet their perfect match.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="w-full">
        <div className="relative mb-4 mr-4 flex">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
          <Button type="submit" className="ml-2" >Search</Button>
          <Button variant={"outline"} className="ml-2" >Filters</Button>
        </div>
        <ScrollArea>
          <div className="flex flex-col h-[80vh] space-y-4 pb-4">
            {data.map((job) => (
              <CompanyCard
                key={job.id}
                item={job}
                status={findApplicationStatusById(job.title, data1)?.status}
              />
            ))}

          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
