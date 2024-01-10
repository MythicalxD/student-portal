import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { number } from 'zod';

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    if (req.method !== 'POST') {
        return NextResponse.json({ msg: 'Method Not Allowed' }, { status: 405 })
    }

    let formData = await req.formData();
    let body = Object.fromEntries(formData);

    try {

        const { name, desc, skills, department, id, session, token } = body;

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`,
            "Content-Type": "application/json"
        }

        let skillsArray: number[] = skills.toString().split(',').map(Number);
        let departmentArray: number[] = department.toString().split(',').map(Number);

        let bodyContent = JSON.stringify({
            "name": name,
            "description": desc,
            "skills": skillsArray,
            "department_id": departmentArray,
        });

        console.log(bodyContent);


        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/course/${id}`,
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
