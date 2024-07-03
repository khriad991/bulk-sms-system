
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const data = await prisma.SMSQueue.findMany({
            where:{userId}
        })

        return NextResponse.json({status:"success", message:`total ${data.length} SMS Queue data Get ` ,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"Get ALL fail", data:e.toString()})
    }

}