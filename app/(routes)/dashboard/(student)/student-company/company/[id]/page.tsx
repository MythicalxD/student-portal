"use client";
import { Course } from "@/app/(routes)/dashboard/(super-admin)/course/components/columns";
import { Skill } from "@/app/(routes)/dashboard/(super-admin)/skills/components/columns";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { JobFull } from "@/utils/types";
import axios from "axios";
import { CircleDollarSign, CopyIcon, Info, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IndustryProps {
    params: {
        id: string;
    };
}

async function getDataCourses(
    token: string,
    session: string
): Promise<Course[]> {
    const dataToSend = {
        id: token,
        session: session,
    };

    const apiUrl = "/api/manage-jobs/job/get/course";

    try {
        const response = await axios.post(apiUrl, dataToSend);
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error();
        return error;
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


async function getData(token: string, session: string, id: string): Promise<JobFull> {
    const dataToSend = {
        id: id,
        token: token,
        session: session,
    };

    const apiUrl = "/api/manage-jobs/job/get";

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

const Industry: React.FC<IndustryProps> = ({ params }) => {
    const [data, setData] = useState<JobFull>();
    const [skillData, setSkillData] = useState<Skill[]>([]);
    const [courseData, setCourseData] = useState<Course[]>([]);

    const router = useRouter();

    function getSkillNameById(skillId: string): string | undefined {
        const skill = skillData.find((s) => s.id === skillId);
        return skill ? skill.name : undefined;
    }

    const handleUploadApprove = async (
        id: string
    ) => {
        try {
            const authToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const session = document.cookie
                .split("; ")
                .find((row) => row.startsWith("session="))
                ?.split("=")[1];

            const dataToSend = {
                id: id,
                token: authToken,
                session: session,
            };

            const apiUrl = "/api/my-application/update";
            const response = await axios.post(apiUrl, dataToSend);

            console.log(response.data['status']);
            const { token } = response.data;
            if (token === "done") {
                toast.success("Application Updated");
                router.push("/dashboard/student-company");
            }
            if (response.data['status'] === 409) {
                toast.success("You've already applied for this job");
                router.push("/dashboard/student-company");
            }
        } catch (error) {
            toast.error("Error Updating Application");
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

            const fetchedData = await getData(authToken!, session!, params.id);
            setData(fetchedData);
            const fetchedDataSkill = await getDataSkill(authToken!, session!);
            setSkillData(fetchedDataSkill);
            const fetchedDataCourses = await getDataCourses(authToken!, session!);
            setCourseData(fetchedDataCourses);
        };

        fetchData(); // Call the fetchData function when the component mounts

        // Optionally, you can include a cleanup function here if needed
    }, []); // The empty dependency array ensures that the effect runs only once
    return (
        <main className="flex flex-col">
            <div className="flex flex-col w-[80vw]">
                <div className="flex ml-2 mb-2">
                    <img
                        src={"https://sambucketcoduty.s3.ap-south-1.amazonaws.com/Frame_7_1.png"}
                        alt="logo"
                        className="w-[55px] h-[55px] rounded-md object-cover mr-4"
                    />
                    <div className="flex flex-col">
                        <p className="text-2xl text-black font-bold">Looking for {data?.title}</p>
                        <p className="text-sm text-gray-600 mb-2">
                            We are looking for someone with the following requirements for {data?.title}.
                        </p>
                    </div>
                </div>
                <Separator className="mb-4" />
            </div>

            <Link
                href="../"
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "absolute right-[2rem] top-[6rem]"
                )}
            >
                Go Back
            </Link>
            <div className="flex p-4 flex-col space-y-2">
                <p className="text-md text-black font-bold">Job Description</p>
                <p className="text-md text-gray-600 mb-2">
                    Join our innovative team at XYZ Tech as a Software Developer! Utilize your expertise in languages like Python and JavaScript to design and implement robust solutions. Collaborate with cross-functional teams to drive impactful projects. Shape the future of technology while enjoying a dynamic work environment and competitive compensation. Apply now! {data?.detiled_description}.
                </p>
            </div>
            <div className="flex p-4 flex-col space-y-4">
                <p className="text-md text-black font-bold">Skills and Expertise</p>
                <div className="flex-wrap space-x-2">
                    {data?.skills.map((label) => (
                        <Badge key={label} className="rounded-md bg-gray-100 text-gray-500 p-1 px-3 cursor-pointer hover:bg-gray-300" >
                            {skillData.find((s) => parseInt(s.id) === label)?.name}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="flex p-4 flex-col space-y-4">
                <p className="text-md text-black font-bold">Detailed Job Info</p>
                <div className="flex flex-wrap space-x-3">
                    <div className="flex justify-center items-center font-medium bg-purple-50 text-purple-800 p-2 px-3 rounded-md"><Info className="w-4 h-4 mr-1" /> This is a {data?.job_category_name} job.</div>
                    <div className="flex justify-center items-center font-medium bg-yellow-50 text-yellow-800 p-2 px-3 rounded-md"> <MapPin className="w-4 h-4 mr-1" />This job is {data?.location} based.</div>
                    <div className="flex justify-center items-center font-medium bg-green-50 text-green-800 p-2 px-3 rounded-md"> <CircleDollarSign className="w-4 h-4 mr-1" />Pays ₹{data?.salary} / month</div>
                    <div className="flex justify-center items-center font-medium bg-orange-50 text-orange-800 p-2 px-3 rounded-md">Required {data?.experience} years of work</div>
                </div>
                <p className="text-md text-black font-bold">Courses Required</p>
                <div className="flex-wrap space-x-2">
                    {data?.courses.map((label) => (
                        <Badge key={label} className="rounded-md bg-gray-100 text-gray-500 p-1 px-3 cursor-pointer hover:bg-gray-300" >
                            {courseData.find((s) => s.id === label)?.name}
                        </Badge>
                    ))}
                </div>
                <div className="flex">
                    <img src="/rating.png" alt="sam verified" className="w-[200px] h-[100px]" />
                    <img src="/sam-verify.png" alt="sam verified" className="w-[200px] h-[100px]" />
                    <img src="/other-mark.png" alt="sam verified" className="w-[200px] h-[100px]" />
                </div>
                <div className="flex space-x-2">
                    <div className="flex justify-center items-center font-medium bg-gray-50 text-gray-400 p-2 px-3 rounded-md">{data?.web_url}<CopyIcon className="w-5 h-5 ml-2" /></div>
                    <Button className="bg-green-700" onClick={() => { handleUploadApprove(params.id!); }} >Apply For Job</Button>
                </div>
            </div>
        </main>
    );
};

export default Industry;
