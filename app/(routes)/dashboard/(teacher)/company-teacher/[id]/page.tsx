"use client";
import { useEffect, useState } from "react";
import { CompanyTeacher } from "../components/columns";
import axios from "axios";
import { Factory, Link2, ListTodo, LocateIcon, Mail, Phone, Timer, TimerReset, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getData(
    token: string,
    session: string,
    id: string
): Promise<CompanyTeacher> {
    const dataToSend = {
        token: token,
        session: session,
        id: id,
    };

    const apiUrl = "/api/company/get";

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
    const [data, setData] = useState<CompanyTeacher>();

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
                            src={data?.company_logo}
                            alt="logo"
                            className="w-[55px] h-[55px] rounded-md object-cover mr-4"
                        />
                        <div className="flex flex-col">
                            <p className="text-3xl text-black font-bold">{data?.name}</p>
                            <p className="text-sm text-gray-600 mb-2">
                                {data?.name}
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
                            <LocateIcon className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Company Address</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.address}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Factory className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Company Industry</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.company_industry}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Link2 className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Company Website</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.website}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <ListTodo className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Company Status</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.status}
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
