"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarDash from "@/components/navbar-dash";
import img from "../public/building.jpg";
import img1 from "../public/College_Students.png";
import img2 from "../public/stat-bg.png";
import { CompanyPublic } from "./(routes)/dashboard/(student)/student-company/components/columns";
import axios from "axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CompanyCard } from "./components/company";
import { Course, JobListing } from "@/utils/types";
import { CourseCard } from "./components/courses";
import { JobCard } from "./components/jobs";
import Footer from "@/components/footer";

async function getCompany(): Promise<CompanyPublic[]> {

  const apiUrl = "/api/company/public";

  try {
    const response = await axios.post(apiUrl);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error();
    return error;
  }
}

async function getCourses(): Promise<Course[]> {

  const apiUrl = "/api/course/public";

  try {
    const response = await axios.post(apiUrl);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error();
    return error;
  }
}

async function getJobs(): Promise<JobListing[]> {

  const apiUrl = "/api/job/public";

  try {
    const response = await axios.post(apiUrl);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error();
    return error;
  }
}

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState<CompanyPublic[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getCompany();
      setData(fetchedData);
      const fetchedData1 = await getCourses();
      setCourses(fetchedData1);
      const fetchedData2 = await getJobs();
      setJobs(fetchedData2);
    };

    fetchData(); // Call the fetchData function when the component mounts

    const token = Cookies.get("session");

    if (token) {
      setLogin(true);
      return;
    }

    // Optionally, you can include a cleanup function here if needed
  }, [router]); // The empty dependency array ensures that the effect runs only once


  return (
    <div className="flex-col bg-gray-100">
      <NavbarDash />

      {/* Banner 1 */}
      <div className="flex relative">
        <div className="absolute flex bg-black h-[500px] w-screen opacity-60"></div>
        <Image src={img} alt="Students Image" className="w-full h-[500px] object-cover" />
        <div className="flex flex-col justify-center items-center absolute top-0 w-full h-[500px]">
          <div className="text-white text-[64px] font-semibold mt-[80px]">Placement And Career Cell</div>
          <div className="max-w-[815px] text-center text-gray-300 text-2xl font-normal">The Placement and Career Cell facilitates the process of placement of students, graduating from the Institute.</div>
          <div className="flex items-center justify-center w-[200px] h-[60px] relative mt-[60px] cursor-pointer bg-amber-300 hover:bg-amber-400 rounded-sm" onClick={() => { router.push("./login") }} >
            <div className="w-[200px] h-[60px] left-0 top-0 absolute" />
            <div className="text-neutral-700 text-lg font-bold">{(login) ? "DASHBOARD" : "PORTAL LOGIN"}</div>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="flex flex-col m-4 mt-8">
        <div className="text-neutral-700 text-4xl font-semibold m-4">Top Recruiters</div>
        <ScrollArea>
          <div className="flex space-x-4 pb-4 m-4">
            {data.map((company) => (
              <CompanyCard
                key={company.name}
                company={company}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Banner 2 */}
      <div className="flex relative">
        <div className="absolute flex bg-black h-[400px] w-screen opacity-60"></div>
        <Image src={img1} alt="Students Image" className="w-full h-[400px] object-cover" />
        <div className="flex flex-col justify-center items-center absolute top-0 w-full h-[500px]">
          <div className="text-white text-[32px] font-semibold">Your career journey begins here, where potential meets placement</div>
          <div className="max-w-[815px] text-center text-gray-300 text-xl font-normal mt-[10px]">Embark on a transformative path as we navigate your potential towards tailored placements, sculpting your success story.</div>
          <div className="flex items-center justify-center w-[200px] h-[60px] relative mt-[40px] cursor-pointer bg-amber-300 hover:bg-amber-400 rounded-sm" onClick={() => { router.push("./login") }} >
            <div className="w-[200px] h-[60px] left-0 top-0 absolute" />
            <div className="text-neutral-700 text-lg font-bold">EXPLORE MORE</div>
          </div>
        </div>
      </div>

      {/* Top Jobs */}
      <div className="flex flex-col m-4 mt-8">
        <div className="text-neutral-700 text-4xl font-semibold m-4">Top Courses</div>
        <ScrollArea>
          <div className="flex space-x-4 pb-4 m-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Banner 3 */}
      <div className="flex relative">
        <div className="absolute flex bg-black h-[400px] w-screen opacity-70"></div>
        <Image src={img2} alt="Students Image" className="w-full h-[400px] object-cover" />
        <div className="flex flex-col items-center absolute top-0 w-full h-[500px]">
          <div className="text-white text-5xl font-semibold mt-[60px]">SAM GLOBAL UNIVERSITY</div>
          <div className="flex flex-col w-screen gap-y-8 mt-[50px]">
            <div className="flex flex-1 w-full justify-center items-center">
              <div className="w-full text-center text-gray-300 text-5xl font-normal mt-[10px]">90+ Faculty</div>
              <div className="w-full text-center text-gray-300 text-5xl font-normal mt-[10px]">60+ Companies</div>
            </div>
            <div className="flex flex-1 w-full justify-center items-center">
              <div className="w-full text-center text-gray-300 text-5xl font-normal mt-[10px]">6000+ Students</div>
              <div className="w-full text-center text-gray-300 text-5xl font-normal mt-[10px]">30+ Researchers</div>
            </div>
          </div>

        </div>
      </div>

      {/* Top Jobs */}
      <div className="flex flex-col m-4 mt-8">
        <div className="text-neutral-700 text-4xl font-semibold m-4">Job Opportunities</div>
        <ScrollArea>
          <div className="flex space-x-4 pb-4 m-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                course={job}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Banner 4 */}
      <div className="flex relative">
        <div className="absolute flex bg-black h-[350px] w-screen opacity-60"></div>
        <Image src={img1} alt="Students Image" className="w-full h-[350px] object-cover" />
        <div className="flex flex-col items-center absolute top-0 w-full h-[500px] mt-[70px]">
          <div className="text-white text-[32px] font-semibold">Most Placements in India - Watch Video</div>
          <div className="max-w-[815px] text-center text-gray-300 text-xl font-normal mt-[10px]">Embark on a transformative path as we navigate your potential towards tailored placements, sculpting your success story.</div>
          <div className="flex items-center justify-center w-[200px] h-[60px] relative mt-[40px] cursor-pointer bg-amber-300 hover:bg-amber-400 rounded-sm" onClick={() => { router.push("./login") }} >
            <div className="w-[200px] h-[60px] left-0 top-0 absolute" />
            <div className="text-neutral-700 text-lg font-bold">EXPLORE MORE</div>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="flex flex-col m-4 mt-8 p-4">
        <div className="text-neutral-700 text-4xl font-semibold m-4">Blogs & News</div>
        <div className="ml-4 mt-4 text-gray-600 text-xl font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat vel turpis et tincidunt. Cras porttitor semper felis sed commodo. Praesent ante nisi, dictum at suscipit vitae, porttitor at mauris.</div>
        <div className="ml-4 mt-4 text-gray-600 text-xl font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat vel turpis et tincidunt. Cras porttitor semper felis sed commodo. Praesent ante nisi, dictum at suscipit vitae, porttitor at mauris.</div>
        <div className="ml-4 mt-4 text-gray-600 text-xl font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat vel turpis et tincidunt. Cras porttitor semper felis sed commodo. Praesent ante nisi, dictum at suscipit vitae, porttitor at mauris.</div>
      </div>

      {/* Top Companies */}
      <div className="flex flex-col mt-8 p-4 m-4">
        <div className="text-neutral-700 text-4xl font-semibold m-4">Common Questions</div>
        <div className="ml-4 mt-4 text-gray-600 text-xl font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat vel turpis et tincidunt. Cras porttitor semper felis sed commodo.</div>
        <div className="ml-4 mt-4 text-gray-600 text-xl font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat vel turpis et tincidunt. Cras porttitor semper felis sed commodo.</div>
        <div className="ml-4 mt-4 text-gray-600 text-xl font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat vel turpis et tincidunt. Cras porttitor semper felis sed commodo.</div>
      </div>

      <Footer />

    </div>

  );
}
