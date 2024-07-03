import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import {CreateToken} from "@/utility/JWTTokenHelper";
import bcrypt from "bcrypt"



export async function POST(req,res) {
    try{
        let {email, otp ,password}= await req.json();
        const prisma = new PrismaClient();

        const result = await prisma.user.findMany({
            where:{email, otp}
        })
        if(result.length===0){
            return  NextResponse.json({status:"fail",data:"Invalid Verification Code"})
        }
        else{
            const hashPassword = await bcrypt.hash(password, 10)

            let data = await prisma.user.update({
                where: { email },
                data:{
                    otp:"0",
                    password:hashPassword
                }
            });
            let token=await CreateToken(result[0]['email'],result[0]['id']);
            let expireDuration=new Date(Date.now() + 24*60*60*1000 );
            const cookieString=`token=${token}; expires=${expireDuration.toUTCString()} ;path=/`;
            return  NextResponse.json({
                status:"success",data , token},
                {
                    status:200,
                    headers:{"Set-Cookie":cookieString}
                })
        }
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}