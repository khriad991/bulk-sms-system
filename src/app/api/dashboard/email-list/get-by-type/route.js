

import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function GET(req,res) {
    try {
        const prisma = new PrismaClient()

        const headerList =  new Headers(req.headers)
        let  userId = headerList.get("id")

        const {searchParams} = new URL(req.url)
        let type = searchParams.get("type")
        console.log(type)

        if(type){
            type = type.toUpperCase();
        }




        const data = await prisma.email_list.findMany({
            where:{type:type, userId:parseInt(userId)}
        })

        return NextResponse.json({status:`Get ${data.length} email list find by ${type} type `,data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"create fail", data:e.toString()})
    }

}