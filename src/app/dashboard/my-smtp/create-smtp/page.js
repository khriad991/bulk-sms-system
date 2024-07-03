
import React from 'react';
import HomePageLayout from "@/components/layouit/HomePageLayout";
import {headers} from "next/headers";
import {PrismaClient} from "@prisma/client";
import CreateSMTPComponent from "@/components/form/CreateSMTPComponent";

async function GetData() {
    // return (await (await fetch(`${process.env.HOST}/api/dashboard/smtp-configura/get-all`)).json())
    let prisma = new PrismaClient()
    const headerList = headers()
    let userId = parseInt(headerList.get("id"))
    return prisma.sMTPConfiguration.findMany({
        where: {userId}
    });
}
export default async function Page()  {

    let data = await  GetData();
    return (
        <main>
            <HomePageLayout>
                <CreateSMTPComponent data={data}/>
            </HomePageLayout>
        </main>
    );
};

