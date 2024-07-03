import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import {SendEmail} from "@/utility/EmailHelper";
import {encodeMatchers} from "next/dist/build/webpack/loaders/next-middleware-loader";
export async function POST(req,res){
    try {

        const prisma=new PrismaClient();

        const {email} = await req.json();


        let code=(Math.floor(100000+Math.random()*900000)).toString()
        let EmailText=`Your OTP Code is=${code}`
        let EmailSubject="Bulk system email send-by-cc send-by-cc OTP";
        await SendEmail(email, EmailText, EmailSubject)

        const data = await prisma.user.update({
            where: { email},
            data:{otp:code},
        });


        return  NextResponse.json({status:"success",data})

    }catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}