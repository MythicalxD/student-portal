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
            url: "https://seal-app-krop4.ondigitalocean.app/api/v1/companyIndustry/industries",
            method: "GET",
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
