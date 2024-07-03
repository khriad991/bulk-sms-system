
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function POST(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = headerList.get("id")

        const reqBody = await req.json();
            reqBody.userId = parseInt(userId)
        const existName = await prisma.SMTPConfiguration.findUnique({
            where:{name:reqBody["name"]}
        })
        if(existName){
           return NextResponse.json({status:'fail',message:`name ${reqBody["name"]} already exist`, })
        }

        const data = await prisma.SMTPConfiguration.create({
            data:reqBody
        })

        return NextResponse.json({status:"success", message:"Create success", data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"create fail", data:e.toString()})
    }

}