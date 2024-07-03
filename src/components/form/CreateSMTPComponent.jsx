'use client';
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/components/childComponents/SubmitButton";
import {ErrorToast, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {Create} from "@/utility/APIHelper";

const CreateSMTPComponent = ({data}) => {
    const [submit,setSubmit] = useState(false)
    const [formData,setFormData] = useState({
        name:"",
        smtpHost:"",
        smtpPort:0,
        smtpUser:"",
        smtpPass:""

    })
    const inputChange = (e) => {
        const {name , value} = e.target ;
        setFormData({
            ...formData,
            [name]: name === "smtpPort" ? Number(value) :value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setSubmit(true)
        if(IsEmpty(formData.name)){
            ErrorToast("Name is Required!!")
            return setSubmit(false)
        }else if(IsEmpty(formData.smtpHost)){
            ErrorToast("Content is Required!!")
            return setSubmit(false)
        }else if(IsEmpty(formData.smtpPort)){
            ErrorToast("Content is Required!!")
            return setSubmit(false)
        }else if(IsEmpty(formData.smtpUser)){
            ErrorToast("Content is Required!!")
            return setSubmit(false)
        }else if(IsEmpty(formData.smtpPass)){
            ErrorToast("Content is Required!!")
            return setSubmit(false)
        }else {

            Create("/api/dashboard/smtp-configura/create",formData).then((res)=>{
                if(res?.status === "success"){
                    SuccessToast(res?.message)
                    setSubmit(false)
                    setFormData({
                        name:"",
                        smtpHost:"",
                        smtpPort:0,
                        smtpUser:"",
                        smtpPass:""
                    })
                }else{
                    ErrorToast(res?.message)
                    setSubmit(false)
                }
            })
        }
    }




    return (
        <section className="w-full flex justify-center items-center">
            <Toaster />
            <div className="flex flex-col items-center justify-center w-[70%] mx-auto gap-y-4  ">
                <div className="w-full bg-white rounded-lg shadow-md px-6  py-10 ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center ">Create Your Message</h2>
                    <form className="flex flex-col gap-4 " onSubmit={formSubmit} >


                        <div className="flex flex-col">
                            <label className="text-base mb-1">SMTP Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={inputChange}
                                placeholder="SMTP Name"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-base mb-1">SMTP Host Name</label>
                            <input
                                name="smtpHost"
                                value={formData.smtpHost}
                                onChange={inputChange}
                                placeholder="SMTP Host Name"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-base mb-1">SMTP Port</label>
                            <input
                                name="smtpPort"
                                value={formData.smtpPort}
                                onChange={inputChange}
                                placeholder="SMTP Port"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="number"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-base mb-1">SMTP User Name</label>
                            <input
                                name="smtpUser"
                                value={formData.smtpUser}
                                onChange={inputChange}
                                placeholder="Mesage Name"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="text-base mb-1">Write Your SMTP Password</label>
                            <input
                                name={"smtpPass"}
                                value={formData.smtpPass}
                                onChange={inputChange}
                                placeholder="Write Your Message"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type={"SMTP Password"}
                            />
                        </div>

                        <SubmitButton submit={submit} text={"Create SMTP"} />
                    </form>


                </div>
            </div>
        </section>
    );
};

export default CreateSMTPComponent;
