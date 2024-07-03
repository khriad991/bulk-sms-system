import React from 'react';
import HomePageLayout from "@/components/layouit/HomePageLayout";
import CreateMessageComponent from "@/components/form/CreateMessageComponent";
import {headers} from "next/headers";
import {PrismaClient} from "@prisma/client";

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
                <CreateMessageComponent data={data}/>
            </HomePageLayout>
        </main>
    );
};

