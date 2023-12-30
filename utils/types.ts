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

