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

        const { email } = await req.json();

        const apiUrl = 'https://seal-app-krop4.ondigitalocean.app/logout';
        const response = await axios.post(apiUrl, {
            email
        });

        var status = response.data['meta']['code'];
        return NextResponse.json({ status: status })

    } catch (error) {
        return NextResponse.json({ msg: 'Server Error' }, { status: 401 })

    }
}
