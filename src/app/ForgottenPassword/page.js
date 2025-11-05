"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeftIcon } from "../_icons/leftArrow";

const checkIfEmailIsCorrect = (string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
}

export default function ForgottenPassword() {

    const [getValues, setGetValues] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleReturn = () => {
        router.push("/Login");
    }

    const handleChange = (e) => {
        setGetValues(e.target.value);
    }

    const handleButton = () => {
        if (getValues && !checkIfEmailIsCorrect(getValues)) {
            setError("Invalid email. Use a format like example@email.com.");
        }
        else if (getValues.trim() === "") {
            setError("Cannot be empty.");
        }
        else {
            router.push("/EmailVerification");
        }
    }


    return (
        <div className="w-full h-screen flex justify-center items-center gap-[10vw]">
            <div className="w-[416px] h-[376px] bg-white ">
                <button
                    onClick={handleReturn}
                    className="w-9 h-9 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer mb-6"> <LeftIcon /> </button>
                <p className="text-[26px] font-semibold mb-1"> Reset your password </p>
                <p className="text-[16px] font-normal text-gray-500 mb-6"> Enter your email to receive a password reset link. </p>
                <input
                    value={getValues}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`border rounded-md w-[416px] h-9 pl-3 ${error ? "border-red-500" : ""}`} />
                {error && <p className="mt-1 text-red-500"> {error} </p>}
                <button
                    onClick={handleButton}
                    className={`w-[416px] h-9 rounded-md  text-[14px] font-medium text-white mt-6 duration-200 ${getValues.length > 0 ? "bg-black text-white cursor-pointer" : "bg-gray-300"}`}> Send link </button>
                <div className="flex justify-center items-center gap-3 mt-6">
                    <p> Don&apos;t have an account? </p>
                    <a
                        href=""
                        className="text-blue-600"> Sign up </a>
                </div>
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
