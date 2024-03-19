"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Factory, Link2, ListTodo, LocateIcon, Mail, Phone, Timer, TimerReset, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/utils/types";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getData(
    id: string
): Promise<BlogPost> {
    const dataToSend = {
        token: "",
        session: "",
        id: id,
    };

    const apiUrl = "/api/blogs/get";

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

const Company: React.FC<IndustryProps> = ({ params }) => {
    const [data, setData] = useState<BlogPost>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Initiate all data fetching requests simultaneously
                const promise1 = getData(params.id);

                // Wait for all promises to resolve
                const [blogData] = await Promise.all([
                    promise1,
                ]);

                // Set state for all data once all promises resolve
                setData(blogData);
            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
            }
        };

        fetchData();


    }, []);

    return (
        <main className="flex min-h-screen flex-col p-4">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "bg-indigo-950 hover:bg-[#151730] text-white hover:text-white absolute right-[2rem] top-[5rem] z-0"
                )}
            >
                Home
            </Link>
            <h1 className="text-5xl font-bold mb-4">{data?.title}</h1>
            <p className="text-gray-400 mt-1 mb-1 text-lg">
                Published: {data?.publication_date}
            </p>
            <img src={data?.image_url} alt={data?.title} className="mb-4" />
            <div className="blogContent mt-4">
                {data?.content}
            </div>
        </main>
    );
};

export default Company;
