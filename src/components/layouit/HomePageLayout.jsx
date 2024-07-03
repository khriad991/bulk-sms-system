'use client'

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {useState} from "react";
import Link from "next/link";
import {El_Messiri, Mrs_Saint_Delafield} from "next/dist/compiled/@next/font/dist/google";
import {InboxStackIcon} from "@heroicons/react/16/solid";
import {InboxArrowDownIcon} from "@heroicons/react/20/solid";


const HomePageLayout = ({children}) => {

    const [open, setOpen] = useState(0);


    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };


    return (
        <section className="w-screen">
            <div className="grid grid-cols-12  gap-3 ">
                <div className="col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-3 relative md:static z-0 ">
                    <Card className="h-screen w-full p-4 shadow-xl shadow-blue-gray-900/5 absolute md:static left-0 top-0 overflow-hidden block ">
                            <div className="mb-2 p-4 relative md:static  z-0 block  md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="size-8 text-black text-right absolute sm md:static top-1 -right-[10px] block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="ize-8 text-black text-right absolute md:static top-1 -right-[10px] hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <List>
                                <Link href={"/dashboard"} >
                                    <ListItem>
                                        <ListItemPrefix>
                                            <InboxArrowDownIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Dashboard
                                    </ListItem>
                                </Link>
                                <Accordion
                                    open={open === 1}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === 1}>
                                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <ShoppingBagIcon className="h-5 w-5" />
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                SMTP Configuration
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <Link href={"/dashboard/my-smtp/all-smtp"} >
                                                <ListItem >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    all SMTP
                                                </ListItem>
                                            </Link>
                                            <Link href={"/dashboard/my-smtp/update"} >
                                                <ListItem >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    SMTP Update
                                                </ListItem>
                                            </Link>
                                            <Link href={"/dashboard/my-smtp/create-smtp"} >
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Create SMTP
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                                <hr className="my-2 border-blue-gray-50" />
                                <Accordion
                                    open={open === 2}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === 2}>
                                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <ShoppingBagIcon className="h-5 w-5" />
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                E-mail
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <Link href={"/dashboard/email/cc-email"} >
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    CC Email
                                                </ListItem>
                                            </Link>
                                            <Link href={"/dashboard/email/bcc-email"} >
                                                <ListItem >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    BCC Email
                                                </ListItem>
                                            </Link>
                                            <Link href={"/dashboard/email/create-email-list"} >
                                                <ListItem >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Create Email List
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                                <hr className="my-2 border-blue-gray-50" />
                                <Accordion
                                    open={open === 3}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === 2}>
                                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <InboxIcon className="h-5 w-5" />

                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                Message
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            <Link href={"/dashboard/message/all-message"} >
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    All Message
                                                </ListItem>
                                            </Link>
                                            <Link href={"/dashboard/message/send-message"} >
                                                <ListItem >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Send Message
                                                </ListItem>
                                            </Link>
                                            <Link href={"/dashboard/message/create-message"} >
                                                <ListItem >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix>
                                                    Create Message
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                                <hr className="my-2 border-blue-gray-50" />
                                <Link href={"/dashboard/message"}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <InboxIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Message
                                    </ListItem>
                                </Link>
                                <Link href={"/dashboard/profile"}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <UserCircleIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        Profile
                                    </ListItem>
                                </Link>
                                <ListItem>
                                    <ListItemPrefix>
                                        <PowerIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Log Out
                                </ListItem>
                            </List>
                        </Card>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-9 p-4">{children}</div>
            </div>
        </section>
    );
};

export default HomePageLayout
