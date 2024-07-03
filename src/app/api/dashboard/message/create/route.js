
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function POST(req) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const reqBody = await req.json();
            reqBody.userId = userId

        const data = await prisma.message_template.create({
            data:reqBody
        })

        return NextResponse.json({status:"success", message:"Create success", data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"create fail", data:e.toString()})
    }

}