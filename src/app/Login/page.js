"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeftIcon } from "../_icons/leftArrow";

const checkIfEmailIsCorrect = (string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
}

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const router = useRouter();

    const handleReturn = () => {
        router.push("/");
    }

    const handleForgottenPassword = () => {
        router.push("/ForgottenPassword");
    }

    const handleSignUp = () => {
        router.push("/SignUp");
    }

    const handleButton = async () => {
        if (!email || !checkIfEmailIsCorrect(email)) {
            setError("Invalid email. Use a format like example@email.com.");
            return;
        }
        try {
            setError("");

            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }
            localStorage.setItem("token", data.token);

            router.push("/");
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again.");
        }
    }


    return (
        <div className="w-full h-screen flex justify-center items-center gap-[10vw]">
            <div className="w-[416px] h-[376px] bg-white ">
                <button
                    onClick={handleReturn}
                    className="w-9 h-9 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer mb-6"> <LeftIcon /> </button>
                <p className="text-[26px] font-semibold mb-1"> Log in </p>
                <p className="text-[16px] font-normal text-gray-500 mb-6"> Log in to enjoy your favorite dishes. </p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`border rounded-md w-[416px] h-9 pl-3 ${error ? "border-red-500" : ""}`} />
                {error && <p className="mt-1 text-red-500"> {error} </p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-md w-[416px] h-9 mt-4 mb-4 pl-3" />
                <a
                    onClick={handleForgottenPassword}
                    className="text-[14px] font-normal text-gray-900 underline cursor-pointer"> Forgot password ? </a>
                <button
                    onClick={handleButton}
                    className="w-[416px] h-9 rounded-md bg-gray-300 text-[14px] font-medium text-white cursor-pointer mt-4"> Let&apos;s Go </button>
                <div className="flex justify-center items-center gap-3 mt-6">
                    <p> Don&apos;t have an account? </p>
                    <button
                        onClick={handleSignUp}
                        className="text-blue-600 cursor-pointer"> Sign up </button>
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