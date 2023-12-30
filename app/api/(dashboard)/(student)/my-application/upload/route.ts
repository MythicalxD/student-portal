import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const { id, token, session } = await req.json();

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`,
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({ "status": "Withdrawn" });


        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/application/application/${id}`,
            method: "PUT",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);

        return NextResponse.json(response.data, { status: 200 })
        // Handle success as needed
    }
    catch (error: any) {
        console.log(error);

        return NextResponse.json(error, { status: 502 })
    }
}
