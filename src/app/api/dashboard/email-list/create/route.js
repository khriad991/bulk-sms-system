
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function POST(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = headerList.get("id")

        const reqBody = await req.json();
            reqBody.userId = parseInt(userId)
        const existingRecord = await prisma.email_list.findFirst({
            where: {
                name: reqBody['name'],
                type: reqBody["type"],
            },
        });

        if (existingRecord) {
            return NextResponse.json({
                status: 'fail',
                message: `${existingRecord["type"]} & ${existingRecord["name"]} already exist`,
            });
        }

        let removedDuplicatesCount = 0;

        if(reqBody.all_email && Array.isArray(reqBody.all_email)){
            let originalEmailLength = reqBody.all_email.length
            reqBody.all_email = Array.from(new Set(reqBody.all_email))
            removedDuplicatesCount = originalEmailLength -  reqBody.all_email.length
        }

        const data = await prisma.email_list.create({
            data:reqBody
        })

        return NextResponse.json({status:"success", message:"Create success", duplicate_email:`find ${removedDuplicatesCount} duplicate email Are Removed` ,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"create fail", data:e.toString()})
    }

}



