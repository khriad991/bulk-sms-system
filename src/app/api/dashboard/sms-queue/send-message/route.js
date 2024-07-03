
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {sendEmailMessage} from "@/utility/EmailHelper";
export async function POST(req,res) {
    try {
        const prisma = new PrismaClient()
        const headerList =  new Headers(req.headers)
        let  userId = parseInt( headerList.get("id"))
        const { smtpId, email_listId, messageId,message } = await req.json();

        if (!smtpId || !email_listId || !messageId || !userId || !message) {
            return NextResponse.json({ message: 'Required the all ID Number' });
        }

        const findSMTP = await prisma.sMTPConfiguration.findUnique({where:{id:smtpId}})
        const findEmailList = await prisma.email_list.findUnique({where:{id:email_listId}})
        const findMessage = await prisma.message_template.findUnique({where:{id:messageId}})

        if (!findSMTP || !findEmailList || !findMessage) {
            return NextResponse.json({ status: 'fail', message: 'Invalid IDs provided' });
        }


        // smtpHost, smtpPort, smtpUser, smtpPass, to, cc, bcc, subject, text
        let mail = await sendEmailMessage({
            smtpHost:findSMTP.smtpHost,
            smtpPort:findSMTP.smtpPort,
            smtpUser:findSMTP.smtpUser,
            smtpPass:findSMTP.smtpPass,
            // to:findEmailList.all_email,
            cc:findEmailList.all_email,
            // bcc:findEmailList.all_email,
            subject:findMessage.name,
            text:findMessage.content
        })
        console.log(mail)

        let recipientPhone =   new Date.now().toString()

        const data = await prisma.SMSQueue.create({
            data:{
                recipientPhone:recipientPhone,
                message:findMessage.content ,
                smtpId,
                email_listId,
                messageId,
                userId,
            }
        })

        return NextResponse.json({status:"success", message:"Create success", data})

    }catch (e) {
        return NextResponse.json({status:'fail',message:"create fail", data:e.toString()})
    }

}