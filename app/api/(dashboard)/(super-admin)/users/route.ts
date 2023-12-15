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

        const { name, email, pass, dob, phone, sid, type, session, token } = body;

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`,
            "Content-Type": "application/json"
        }

        const key = `${type.toString().toLowerCase()}_id`;

        let bodyContent = JSON.stringify({
            "email": email,
            "phone_number": phone,
            "password": pass,
            "full_name": name,
            "date_of_birth": dob,
            [key]: sid
        });

        let ty = type.toString().toLowerCase();

        let url = `${process.env.BASEURL}/api/v1/users/register/${ty}`;

        let reqOptions = {
            url: url,
            method: "POST",
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
