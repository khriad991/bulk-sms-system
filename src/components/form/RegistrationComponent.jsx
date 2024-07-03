'use client'
import React, {useRef, useState} from 'react';
import SubmitButton from "@/components/childComponents/SubmitButton";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {Toaster} from "react-hot-toast";
import Link from "next/link";
import {Create} from "@/utility/APIHelper";
import {useRouter} from "next/navigation";
const RegistrationComponent = () => {
    const [submit,setSubmit] = useState(false)
    const router = useRouter()

    let nameRef,emailRef, passwordRef = useRef

    const fromSubmit =async (e) => {
        e.preventDefault()
        setSubmit(true)
        let name = nameRef.value
        let email = emailRef.value
        let password = passwordRef.value

        if(IsEmail(email)){
            ErrorToast("provide a valid Email")
            setSubmit(false)
        }else if(IsEmpty(name)){
            ErrorToast("Name is Required!!")
            setSubmit(false)
        }else if(IsEmpty(email)){
            ErrorToast("Email is Required!!")
            setSubmit(false)
        }else if(IsEmpty(password)){
            ErrorToast("password is Required!!")
            setSubmit(false)
        }else {
            Create("/api/user/registration",{name,email, password}).then((res)=>{
                if(res?.status === "success"){
                    SuccessToast("registration success")
                    window.location.href = "/dashboard/profile"
                    return setSubmit(false)
                }else {
                    if(res?.message === "user already exits"){
                        ErrorToast("user already exits")
                        setSubmit(false)
                        return router.replace("/user/login")
                    }
                    ErrorToast("something went wrong")
                    setSubmit(false)
                }
            })
        }

    }
    return(
        <section>
            <div className="container">
                <Toaster position="top-center" reverseOrder={false}/>
                <div className="flex flex-col items-center justify-center h-screen dark">
                    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md px-8 py-20">
                        <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Registration Form</h2>
                        <form className="flex flex-col gap-y-5 ">
                            <input
                                ref={(input) => nameRef = input }
                                placeholder="Full Name"
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-300"
                                type="text"
                            />
                            <input
                                ref={(input) => emailRef = input }
                                placeholder="Email address"
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-300"
                                type="email"
                            />
                            <input
                                ref={input => passwordRef = input }
                                placeholder="Password"
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-300"
                                type="password"
                            />





                            <div className="flex items-center justify-between flex-wrap">
                                <label className="text-sm text-gray-200 cursor-pointer" htmlFor="remember-me">
                                    <input className="mr-2" id="remember-me" type="checkbox" />
                                    Remember me
                                </label>
                                <a className="text-sm text-blue-500 hover:underline mb-0.5" href="#">Forgot password?</a>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p className="text-white mt-4"> Already have an account? <Link className="text-sm text-blue-500 -200 hover:underline mt-4" href={"/user/login"}>Sign up</Link></p>
                            </div>
                            <SubmitButton onClick={fromSubmit} submit={submit} text="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )


};


export default RegistrationComponent;




