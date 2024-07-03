import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import {CreateToken} from "@/utility/JWTTokenHelper";
import bcrypt from 'bcrypt';

export async function POST(req,res) {
    try{

        const prisma= new PrismaClient();
        let reqBody =await req.json();

        const user= await prisma.user.findUnique({
           where:{
               email:reqBody.email,
           }
        })

        if(!user){
            return NextResponse.json(
                { status: "fail",message:"User Not Found"},
                {status:404}
            )}

        const passwordMatch = await bcrypt.compare(reqBody.password, user.password)
        if(!passwordMatch){
            return NextResponse.json(
                {status:"fail",message:"invalid candidate"},
                {status:401})
        }

        let token=await CreateToken(user['email'],user['id']);
        let expireDuration=new Date(Date.now() + 24*60*60*1000 );
        const cookieString=`token=${token}; expires=${expireDuration.toUTCString()}; path=/`;

        return  NextResponse.json({
            status:"success",
            message:"login success",
            token:token
        }, {
            status: 200,
            headers: { "Set-Cookie": cookieString }
        })

    }catch (e) {
        return NextResponse.json({ status: "fail",message:"some went wrong", data: e.toString()});
    }
}

