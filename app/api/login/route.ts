import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    if (req.method !== 'POST') {
        return NextResponse.json({ msg: 'Method Not Allowed' }, { status: 405 })
    }

    try {
        // Access the email and password from the request body
        const { email, pass } = await req.json();

        const apiUrl = 'https://seal-app-krop4.ondigitalocean.app/api/v1/users/login';
        const response = await axios.post(apiUrl, {
            email,
            password: pass, // Assuming your external API expects 'password' instead of 'pass'
        });

        var token = response.data['access_token'];
        var session = response.headers['set-cookie']?.find((row) => row.startsWith("session="))?.split("=")[1].split("; ")[0];

        return NextResponse.json({ token: `${token}`, session: `${session}` }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ msg: 'Server Error' }, { status: 401 })

    }
}
