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

        const { password, cpassword, file, cv, depart, session, token } = body;

        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Cookie": `session=${session}`
        }

        const formdata = new FormData();
        if (password != "null") formdata.append("new_password", password);
        if (password != "null") formdata.append("confirm_password", password);
        if (file != "null") formdata.append("profile_pic", file);
        if (cv != "null") formdata.append("cv", cv);
        if (depart != "null") formdata.append("department_id", depart);


        let reqOptions = {
            url: `${process.env.BASEURL}/api/v1/users/profile`,
            method: "PUT",
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
