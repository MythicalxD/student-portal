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
            "Cookie": `session=${session}`
        }

        const formdata = new FormData();
        formdata.append("full_name", name);
        formdata.append("email", email);
        formdata.append("phone_number", phone);
        formdata.append("password", pass);
        formdata.append("date_of_birth", dob);
        formdata.append(`${type.toString().toLowerCase}_id`, sid);

        let url = `${process.env.BASEURL}/api/v1/users/register/${type.toString().toLowerCase}`;

        let reqOptions = {
            url: url,
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
