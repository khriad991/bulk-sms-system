
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const data = await prisma.email_list.findMany({
            where:{userId},
            orderBy:{
                createAt: "desc"
            }
        })

        return NextResponse.json({status:"success", message:`Get ${data.length} email list find by user`,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"create fail", data:e.toString()})
    }

}