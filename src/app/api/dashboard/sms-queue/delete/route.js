
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function DELETE(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const {searchParams} = new URL(req.url)
        let id = parseInt(searchParams.get("id"))

        const data = await prisma.SMSQueue.delete({
            where:{id,userId}
        })

        return NextResponse.json({status:"success", message:"Delete success" ,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"Delete fail", data:e.toString()})
    }

}