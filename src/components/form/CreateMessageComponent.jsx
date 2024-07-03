'use client';
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/components/childComponents/SubmitButton";
import {ErrorToast, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {Create} from "@/utility/APIHelper";

const CreateMessageComponent = ({data}) => {
    const [submit,setSubmit] = useState(false)
    const [formData,setFormData] = useState({
        name:"",
        content:""

    })
    const inputChange = (e) => {
        const {name , value} = e.target ;
        setFormData({ ...formData, [name]:value })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setSubmit(true)
        if(IsEmpty(formData.name)){
            ErrorToast("Name is Required!!")
            setSubmit(false)
        }else if(IsEmpty(formData.content)){
            ErrorToast("Content is Required!!")
            setSubmit(false)
        }else {

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
        <section className="w-full flex justify-center items-center py-24">
            <Toaster />
            <div className="flex flex-col items-center justify-center w-[70%] mx-auto gap-y-4  ">
                <div className="w-full bg-white rounded-lg shadow-md px-6  py-10 ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center ">Create Your Message</h2>
                    <form className="flex flex-col gap-4 " onSubmit={formSubmit} >

                     {/*
                                            <div className="flex flex-col ">
                                                <label className="text-base mb-1">Your SMTP List</label>
                                                <select   className="max-w-96 px-5 py-2 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 transition ease-in-out duration-150"
                                                          name="smtpId"
                                                          value={formData.smtpId}
                                                          onChange={inputChange}

                                                >
                                                    <option selected value="">select your SMTP</option>
                                                    {
                                                        data?.map((item, i) => (
                                                            <option className="py-2" key={i} value={item?.id}>{item?.name}</option>
                                                        ))
                                                    }
                                                </select>


                                            </div>
                    */}
                        <div className="flex flex-col">
                            <label className="text-base mb-1">Mesage Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={inputChange}
                                placeholder="Mesage Name"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label className="text-base mb-1">Write Your Message</label>
                            <textarea
                                name={"content"}
                                value={formData.content}
                                onChange={inputChange}
                                placeholder="Write Your Message"
                                className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                rows={5}
                            />
                        </div>

                        <SubmitButton submit={submit} text={"submit"} />
                    </form>


                </div>
            </div>
        </section>
    );
};

export default CreateMessageComponent;
