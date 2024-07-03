"use client";
import React from "react";
import {Button, Spinner} from "@material-tailwind/react";

const SubmitButton = (props) => {
    if (props?.submit === false) {
        return (
            <Button size={"lg"} className=" bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 px-8 ring-1 ring-blue-900" onClick={props?.onClick} type="submit">
                {props?.text}
            </Button>
        );
    } else {
        return (
            <Button
                disabled={true} size={"lg"}
                className="bg-gradient-to-r from-red-600 to-indigo-500 text-white font-bold rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 px-8 ring-1 ring-blue-900 flex gap-x-6 justify-around cursor-not-allowed ">
                Loading
                <Spinner color="#fff" className="h-6 w-6" />
            </Button>
        );
    }
};
export default SubmitButton;
