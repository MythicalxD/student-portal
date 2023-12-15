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

        const { name, desc, file, session, token } = body;

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`
        }

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("description", desc);
        formdata.append("file", file);

        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/companyIndustry/register`,
            method: "POST",
            headers: headersList,
            data: formdata,
        }

        let response = await axios.request(reqOptions);
        console.log(response.data);


        return NextResponse.json({ token: `done` }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ token: `error` }, { status: 500 })
    }
}
