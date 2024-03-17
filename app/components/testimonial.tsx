"use client";
import { Testimonials } from "@/utils/types";
import Image from "next/image";

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
    testimonial: Testimonials;
}

export function TestimonialCard({
    testimonial
}: TestimonialProps) {
    return (
        <div className="w-[380px] h-[280px] rounded-3xl flex flex-col justify-start items-start border-[1px] border-zinc-300 p-8 relative">
            <div className="text-gray-400 text-md font-normal font-['Plus Jakarta Sans']">{testimonial.desc}</div>
            <div className=" text-gray-600 text-lg font-medium font-['Plus Jakarta Sans']">{testimonial.name}</div>
            <div className="absolute bottom-0 right-0 mb-4 mr-4">
                <Image src={testimonial.image} alt={"profile"} width={50} height={50} className="rounded-full" />
            </div>
        </div>

    );
}