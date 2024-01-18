import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    if (req.method !== 'POST') {
        return NextResponse.json({ msg: 'Method Not Allowed' }, { status: 405 })
    }

    try {

        const { name, desc, status, location, skills, courses, category, experience, salary, url, company, id, session, token } = await req.json();

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`,
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({ "title": name, "status": status, "description": desc, "location": location, "skills": skills, "courses": courses, "job_category_id": category, "experience": experience, "salary": salary, "web_url": url });

        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/job/job/${id}`,
            method: "PUT",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        console.log(response.data);

        return NextResponse.json({ token: `done` }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ token: `error` }, { status: 500 })
    }
}
