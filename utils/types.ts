export type JobDescription = {
    created_at: string;
    created_by: number;
    detiled_description: string;
    exprience: number;
    id: number;
    location: string;
    salary: string;
    skills: string[];
    updated_at: string;
    updated_by: number;
    web_url: string;
};

export type JobTeacher = {
    applications: any[]; // You may want to replace 'any[]' with a more specific type if needed
    company_name: string;
    courses: number[]; // Assuming it's an array of course IDs
    detiled_description: string; // Fixing the typo in the property name
    experience: number;
    job_category_name: string;
    location: string;
    salary: string;
    skills: number[]; // Assuming it's an array of skill IDs
    status: string;
    title: string;
    web_url: string;
};

export type Job = {
    applicants: number[];
    company: number;
    courses: string[];
    created_at: string;
    created_by: number;
    id: number;
    job_category: string;
    job_description: JobDescription;
    status: string;
    title: string;
    updated_at: string;
    updated_by: number;
};

type Skill = {
    id: number;
    name: string;
};

export type JobStudent = {
    company: string;
    company_id: number;
    company_logo: string;
    exprience: number;
    id: number;
    industry: string;
    job_category: string;
    job_description: string;
    location: string;
    salary: string;
    skills: Skill[];
    status: string; // Add other possible status values as needed
    title: string;
    web_url: string;
};

export type JobFull = {
    company_name: string;
    courses: number[];
    detiled_description: string;
    experience: number;
    job_category_name: string;
    location: string;
    salary: string;
    skills: number[];
    status: string;
    title: string;
    web_url: string;
};


export type JobApplication = {
    comments: string[]; // Assuming comments are strings, you can adjust the type accordingly
    company_name: string;
    created_date: string;
    job_name: string;
    status: string;
    student_cv: string;
    student_name: string;
};

type Comment = {
    application: number;
    comment: string;
    created_at: string;
    created_by: number;
    id: number;
    updated_at: string;
    updated_by: number;
};

export type JobApplicationAdmin = {
    approved_by: number;
    comments: Comment[];
    created_at: string;
    created_by: number;
    id: number;
    job: string;
    status: string;
    updated_at: string;
    updated_by: number;
};

export type ApplicationStatus = {
    id: number;
    job_name: string;
    status: "WITHDRAWN" | "APPROVED" | "REJECTED" | "PENDING" | "REVIEW" | "SUBMITTED"; // Add other possible status values as needed
};

export type Course = {
    description: string;
    id: number;
    name: string;
    skills: Skill[];
};

export type JobListing = {
    company: string;
    company_id: number;
    company_logo: string;
    experience: number;
    id: number;
    industry: string;
    job_category: string;
    job_description: string;
    location: string;
    salary: string;
    skills: Skill[];
    status: string;
    title: string;
    web_url: string;
};

export interface User {
    cv: string;
    date_of_birth: string;
    department_id: string;
    email: string;
    full_name: string;
    profile_picture_url: string;
    student_id: number;
}

export type JobSingle = {
    id: string;
    name: string;
};

export type Industry = {
    logo: string;
    name: string;
};

export type Testimonials = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

export type Notice = {
    author: string;
    content: string;
    created_at: string;
    created_by: string;
    expiry_date: string;
    id: number;
    title: string;
    updated_by: string;
};

export type BlogPost = {
    author: string;
    content: string;
    created_at: string;
    created_by: string;
    id: number;
    image_url: string;
    publication_date: string;
    status: string;
    tags: string[] | null; // Assuming tags can be an array of strings or null
    title: string;
    updated_by: string;
};

export type BlogPostPublic = {
    author: string;
    content: string;
    created_at: string;
    created_by: string;
    id: number;
    image_url: string;
    publication_date: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; // Assuming status can only be one of these values
    tags: string[] | null;
    title: string;
    updated_by: string;
};