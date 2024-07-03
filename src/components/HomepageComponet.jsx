'use client'
import React from 'react';
import {Button} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import bannerShape01 from "../../public/banner-shape01.png";

const HomepageComponet = () => {
    return (
        <section>
            <div className="container py-10 ">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row md:grid-flow-col gap-4 place-items-center  ">
                    <div className="col-span-12 md:col-span-8 place-items-center lg:col-span-6 py-20 space-y-5">
                        <span className=" uppercase text-[#5350ff] text-base ">BUILD A BETTER CUSTOMER EXPERIENCE</span>
                        <h1 className="md:mr-8 lg:mr-3 text-4xl lg:text-5xl font-bold leading-[50px] lg:leading-[60px]">
                            Reach More Customers With Faster, More Reliable SMS Messaging
                            Contact To Expert
                        </h1>
                        <Button color="blue" className=" text-lg cursor-pointer font-bold uppercase" >
                            <Link className="w-full h-full px-16" href={"/user/login"}>login</Link>
                        </Button>
                    </div>
                    <div className="hidden lg:block col-span-12 md:col-span-4 lg:col-span-6 ">
                        <Image src={bannerShape01}
                               width={600}
                               height={450}
                               className="w-full h-full aspect-auto object-cover" alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomepageComponet;