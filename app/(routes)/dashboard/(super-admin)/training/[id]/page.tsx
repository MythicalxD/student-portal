"use client";
import { useEffect, useState } from "react";
import { Training } from "../components/columns";
import axios from "axios";
import { Factory, Link2, ListTodo, LocateIcon, Mail, Phone, Pin, Settings2, Timer, TimerReset, User, VideoIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getData(
    token: string,
    session: string,
    id: string
): Promise<Training> {
    const dataToSend = {
        token: token,
        session: session,
        id: id,
    };

    const apiUrl = "/api/training/get";

    try {
        const response = await axios.post(apiUrl, dataToSend);
        console.log(response);
        return response.data;
    } catch (error: any) {
        if (error.response.status === 401) {
            window.location.href = "/login";
            return error;
        } else {
            console.error("Error:", error);
            return error;
        }
    }
}

const Company: React.FC<IndustryProps> = ({ params }) => {
    const [data, setData] = useState<Training>();

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

        };

        fetchData(); // Call the fetchData function when the component mounts

        // Optionally, you can include a cleanup function here if needed
    }, []); // The empty dependency array ensures that the effect runs only once

    return (
        <main className="flex min-h-screen flex-col p-4">
            <div>
                <div className="flex flex-col w-[80vw]">
                    <div className="flex">
                        <img
                            src={data?.cover_image}
                            alt="logo"
                            className="w-[55px] h-[55px] rounded-md object-cover mr-4"
                        />
                        <div className="flex flex-col">
                            <p className="text-3xl text-black font-bold">{data?.title}</p>
                            <p className="text-sm text-gray-600 mb-2">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                    <Separator className="mb-4" />
                </div>

                <Link
                    href="./"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "absolute right-[2rem] top-[5rem]"
                    )}
                >
                    Go Back
                </Link>

                <div className="flex flex-col">
                    <p className="text-xl font-bold">Industry Details</p>
                    <div className="grid grid-cols-3 gap-4">

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <VideoIcon className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Video Link</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.video_link}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Settings2 className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Skills</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.skills.map((skill) => (<Badge key={skill} className="mr-1 mt-1" variant={"outline"} >{skill}</Badge>))}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <ListTodo className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Training Status</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Pin className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Company Status</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.type}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Timer className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Created On</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.created_at}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Created By</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.created_by}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <TimerReset className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Updated On</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.updated_at}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <User className="mt-px h-5 w-5" />
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
        </main>
    );
};

export default Company;
