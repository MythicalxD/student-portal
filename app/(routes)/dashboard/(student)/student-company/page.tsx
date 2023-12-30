"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CompanyCard } from "./components/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { JobStudent } from "@/utils/types";
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
    window.location.href = "/login";
    console.error();
    return error;
  }
}

export default function DemoPage() {
  const [data, setData] = useState<JobStudent[]>([]);

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
        </div>
        <ScrollArea>
          <div className="flex flex-col h-[80vh] space-y-4 pb-4">
            {data.map((job) => (
              <CompanyCard item={job} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
