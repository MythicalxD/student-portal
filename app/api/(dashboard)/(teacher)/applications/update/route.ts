import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

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

        const { comment, status, id, session, token } = body;

        console.log(comment);


        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`,
            "Content-Type": "application/json"
        }

        let bodyContent = "";

        if (comment == "none") {
            bodyContent = JSON.stringify({ "status": status });
        } else {
            bodyContent = JSON.stringify({ "comment": comment, "status": status });
        }



        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/application/application/${id}`,
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
