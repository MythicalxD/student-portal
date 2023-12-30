"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Company } from "../student-company/components/columns";
import { AlbumArtwork } from "../student-company/components/card-old";

async function getData(token: string, session: string): Promise<Company[]> {
    const dataToSend = {
        id: token,
        session: session,
    };

    const apiUrl = "/api/company";

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
    const [data, setData] = useState<Company[]>([]);

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
        <div className="container mx-auto">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Unlock Opportunities
                </h2>
                <p className="text-sm text-muted-foreground">
                    Explore All Featured Companies.
                </p>
            </div>
            <Separator className="my-4" />
            <ScrollArea>
                <div className="flex space-x-4 pb-4">
                    {data.map((company) => (
                        <AlbumArtwork
                            key={company.name}
                            company={company}
                            className="w-[150px]"
                            aspectRatio="square"
                            width={150}
                            height={150}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}