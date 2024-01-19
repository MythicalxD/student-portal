"use client";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { User } from "@/utils/types";
import axios from "axios";
import { Factory } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"

async function getData(
    token: string,
    session: string
): Promise<User> {
    const dataToSend = {
        token: token,
        session: session
    };

    const apiUrl = "/api/profile";

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

const Profile = () => {

    const [data, setData] = useState<User>();

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

        fetchData();
    }, []);

    const UserProfilePicture = () => {
        const placeholderUrl = 'https://cdn.builtbybit.com/avatars/o/17/17169.jpg?1582201011'; // Replace with your placeholder image URL

        const imageUrl = data?.profile_picture_url?.replace(
            "https://s3.amazonaws.com/sambucketcoduty/",
            "https://sambucketcoduty.s3.ap-south-1.amazonaws.com/"
        );

        return (
            <img
                src={imageUrl || placeholderUrl}
                alt="User profile"
                className="w-[55px] h-[55px] rounded-md object-cover mr-4"
            />
        );
    };


    return (
        <main className="flex min-h-screen flex-col p-4">
            <div>
                <Link
                    href="/dashboard/profile/update"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "absolute right-[2rem] top-[6rem]"
                    )}
                >
                    UPDATE
                </Link>
                <div className="flex">
                    <UserProfilePicture />
                    <div className="flex flex-col">
                        <p className="text-3xl text-black font-bold">{data?.full_name}</p>
                        <p className="text-sm text-gray-600 mb-2">
                            If Information shown below is not accurate then please update.
                        </p>
                    </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex flex-col">
                    <p className="text-xl font-bold">User Profile</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Factory className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Date of Birth</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.date_of_birth}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Factory className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Department ID</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.department_id}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Factory className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">User Email</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 rounded-md min-h-[70px] bg-gray-100 p-2 px-4 mt-2">
                            <Factory className="mt-px h-5 w-5" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Full Name</p>
                                <p className="text-sm text-muted-foreground">
                                    {data?.full_name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;
