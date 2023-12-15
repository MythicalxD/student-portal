"use client";
import { useState, useEffect } from "react";
import { Application, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import axios from "axios";

async function getData(token: string, session: string): Promise<Application[]> {
  const dataToSend = {
    id: token,
    session: session,
  };

  const apiUrl = "/api/manage-applications/application";

  try {
    const response = await axios.post(apiUrl, dataToSend);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error();
    return error;
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Application[]>([]);

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
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-extrabold mb-4">ALL APPLICATIONS</p>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
