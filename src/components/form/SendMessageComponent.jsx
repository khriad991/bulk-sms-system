'use client';
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/components/childComponents/SubmitButton";
import {ErrorToast, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {Create, Get} from "@/utility/APIHelper";
import {StarIcon} from "@heroicons/react/16/solid";
const SendMessageComponent = ({data}) => {
    const [submit,setSubmit] = useState(false)
    const [formData,setFormData] = useState({
        smtpId:0,
        email_listId:0,
        messageId:0,
        message:""
    })
    const [selectSMTP,setSelectSMTP] = useState({})
    const [selectEmailData,setSelectEmailData] = useState({})
    const [selectMessage,setSelectMessage] = useState({})
    const inputChange = async (e) => {
        const {name , value} = e.target ;
        setFormData({ ...formData, [name]:value })


        // // Fetch data based on the select input changed
        if(name === "smtpId"){
            try {
                const res  = await  Get(`/api/dashboard/smtp-configura/get?id=${value}`)
                if(res?.status === "success"){
                    setSelectSMTP(res?.data)
                }
            }catch (e) {
                console.error("error the fetching smtp",e)
            }
        } else if(name === "email_listId"){
            try {
                const res =  await Get(`/api/dashboard/email-list/get?id=${value}`);
                if(res?.status === "success"){
                    setSelectEmailData(res?.data)
                }
            }catch (e) {
                console.error("error the fetching smtp",e)
            }
        }else if(name === "messageId"){
            try {
                const res = await Get(`/api/dashboard/message/get?id=${value}`)
                if(res?.status === "success"){
                    setSelectMessage(res?.data)
                    setFormData({message: res?.data?.message} )
                }
            }catch (e) {
                console.error("error the fetching smtp",e)
            }
        }

    }
    const formSubmit = (e) => {
        e.preventDefault();
        setSubmit(true)
        if(IsEmpty(formData.smtpId)){
            ErrorToast("Select Your SMTP Provider")
            setSubmit(false)
        }else if(IsEmpty(formData.email_listId)){
            ErrorToast("Select your Email List!!")
            setSubmit(false)
        }else if(IsEmpty(formData.messageId)){
            ErrorToast("Select your message")
            setSubmit(false)
        }
        else {

            Create("/api/dashboard/message/create",formData).then((res)=>{
                if(res?.status === "success"){
                    SuccessToast(res?.message)
                    setSubmit(false)
                    setFormData({
                        name:"",
                        content:""
                    })
                }else{
                    ErrorToast(res?.message)
                    setSubmit(false)
                }
            })
        }
    }

    return (
        <section className="w-full flex sm:justify-center sm:items-center py-4 sm:py-8  ">
            <Toaster />
            <div className="flex flex-col sm:items-center sm:justify-center w-full sm:w-[80%] md:[70%]  mx-auto gap-y-4  ">
                <div className="w-full bg-white rounded-lg shadow-md  px-4 md:px-6 py-8 ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center ">Send Your Message</h2>
                    <form className="flex flex-col gap-4 " onSubmit={formSubmit} >
                        <div className="flex flex-col gap-y-4">
                            <label className="text-base mb-1">Select SMTP Provider</label>
                            <select  className="max-w-96 px-5 py-2 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400 transition ease-in-out duration-150"
                                     name="smtpId"
                                     value={formData.smtpId}
                                     onChange={inputChange}
                            >
                                <option selected value="">select your SMTP</option>
                                {
                                    data?.smtpList?.map((item, i) => (
                                        <option className="py-2" key={i} value={item?.id}>{item?.name}</option>
                                    ))
                                }
                            </select>

                            {selectSMTP && (
                                <div className={ "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3"}>
                                    {/*<span className="col-span-12 text-md text-red-300 -my-2">Read only</span>*/}
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-1">Your SMTP Name</label>
                                        <input
                                            className="col-span-1 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400 transition ease-in-out duration-150"
                                            type="text"
                                            readOnly
                                            placeholder="Read Only"
                                            defaultValue={selectSMTP.name}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-1">SMTP User Name</label>
                                        <input
                                            type={'text'}
                                            readOnly
                                            placeholder="Read Only"
                                            className="col-span-1 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400 transition ease-in-out duration-150"
                                            defaultValue={selectSMTP.smtpUser}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-1">SMTP Host Name</label>

                                        <input
                                            type={'text'}
                                            readOnly
                                            placeholder="Read Only"
                                            className="col-span-1 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400 transition ease-in-out duration-150"
                                            defaultValue={selectSMTP.smtpHost}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm mb-1">SMTP Port</label>
                                        <input
                                            type={'text'}
                                            readOnly
                                            placeholder="Read Only"
                                            className="col-span-1 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400 transition ease-in-out duration-150"
                                            defaultValue={selectSMTP.smtpPort}
                                        />
                                    </div>
                                </div>
                            )}


                        </div>

                        <div className="flex flex-col ">
                            {selectEmailData && (
                                <div className={ "grid grid-cols-1 gap-3 justify-center items-center"}>
                                    <div className="col-span-full">
                                        <label className=" text-base mb-1 block">Select Email List</label>
                                        <select   className="col-span-6 px-5 py-2 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 transition ease-in-out duration-150"
                                                  name="email_listId"
                                                  value={formData.smtpId}
                                                  onChange={inputChange}
                                        >
                                            <option selected value="">select your SMTP</option>
                                            {
                                                data?.emailList?.map((item, i) => (
                                                    <option className="py-2" key={i} value={item?.id}>{item?.name}</option>
                                                ))
                                            }
                                        </select>

                                    </div>
                                    <input
                                        placeholder="Write Your Message"
                                        className="col-span-6 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        type="text"
                                        defaultValue={selectEmailData.name}
                                    />

                                    <textarea
                                        rows={3}
                                        placeholder="Write Your Message"
                                        className="col-span-12 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        defaultValue={selectEmailData.all_email}
                                    />
                                </div>
                            )}

                        </div>
                        <div className="grid gap-2 ">
                            <label className="text-base">Select Your Message</label>
                            <select   className="max-w-96 px-5 py-2 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 transition ease-in-out duration-150"
                                      name="messageId"
                                      value={formData.smtpId}
                                      onChange={inputChange}
                            >
                                <option selected value="">select your SMTP</option>
                                {
                                    data?.Allmessage?.map((item, i) => (
                                        <option className="py-2" key={i} value={item?.id}>{item?.name}</option>
                                    ))
                                }
                            </select>
                            {selectMessage && (
                                <div className={ "grid grid-cols-1 sm:grid-cols-2 gap-4 "}>
                                    <input
                                        placeholder="Write Your Message"
                                        className="col-span-1 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        type="text"
                                        defaultValue={selectMessage.name}
                                    />
                                    <input
                                        type={'text'}
                                        placeholder="Write Your Message"
                                        className="col-span-1 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                        defaultValue={selectMessage.content}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="text-base mb-1">Write Your Message</label>
                            <input
                                name={"message"}
                                value={formData.message}
                                onChange={inputChange}
                                defaultValue={selectMessage.content}
                                placeholder="Write Your Message"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                            />
                        </div>
                        <SubmitButton submit={submit} text={"Send Message"} />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SendMessageComponent;
