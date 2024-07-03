
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const {searchParams} = new URL(req.url)
        let id = parseInt(searchParams.get("id"))

        const data = await prisma.message_template.findUnique({
            where:{userId, id}
        })

        return NextResponse.json({status:"success", message:"get success" ,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"get fail", data:e.toString()})
    }

}