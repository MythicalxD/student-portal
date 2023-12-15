import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const { id, session } = await req.json();

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${id}`,
            "Cookie": `session=${session}`
        }


        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/skills`,
            method: "GET",
            headers: headersList,
        }

        let response = await axios.request(reqOptions);

        return NextResponse.json(response.data, { status: 200 })
        // Handle success as needed
    }
    catch (error: any) {
        return NextResponse.json(error, { status: error.response.status })
    }
}