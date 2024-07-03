
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function POST(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = parseInt(headerList.get("id"))

        const {searchParams} = new URL(req.url)
        let id = parseInt(searchParams.get("id"))

        const templateMassage = await prisma.message_template.findUnique({
            where:{userId, id}
        })

        if(!templateMassage){
            return NextResponse.json({status:'fail',message:"Message Not Found"})
        }

        return NextResponse.json({status:"success", message:"get success",data:templateMassage})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"get fail", data:e.toString()})
    }

}