"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import axios from "axios";
import FormData from "form-data";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import Link from "next/link";
import { User } from "@/utils/types";
import { Image } from "lucide-react";

interface IndustryProps {
    params: {
        id: string;
    };
}

const formSchema = z.object({
    email: z.string(),
    password: z.string().optional(),
    cpassword: z.string().optional()
});


async function getData(
    token: string,
    session: string,
): Promise<User> {
    const dataToSend = {
        token: token,
        session: session
    };

    const apiUrl = "/api/profile";

    try {
        const response = await axios.post(apiUrl, dataToSend);
        console.log(response);
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

const UpdateIndustry: React.FC<IndustryProps> = ({ params }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [data, setData] = useState<User>();

    const router = useRouter();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileChange1 = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile1(event.target.files[0]);
        }
    };

    const handleUpload = async (email: string, password: string, cpassword: string) => {
        try {
            //TODO add error on image not selected
            // Fetch the session
            const authToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const session = document.cookie
                .split("; ")
                .find((row) => row.startsWith("session="))
                ?.split("=")[1];

            const formData = new FormData();

            formData.append("password", password);
            formData.append("cpassword", cpassword);

            if (selectedFile != null) { formData.append("file", selectedFile); } else { formData.append("file", "null"); }
            if (selectedFile1 != null) { formData.append("cv", selectedFile1); } else { formData.append("cv", "null"); }

            formData.append("session", session);
            formData.append("token", authToken);

            const apiUrl = "/api/profile/upload";
            const response = await axios.post(apiUrl, formData);

            console.log(response.data);
            const { token } = response.data;
            if (token === "done") {
                toast.success("Profile Updated");
                router.push("/dashboard/profile");
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error("Error Updating Profile");
            console.error("Error uploading file:", error);
            // Handle the error
        }
    };

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

            // Populate the form fields with the fetched data
            form.setValue("email", fetchedData.email);
        };

        fetchData(); // Call the fetchData function when the component mounts

        // Optionally, you can include a cleanup function here if needed
    }, []); // The empty dependency array ensures that the effect runs only once

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        handleUpload(values.email, values.password ?? "null", values.cpassword ?? "null");
        console.log(values);
    }

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
        <div className="m-4">
            <div className="flex flex-col w-[80vw]">
                <div className="flex">
                    <UserProfilePicture />
                    <div className="flex flex-col">
                        <p className="text-3xl text-black font-bold">{data?.full_name}</p>
                        <p className="text-sm text-gray-600 mb-2">
                            Please provide updated information for profile.
                        </p>
                    </div>
                </div>
                <Separator className="mb-4" />
            </div>

            <Link
                href="../"
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "absolute right-[2rem] top-[5rem]"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Minimum 2 characters" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Minimum 2 characters" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Minimum 2 characters" {...field} />
                                    </FormControl>
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
                <div className="flex h-[60px] gap-x-2">
                    <div className="flex h-full items-center space-x-3">
                        <div
                            className={cn(
                                "w-[150px] cursor-pointer relative overflow-hidden"
                            )}
                        >
                            <input
                                type="file"
                                id="image"
                                accept=".jpg, .jpeg, .png"
                                className="absolute top-10 inset-0 opacity-0 cursor-pointer" // Hide the actual file input
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="image"
                                className="flex items-center justify-center w-full h-full p-2 bg-gray-200 rounded-md cursor-pointer"
                            >
                                <Image className="w-[20px] h-[20px] mr-2" />
                                {selectedFile ? (
                                    <span>Uploaded</span>
                                ) : (
                                    <span>Upload Profile Image</span>
                                )}
                            </label>
                        </div>
                        {selectedFile ? <span>{selectedFile.name}</span> : null}
                    </div>
                    <div className="flex h-full items-center space-x-3">
                        <div
                            className={cn(
                                "w-[150px] cursor-pointer relative overflow-hidden"
                            )}
                        >
                            <input
                                type="file"
                                id="cv"
                                accept=".pdf"
                                className="absolute top-10 inset-0 opacity-0 cursor-pointer" // Hide the actual file input
                                onChange={handleFileChange1}
                            />
                            <label
                                htmlFor="cv"
                                className="flex items-center justify-center w-full h-full p-2 bg-gray-200 rounded-md cursor-pointer"
                            >
                                <Image className="w-[20px] h-[20px] mr-2" />
                                {selectedFile1 ? (
                                    <span>Uploaded</span>
                                ) : (
                                    <span>Upload CV PDF</span>
                                )}
                            </label>
                        </div>
                        {selectedFile1 ? <span>{selectedFile1.name}</span> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateIndustry;
