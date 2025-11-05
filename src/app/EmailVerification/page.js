"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeftIcon } from "../_icons/leftArrow";

const checkIfEmailIsCorrect = (string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
}

export default function EmailVerification() {

    const [getValues, setGetValues] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleReturn = () => {
        router.push("/ForgottenPassword");
    }

    const handleButton = () => {
        if (getValues && !checkIfEmailIsCorrect(getValues)) {
            setError("Invalid email. Use a format like example@email.com.");
        }
        else {
            setError("");
        }
    }


    return (
        <div className="w-full h-screen flex justify-center items-center gap-[10vw]">
            <div className="w-[416px] h-[376px] bg-white ">
                <button
                    onClick={handleReturn}
                    className="w-9 h-9 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer mb-6"> <LeftIcon /> </button>
                <p className="text-[26px] font-semibold"> Please verify Your Email </p>
                <p className="text-[16px] font-normal text-gray-500 mb-6 mt-4"> We just sent an email to <span> Test@gmail.com </span>. Click the link in the email to verify your account. </p>
                <button
                    onClick={handleButton}
                    className="w-[416px] h-9 rounded-md  text-[14px] font-medium text-white duration-200 bg-black cursor-pointer"> Resend email </button>

            </div>
            <div className="w-[856px] h-[904px] relative">
                <img
                    className="absolute rounded-2xl w-full h-full object-cover"
                    src="/man-cycling-with-food-inside-the-box.jpg"
                    alt="image where?" />
            </div>
        </div>
    );
}