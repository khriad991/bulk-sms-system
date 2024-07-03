import { NextResponse } from 'next/server';

export async function GET(req) {
        const response = NextResponse.redirect(new URL('/', req.url), 303);


        // Set the cookie to expire in the past
        response.cookies.set('token', '', { expires: new Date(0), path: '/' });

        return response;
}
