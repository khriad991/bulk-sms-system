import {NextResponse} from "next/server";
import {VerifyToken} from "@/utility/JWTTokenHelper";

export async function middleware(req){
    try {

        let token=req.cookies.get('token');
        let payload= await VerifyToken(token['value']);
        const requestHeader= new Headers(req.headers);
        requestHeader.set('email',payload['email'])
        requestHeader.set('id',payload['id'])

        return NextResponse.next({
            request:{
                headers:requestHeader
            }
        })
    }catch (e) {
        if(req.nextUrl.pathname.startsWith("/api")){
            return NextResponse.json({status:"fail", data:"Unauthorized"}, {status:401})
        }else{
            return   NextResponse.redirect(new URL('/user/login', req.url),303);
        }
    }
}

export const config={
    matcher:[
        '/api/dashboard/:path*',
        '/dashboard/:path*', // for client dashboards
    ]
}
