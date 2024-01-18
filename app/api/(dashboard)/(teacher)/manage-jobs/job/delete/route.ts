import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("meow");
    
    try {

        const { token, session, id } = await req.json();

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`
        }

        console.log(`${process.env.BASEURL}/api/v1/job/job/${id}`);

        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/job/job/${id}`,
            method: "DELETE",
            headers: headersList,
        }

        let response = await axios.request(reqOptions);


        return NextResponse.json(response.data, { status: 200 })
        // Handle success as needed
    } catch (error) {
        
        return NextResponse.json({ res: `Server Error` }, { status: 500 })
        // Handle the error
    }
}
