'use client';
import React, { useState } from "react";
import * as XLSX from 'xlsx';
import toast, { Toaster } from "react-hot-toast";
import {ErrorToast, IsEmpty, SuccessToast, IsValidEmails} from "@/utility/FormHelper";
import SubmitButton from "@/components/childComponents/SubmitButton";

const AddEmailForm = () => {
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        emails: ""
    });
    const [inputType, setInputType] = useState("custom");
    const [submit, setSubmit] = useState(false);
    const [getEmails, setGetEmails] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            ErrorToast('Please select your file');
            return;
        }

        const fileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (!fileTypes.includes(selectedFile.type)) {
            ErrorToast('Please select only excel file types');
            return;
        }

        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = (e) => {
            const buffer = e.target.result;
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emails = data.reduce((acc, row) => {
                for (let key in row) {
                    if (emailPattern.test(row[key])) {
                        acc.push(row[key]);
                    }
                }
                return acc;
            }, []);

            setFormData({ ...formData, emails });
            // setEmailsExtracted(emails);
        };

        reader.onerror = (error) => {
            ErrorToast('Error reading file');
            console.error('File read error:', error);
        };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        if (IsEmpty(formData.name)) {
            ErrorToast("Name is required");
            setSubmit(false);
            return;
        } else if (IsEmpty(formData.type)) {
            ErrorToast("Type is required");
            setSubmit(false);
            return;
        }

        let emails = [];
        if (inputType === "custom") {
            if (IsEmpty(formData.emails)) {
                ErrorToast("Emails are required");
                setSubmit(false);
                return;
            }
            emails = formData.emails.split(/[\s,]+/).filter(email => IsValidEmails(email));
            if (emails.length === 0) {
                ErrorToast("Invalid email format detected");
                setSubmit(false);
                return;
            }
        } else if (inputType === "file") {
            emails = formData.emails;
            if (emails.length === 0) {
                ErrorToast("Email is required");
                setSubmit(false);
                return;
            }
        } else if (inputType === "url") {
            ErrorToast("Upcoming Custom fetching ");
            setSubmit(false);
            return;
        }

        try {
            const response = await fetch('/api/dashboard/email-list/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: formData.type,
                    name: formData.name,
                    all_email: emails,
                })
            });

            const result = await response.json();

            if (result?.status === 'success') {
                SuccessToast(result?.message);
                setGetEmails(result)
                console.log(getEmails)
                setSubmit(false);
            } else {
                ErrorToast(result?.message);
                setSubmit(false);
            }
        } catch (error) {
            toast.error("An error occurred while uploading data");
            console.error("Upload error:", error);
            setSubmit(false);
        }
    };

    return (
        <section className="w-full flex justify-center items-center py-24">
            <Toaster />
                <div className="flex flex-col items-center justify-center w-[70%] mx-auto gap-y-4  ">
                    <div className="w-full bg-white rounded-lg shadow-md px-6  py-10 ">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center ">Add Your Email List</h2>
                        <form className="flex flex-col gap-4 " onSubmit={handleFormSubmit}>
                            <div className="flex gap-x-6">
                                <label onChange={() => setInputType("custom")} className="flex justify-center items-center gap-x-3 uppercase font-bold" htmlFor="custom">custom
                                    <input defaultChecked={inputType === "custom"} name="check" id="custom" type="radio" className="radio w-5 h-5 rounded-full " />
                                </label>
                                <label onChange={() => setInputType("file")} className="flex justify-center items-center gap-x-3 uppercase font-bold" htmlFor="file">file
                                    <input name="check" id="file" type="radio" className="w-5 h-5 rounded-full " />
                                </label>
                                <label onChange={() => setInputType("url")} className="flex justify-center items-center gap-x-3 uppercase font-bold" htmlFor="url">url
                                    <input name="check" id="url" type="radio" className="w-5 h-5 rounded-full " />
                                </label>
                            </div>
                            <div className="flex flex-col gap-4">
                                <select
                                    className=" max-w-80 px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Your Type</option>
                                    <option value="BCC">BCC Emails</option>
                                    <option value="CC">CC Emails</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-base mb-1">Email List Name</label>
                                <input
                                    name="name"
                                    placeholder="Email List Name"
                                    className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                {inputType === "file" && (
                                    <div className="flex flex-col gap-y-1">
                                        <label className="text-base mb-1">Select An Excel file</label>
                                        <input
                                            placeholder="Choose a Excel file"
                                            className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                ) || inputType === "url" && (
                                    <div className="flex flex-col gap-y-1">
                                        <label className="text-base mb-1">Provide Your Sheet Link</label>
                                        <input
                                            placeholder="Provide Your Link"
                                            className="px-5 py-3 bg-gray-100 text-gray-800 border-0 rounded-md focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                            type="text"
                                        />
                                    </div>
                                ) || inputType === "custom" && (
                                    <div className="flex flex-col gap-y-1 group ">
                                        <label className="text-base mb-1">Write Your All Email</label>
                                        <span className="group-focus:text-red-300 text-sm text-gray-700" title="Writing way"> xyz@gmail.com abc@gmail.com ... </span>
                                        <textarea
                                            name="emails"
                                            value={formData.emails}
                                            onChange={handleInputChange}
                                            placeholder={`xyz@gmail.com abc@gmail.com xyz@gmail.com == you can oly use space and Enter .`}
                                            className="px-5 py-3 rounded-[10px] w-full text-start p-3 bg-gray-200 text-gray-600 border-0 focus:placeholder:text-sky-200 placeholder:text-lg focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                            rows={5}
                                        />
                                    </div>
                                )}
                            </div>

                            <SubmitButton submit={submit} text={"submit"} />
                        </form>
                        <div className="flex justify-evenly hidden">
                            {/*{getEmails && (getEmails?.map((item,i)=>(<span key={i}>{item}</span>)))}*/}
                        </div>

                    </div>
                </div>
        </section>
    );
};

export default AddEmailForm;
