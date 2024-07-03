export const revalidate = 0;
import React from 'react';
import HomePageLayout from "@/components/layouit/HomePageLayout";
import {headers} from "next/headers";
import {PrismaClient} from "@prisma/client";
import SendMessageComponent from "@/components/form/SendMessageComponent";


async function GetData() {
    // return (await (await fetch(`${process.env.HOST}/api/dashboard/smtp-configura/get-all`)).json())
    let prisma = new PrismaClient()
    const headerList = headers()
    let userId = parseInt(headerList.get("id"))

    let smtpList= await  prisma.sMTPConfiguration.findMany({
        where: {userId}
    });
    let emailList = await prisma.email_list.findMany({
        where:{userId}
    })

    let Allmessage = await prisma.message_template.findMany({
        where:{userId}
    })


    return {smtpList , emailList, Allmessage}
}
export default async function Page()  {

    let data = await  GetData();
    return (
        <main>
            <HomePageLayout>
               <SendMessageComponent data={data} />
            </HomePageLayout>
        </main>
    );
};

