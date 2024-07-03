
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function PUT(req,res) {
    try {
        const prisma = new PrismaClient()

        const {searchParams } = new URL(req.url)
        const id = parseInt(searchParams.get("id"))

        const headerList=  new Headers(req.headers)
        let  userId = headerList.get("id")

        const reqBody = await req.json();
        reqBody.userId = parseInt(userId)

        let removedDuplicatesCount = 0;

        if(reqBody.all_email && Array.isArray(reqBody.all_email)){
            let originalEmailLength = reqBody.all_email.length
            reqBody.all_email = Array.from(new Set(reqBody.all_email))
            removedDuplicatesCount = originalEmailLength -  reqBody.all_email.length
        }

        const data = await prisma.email_list.update({
            where:{id},
            data:reqBody
        })

        return NextResponse.json({status:"success", message:"update success", remove:`find out ${removedDuplicatesCount} duplicate emails removed ` ,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"update fail", data:e.toString()})
    }

}