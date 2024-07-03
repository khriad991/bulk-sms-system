
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function PUT(req,res) {
    try {
        const prisma = new PrismaClient()

        const {searchParams } = new URL(req.url)
        const id = parseInt(searchParams.get("id"))

        const headerList=  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const reqBody = await req.json();
        reqBody.userId = userId

        const data = await prisma.message_template.update({
            where:{id,userId},
            data:reqBody
        })

        return NextResponse.json({status:"success", message:"update success",data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"update fail", data:e.toString()})
    }

}