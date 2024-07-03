import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {CreateToken} from "@/utility/JWTTokenHelper";
export async function POST(req) {
    try {
        const prisma = new PrismaClient();
        const reqBody = await req.json()
        reqBody.otp = "0"

        // reqBody.email= await bcrypt.hash(reqBody.email, 10)
        reqBody.password = await bcrypt.hash(reqBody.password, 10)

        const findUser = await prisma.user.findUnique({
            where:{email:reqBody["email"]}
        })
        if(!findUser){
            const data = await prisma.user.create({
                data: reqBody
            })

            const token =await CreateToken(data.email, data.id)
            let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
            let cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`



            return NextResponse.json(
                { status: 'success',
                    message:"registration success",
                    token
                },
                {
                    status:200,
                    headers:{"Set-Cookie":cookieString}
                }
            );

        }
        return NextResponse.json({status:"fail", message:"user already exits"},)

    } catch (error) {
        return NextResponse.json({ status: 'fail', message:"Registration fail!! try again", data:error.toString()});
    }
}
