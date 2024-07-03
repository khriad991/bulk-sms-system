'use client'
import React, {useRef, useState} from 'react';
import SubmitButton from "@/components/childComponents/SubmitButton";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {Toaster} from "react-hot-toast";
import {Login} from "@/utility/APIHelper";
import Link from "next/link";
const LoginComponent = () => {
    const [submit,setSubmit] = useState(false)

    let emailRef, passwordRef = useRef

    const fromSubmit =async (e) => {
        e.preventDefault()
        setSubmit(true)
        let email = emailRef.value
        let password = passwordRef.value

        if(IsEmail(email)){
            ErrorToast("provide a valid Email")
            setSubmit(false)
        }else if(IsEmpty(email)){
            ErrorToast("Email is Required!!")
            setSubmit(false)
        }else if(IsEmpty(password)){
            ErrorToast("password is Required!!")
            setSubmit(false)
        }else {
           Login({email, password}).then((res)=>{
               if(res?.status === "success"){
                   SuccessToast(res?.message)
                    setSubmit(false)
                   window.location.href = "/dashboard/profile"
               }else {
                   ErrorToast(res?.message)
                   setSubmit(false)
               }
           })
        }

    }
    return(
      <section>
          <div className="container">
              <Toaster position="top-center" reverseOrder={false}/>
              <div className="flex flex-col items-center justify-center h-screen">
                  <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md px-6 py-20">
                      <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Login Here</h2>
                      <form className="flex flex-col gap-y-5 ">
                          <input
                              ref={(input) => emailRef = input }
                              placeholder="Email address"
                              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-300"
                              type="email" />
                          <input
                              ref={input => passwordRef = input }
                              placeholder="Password"
                              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-300"
                              type="password" />
                          <div className="flex items-center justify-between flex-wrap">
                              <label className="text-sm text-gray-200 cursor-pointer" htmlFor="remember-me">
                                  <input className="mr-2" id="remember-me" type="checkbox" />
                                  Remember me
                              </label>
                              <Link className="text-sm text-blue-500 hover:underline mb-0.5" href={"/user/forgo"}>Forgot password?</Link>
                              {/* eslint-disable-next-line react/no-unescaped-entities */}
                              <p className="text-white mt-4"> Don't have an account? <Link className="text-sm text-blue-500 -200 hover:underline mt-4" href={"/user/registration"}>Sing In</Link></p>
                          </div>
                          <SubmitButton onClick={fromSubmit} submit={submit} text="submit" />
                      </form>
                  </div>
              </div>
          </div>
      </section>

    )


};


export default LoginComponent;




