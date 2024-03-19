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
import { BlogPostPublic, Course, JobListing, Notice } from "@/utils/types";
import { CourseCard } from "./components/courses";
import { JobCard } from "./components/jobs";
import Footer from "@/components/footer";
import { TestimonialCard } from "./components/testimonial";
import { Calendar, User2 } from "lucide-react";
import Link from "next/link";

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

async function getBlogs(): Promise<BlogPostPublic[]> {

  const apiUrl = "/api/blogs/public";

  try {
    const response = await axios.post(apiUrl);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error();
    return error;
  }
}

async function getNotice(): Promise<Notice[]> {

  const apiUrl = "/api/notice/public";

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
  const [blogs, setBlogs] = useState<BlogPostPublic[]>([]);
  const [notice, setNotice] = useState<Notice[]>([]);
  const [login, setLogin] = useState(false);

  // uncomment when api is ready

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initiate all data fetching requests simultaneously
        const promise1 = getCompany();
        const promise2 = getCourses();
        const promise3 = getJobs();
        const promise4 = getBlogs();
        const promise5 = getNotice();

        // Wait for all promises to resolve
        const [companyData, coursesData, jobsData, blogsData, noticeData] = await Promise.all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5
        ]);

        // Set state for all data once all promises resolve
        setData(companyData);
        setCourses(coursesData);
        setJobs(jobsData);
        setBlogs(blogsData);
        setNotice(noticeData);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

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
      <div className="flex lg:h-screen h-[160vh] relative bg-[#E1E8F4] mb-[100px]">
        <div className="flex md:flex-row flex-col h-[85vh] w-screen bg-[#E1E8F4]">
          <div className="flex flex-col items-start md:w-[40%] md:h-[500px] md:m-8 m-4 md:px-8">
            <div className="text-[#272A4B] text-[32px] font-semibold mt-[80px] md:text-[64px] text-start">Placement And Career Cell</div>
            <div className="max-w-[815px] text-start text-[#000000] md:text-xl text-md font-normal">The Placement and Career Cell facilitates the process of placement of students, graduating from the Institute.</div>
            <div className="flex items-center justify-center w-[200px] h-[60px] relative mt-[20px] cursor-pointer bg-[#272A4B] hover:bg-[#191c39] rounded-lg" onClick={() => { router.push("./login") }} >
              <div className="w-[200px] h-[60px] left-0 top-0 absolute" />
              <div className="text-white text-lg font-bold">{(login) ? "DASHBOARD" : "PORTAL LOGIN"}</div>
            </div>
          </div>
          <div className="flex md:w-[60%] md:h-full m-3 rounded-md mr-6 relative justify-center items-center">
            <div className="flex flex-col p-2 h-[420px] justify-start items-start relative bg-[#F4F3F9] rounded-xl w-full">
              <div className="flex w-full justify-center items-center mb-2 mt-1 text-slate-600 text-lg">Notice</div>
              <div className="flex w-full h-[2px] justify-center items-center p-[1px] bg-white text-md"></div>
              <div className="flex gap-x-4 w-full">
                <div className="flex flex-col flex-1 mt-[15px] w-full h-[330px] p-2 ml-2 bg-[#F4FAFD] rounded-lg justify-center items-center gap-y-2 overflow-y-auto">
                  {/* Notice card */}
                  {notice.slice(0, 2).map((notice) => (
                    <div className="flex flex-col w-full bg-white rounded-lg h-[150px] p-3 relative cursor-pointer hover:bg-zinc-50" key={notice.id}>
                      <div className="text-gray-800 text-lg font-medium">{notice.title}</div>
                      <div className="text-slate-500 text-sm font-normal overflow-hidden" style={{ textOverflow: 'ellipsis' }}>{notice.content}</div>
                      <div className="flex">
                        {/* <div className="flex text-gray-600 text-md justify-center items-center">
                        <User2 className="w-[15px] h-[15px] mr-2" />
                        {notice.author} name
                      </div> */}
                        <div className="flex text-gray-600 text-sm justify-center items-center absolute bottom-3 left-3">
                          <Calendar className="w-[15px] h-[15px] mr-2" />
                          {notice.expiry_date}
                        </div>
                      </div>
                    </div>
                  ))}
                  {notice.length == 0 && (<div>No Notices</div>)}
                </div>
                <div className="h-[330px] w-[2px] mt-[10px] bg-white md:block hidden" ></div>
                <div className="md:flex flex-col flex-1 w-full h-[330px] p-2 rounded-lg justify-center items-center gap-y-2 overflow-y-auto hidden">
                  <Image src={"/pin.png"} alt={"Pin Image"} width={500} height={500} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Banner */}
        <div className="flex absolute md:top-[90vh] top-[100vh] z-10 w-screen justify-center items-center md:h-[150px] h-[450px]">
          <div className="flex bg-[#272A4B] rounded-2xl w-[80vw] md:h-[150px] h-[450px] justify-center items-center relative">
            <div className="flex md:flex-row flex-col w-[80vw] justify-between items-center px-12">

              <div className=" h-24  text-center"><span className="text-white text-5xl font-bold font-['Plus Jakarta Sans'] leading-[60px]">250+<br /></span><span className="text-white text-base font-semibold font-['Plus Jakarta Sans'] leading-9">Participating Companies</span></div>

              <div className="w-[1px] h-24 bg-white md:block hidden"></div>

              <div className=" h-24  text-center"><span className="text-white text-5xl font-bold font-['Plus Jakarta Sans'] leading-[60px]">35 LPA<br /></span><span className="text-white text-base font-semibold font-['Plus Jakarta Sans'] leading-9">Highest salary offered</span></div>

              <div className="w-[1px] h-24 bg-white md:block hidden"></div>

              <div className=" h-24  text-center"><span className="text-white text-5xl font-bold font-['Plus Jakarta Sans'] leading-[60px]">1.5 LPA<br /></span><span className="text-white text-base font-semibold font-['Plus Jakarta Sans'] leading-9">Highest internship offered</span></div>

              <div className="w-[1px] h-24 bg-white md:block hidden"></div>

              <div className=" h-24  text-center"><span className="text-white text-5xl font-bold font-['Plus Jakarta Sans'] leading-[60px]">383<br /></span><span className="text-white text-base font-semibold font-['Plus Jakarta Sans'] leading-9">Placement offers</span></div>
            </div>
          </div>
        </div>

      </div>

      {/* Companies Carousel */}
      <div className="flex flex-col mt-[200px] md:h-[200px] h-[60vh] relative">
        <div className="text-center text-zinc-900 text-2xl font-bold leading-9"> We collaborate with 250+ top recruiters and companies</div>
        <div className="flex md:flex-row flex-wrap md:gap-0 gap-8 h-[70px] w-screen px-16 mt-[50px] justify-between">
          <Image src={"/company/c1.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c2.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c3.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c4.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c5.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c6.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c7.svg"} alt={"company logo"} width={98} height={40} />
          <Image src={"/company/c8.svg"} alt={"company logo"} width={98} height={40} />
        </div>
      </div>

      {/* Job Opportunities */}
      <div className="flex flex-col m-4 mt-[150px] relative">
        <div className="text-neutral-700 md:text-4xl text-3xl font-semibold md:m-4 m-2 w-full text-center">Job Opportunities</div>
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

      {/* Blogs and News */}
      <div className="flex flex-col bg-[#E0E7F3] md:p-12 p-4 md:mt-0 mt-[160px] relative">
        <div className="text-gray-800 text-[25.92px] font-semibold leading-loose">Blogs & Articles</div>
        <div className="text-gray-500 text-base font-normal leading-normal">Discover articles and tutorials to help you build better</div>
        <div className="flex mt-8 gap-4 overflow-x-auto py-4">

          {blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} >
              <div className="flex flex-col w-[383.54px] flex-shrink-0 hover:bg-[#ccdaf3] p-2 rounded-lg cursor-pointer" key={blog.id}>
                <img className="w-[383.54px] h-[240.10px] relative rounded-xl" src={blog.image_url} />
                <div className="text-gray-800 text-[21.56px] font-medium leading-7 p-4">{blog.title}</div>
                <div className="px-4 text-slate-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight overflow-hidden" style={{ textOverflow: 'ellipsis' }}>{blog.content}</div>
              </div>
            </Link>

          ))}

        </div>
      </div>

      {/* Why choose us */}
      <div className="md:flex mt-[100px] w-screen hidden">
        <div className="flex flex-col w-[40%] p-8 justify-center items-center">
          <div className="flex flex-col justify-start items-start">
            <div className="text-black text-5xl font-bold">Why choose us?</div>

            <div className="flex justify-start items-baseline gap-4 mt-12">
              <div className="w-[171px] h-[119px] relative">
                <div className="w-[171px] h-[119px] left-0 top-0 absolute bg-slate-200 rounded-[25px]" />
                <div className="w-[63.79px] h-[32.90px] left-[53.82px] top-[32.90px] absolute text-center text-blue-900 text-[32px] font-semibold font-['Plus Jakarta Sans'] leading-[34.53px]">90+</div>
                <div className="w-[102.40px] h-[20.61px] left-[34.88px] top-[65.59px] absolute text-center text-neutral-950 text-xl font-normal font-['Plus Jakarta Sans'] leading-snug">Faculty</div>
              </div>
              <div className="w-[198px] h-[188px] relative">
                <div className="w-[198px] h-[188px] left-0 top-0 absolute bg-slate-200 rounded-[30.07px]" />
                <div className="w-[119.69px] h-[117.50px] left-[38.48px] top-[34.88px] absolute">
                  <div className="w-[88.37px] h-[39.17px] left-[15.66px] top-0 absolute text-center text-blue-900 text-[38.49px] font-semibold font-['Plus Jakarta Sans'] leading-[41.54px]">6K+</div>
                  <div className="w-[119.69px] h-[24.62px] left-[-0px] top-[39.17px] absolute text-center text-neutral-800 text-2xl font-normal font-['Plus Jakarta Sans'] leading-relaxed">Students</div>
                  <div className="w-[89.49px] h-[42.52px] left-[14.54px] top-[74.98px] absolute">
                    <img className="w-[42.51px] h-[42.52px] left-0 top-0 absolute rounded-full" src="/student/s1.svg" />
                    <img className="w-[42.51px] h-[42.52px] left-[23.49px] top-0 absolute rounded-full" src="/student/s2.svg" />
                    <img className="w-[42.51px] h-[42.52px] left-[46.98px] top-0 absolute rounded-full" src="/student/s3.svg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="w-[171px] h-[119px] relative">
                <div className="w-[171px] h-[119px] left-0 top-0 absolute bg-slate-200 rounded-[25px]" />
                <div className="w-[66.78px] h-[32.67px] left-[51.56px] top-[32.62px] absolute text-center text-blue-900 text-[32px] font-semibold font-['Plus Jakarta Sans'] leading-[34.53px]">56+</div>
                <div className="w-[102.40px] h-[20.61px] left-[34.80px] top-[65.59px] absolute text-center text-neutral-800 text-xl font-normal font-['Plus Jakarta Sans'] leading-snug">Startups</div>
              </div>
              <div className="w-[171px] h-[119px] relative">
                <div className="w-[171px] h-[119px] left-0 top-0 absolute bg-slate-200 rounded-[25px]" />
                <div className="w-[92.69px] h-[33.63px] left-[42.66px] top-[32.52px] absolute text-center text-blue-900 text-[32px] font-semibold font-['Plus Jakarta Sans'] leading-[34.53px]">150+</div>
                <div className="w-[102.40px] h-[20.61px] left-[34.80px] top-[65.59px] absolute text-center text-black text-xl font-normal font-['Plus Jakarta Sans'] leading-snug">Professors</div>
              </div>
            </div>

            <div className="w-[400px] text-neutral-800 text-md font-normal leading-relaxed mt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique, tor nec consequat vulputate, lorem ar congue. </div>

            <div className="w-[200px] h-[60px] px-12 pt-[17px] pb-5 bg-indigo-950 rounded-lg justify-center items-center inline-flex mt-4 cursor-pointer hover:bg-[#161930]">
              <div className="text-white text-lg font-bold font-['Plus Jakarta Sans']">Get Started</div>
            </div>
          </div>


        </div>

        {/* Image Combo */}
        <div className="flex w-[60%] h-[110vh] relative">
          <Image src={"/circle.png"} alt={"students image"} className="md:w-[385px] md:h-[385px] absolute top-[150px] right-[330px]" width={430} height={430} />
          <Image src={"/class1.jpeg"} alt={"students image"} className="md:w-[452px] md:h-[556px] rounded-xl object-cover absolute top-[100px] right-[100px]" width={452} height={556} />
          <Image src={"/class2.jpeg"} alt={"students image"} className="md:w-[430px] md:h-[430px] rounded-xl object-cover absolute bottom-[10px] right-[350px]" width={430} height={430} />
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col p-4 mt-8 justify-center items-center">
        <Image src={"/chart.png"} alt={"Chart Image"} className="md:w-[70vw] w-[90vw] object-contain md:m-[100px] m-16" width={1000} height={1000} />
      </div>

      {/* Student */}
      <div className="flex flex-col p-4 justify-center items-center">
        <Image src={"/student.png"} alt={"Student Image"} className="md:w-[70vw] w-[90vw] object-contain md:m-[100px] m-16" width={1000} height={1000} />
      </div>

      {/* Banner 4 */}
      <div className="flex relative">
        <div className="absolute flex bg-black h-[350px] w-screen opacity-70"></div>
        <Image src={img1} alt="Students Image" className="w-full h-[350px] object-cover" />
        <div className="flex flex-col items-center absolute top-0 w-full h-[500px] mt-[70px]">
          <div className="text-white md:text-[32px] text-[20px] text-center px-4 font-semibold">Your career journey begins here, where potential meets placement</div>
          <div className="max-w-[815px] text-center text-gray-300 text-xl font-normal mt-[10px]">Embark on a transformative path as we navigate your potential towards tailored
            placements, sculpting your success story.</div>
          <div className="w-[200px] h-[60px] pl-[46px] pr-[38px] pt-[17px] pb-5 bg-orange-400 hover:bg-orange-500 md:mt-10 mt-4 rounded-lg justify-end items-center inline-flex cursor-pointer">
            <div className="text-white text-lg font-bold font-['Plus Jakarta Sans']">Explore More</div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="flex flex-col m-4 mt-[50px] relative">
        <div className="text-neutral-700 md:text-4xl text-3xl font-semibold md:m-4 m-2 w-full text-center">Our best courses for you</div>
        <ScrollArea>
          <div className="flex flex-wrap space-x-4 gap-y-4 pb-4 m-4">
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

      {/* Testimonials */}

      <div className="flex flex-col mt-[300px] m-8 relative">
        <Image src={"/circle.png"} alt={"students image"} className="md:w-[385px] md:h-[385px] absolute top-[-220px] left-[-170px]" width={430} height={430} />
        <div className="text-black text-[56px] font-bold font-['Plus Jakarta Sans'] leading-[67.20px] z-[1]">It speaks for itself</div>
        <div className="text-indigo-950 text-[56px] font-bold font-['Plus Jakarta Sans'] leading-[67.20px] z-[1]">Bunch of feedback from<br />Our Students</div>

        <div className="grid md:grid-cols-4 grid-cols-1 mt-8 gap-x-[180px] gap-4 overflow-x-auto py-4 relative">
          <TestimonialCard testimonial={{
            id: 0,
            name: "Maria",
            image: "/profile/p1.svg",
            desc: "Probably the best system so far I was working with.Fully responsive, sleek and easy to customize. Elegant typography and attentiveness to every detail stole my heart."
          }} />
          <TestimonialCard testimonial={{
            id: 0,
            name: "Kyle G.",
            image: "/profile/p1.svg",
            desc: "The design system you've created looks unbelievable."
          }} />
          <TestimonialCard testimonial={{
            id: 0,
            name: "Kyle G.",
            image: "/profile/p1.svg",
            desc: "The design system you've created looks unbelievable."
          }} />

          <TestimonialCard testimonial={{
            id: 1,
            name: "Anna S.",
            image: "/profile/p1.svg",
            desc: "I'm amazed by the attention to detail in your work."
          }} />

          <TestimonialCard testimonial={{
            id: 2,
            name: "John D.",
            image: "/profile/p1.svg",
            desc: "Your professionalism and dedication are truly impressive."
          }} />

          <TestimonialCard testimonial={{
            id: 3,
            name: "Emily W.",
            image: "/profile/p1.svg",
            desc: "Working with your team has been a game-changer for us."
          }} />

          <TestimonialCard testimonial={{
            id: 4,
            name: "Michael R.",
            image: "/profile/p1.svg",
            desc: "I can't thank you enough for your outstanding support."
          }} />

        </div>
      </div>

      <Footer />

    </div>

  );
}
