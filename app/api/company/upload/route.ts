import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export const config = {
    api: {
        bodyParser: false,
    },
};

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

        const { name, file, website, email, contact, address, linkedIn, industry, session, token } = body;

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`
        }

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("file", file);
        formdata.append("company_website", website);
        formdata.append("company_email", email);
        formdata.append("company_contact", contact);
        formdata.append("company_address", address);
        formdata.append("company_linkedin", linkedIn);
        formdata.append("company_industry", industry);

        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/company/companies`,
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
