"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../_icons/logo";
import { BlackMenu } from "../_icons/blackMenu";
import { WhiteTruck } from "../_icons/whiteTruck";
import { Date } from "../_icons/date";
import { UpDown } from "../_icons/upDown";
import { X } from "../_icons/x";


export default function Orders() {

    const router = useRouter();

    const handleOrdersButton = () => {
        router.push('/FoodMenu');
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full h-screen flex">
            {/* left side */}
            <div className="bg-white w-[14.24%] h-screen">
                <div className="mt-9 flex justify-center items-center gap-3">
                    <Logo />
                    <div>
                        <p className="text-[22px] font-semibold"> NomNom </p>
                        <p className="text-[14px] font-normal text-gray-500"> Swift delivery </p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center gap-6">
                    <button
                        onClick={handleOrdersButton}
                        className="w-[165px] h-10 flex justify-center items-center gap-3 cursor-pointer bg-white text-black rounded-full"> <BlackMenu /> Food menu </button>
                    <button className="w-[165px] h-10 bg-black opacity-85 text-white rounded-full pr-7 flex justify-center items-center gap-3 cursor-pointer"> <WhiteTruck /> Orders </button>
                </div>
            </div>
            {/* right side */}
            <div className="bg-gray-100 w-[85.76%] h-screen">
                <div className="mr-30">
                    <div className="mt-6 flex flex-col gap-6 items-end">
                        <div className="flex justify-end">
                            <img className="w-10 h-10 rounded-full cursor-pointer" src="/morty.jpg" alt="here should be an image" />
                        </div>
                        <div className="w-[94.53%] h-200 bg-white border border-gray-200 rounded-lg">
                            <div className="flex mt-4 mb-4 ml-6 mr-6 justify-between">
                                <div>
                                    <p className="font-bold text-[24px]"> Orders </p>
                                    <p className="font-medium text-[14px]"> 32 items </p>
                                </div>
                                <div className="flex justify-center items-center gap-3">
                                    <div className="border border-gray-300 rounded-full w-[300px] h-9 flex justify-center items-center cursor-pointer"> <Date /> </div>
                                    <button className="bg-gray-300 text-white h-9 w-[179px] flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-400 duration-200"> Change delivery state </button>
                                </div>
                            </div>
                            <div className="border-t border-b border-gray-300 h-13 flex pl-2 items-center w-full bg-gray-50">
                                <input type="checkbox" className="w-[4.1%] cursor-pointer" />
                                <div className="w-[4.78%] font-medium pl-2"> № </div>
                                <div className="w-[18.19%] text-gray-600 font-medium pl-15"> Customer </div>
                                <div className="w-[13.67%] text-gray-600 font-medium pl-5"> Food </div>
                                <button className="w-[13.67%] flex items-center pl-8 pr-8 justify-between cursor-pointer hover:bg-gray-100 h-full duration-100">
                                    <p className="text-gray-600 font-medium"> Date </p>
                                    <UpDown />
                                </button>
                                <div className="w-[13.67%] text-gray-600 font-medium pl-12"> Total </div>
                                <div className="w-[18.19%] text-gray-600 font-medium pl-10"> Delivery address </div>
                                <button
                                    onClick={setIsOpen}
                                    className="w-[13.67%] flex items-center pl-8 pr-8 justify-between h-full cursor-pointer hover:bg-gray-100 duration-100">
                                    <p className="text-gray-600 font-medium"> Delivery state </p>
                                    <UpDown />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="w-[352px] h-8 bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* pop-up 1 */}
            {isOpen &&
                <div className="w-[364px] h-50 bg-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-[18px]"> Change delivery state </p>
                        <button
                            onClick={setIsOpen()}
                            className="bg-gray-200 w-9 h-9 rounded-full flex justify-center items-center cursor-pointer"> <X /> </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-[95px] h-9 flex justify-center items-center bg-gray-200 font-medium text-[16px] rounded-full cursor-pointer"> Delivered </div>
                        <div className="w-[95px] h-9 flex justify-center items-center bg-gray-200 font-medium text-[16px] rounded-full cursor-pointer"> Pending </div>
                        <div className="w-[95px] h-9 flex justify-center items-center bg-gray-200 font-medium text-[16px] rounded-full cursor-pointer"> Cancelled </div>
                    </div>
                    <div className="w-[316px] h-9 bg-black text-white flex justify-center items-center rounded-full cursor-pointer"> Save </div>
                </div>}
        </div >
    );
}
