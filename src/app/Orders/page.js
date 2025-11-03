"use client";
import { useRouter } from "next/navigation";
import { Logo } from "../_icons/logo";
import { BlackMenu } from "../_icons/blackMenu";
import { WhiteTruck } from "../_icons/whiteTruck";


export default function Orders() {

    const router = useRouter();

    const handleOrdersButton = () => {
        router.push('/FoodMenu');
    }

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
                <div className="mt-6 flex flex-col gap-6 items-center">
                    <div className="flex justify-end">
                        <img className="w-10 h-10 rounded-full" src="/morty.jpg" alt="here should be an image" />
                    </div>
                    <div className="w-[94.53%] h-200 bg-white border border-gray-200 rounded-lg"></div>
                    <div className="flex justify-end">
                        <div className="w-[352px] h-8 bg-gray-300"></div>
                    </div>

                </div>
            </div>
        </div >
    );
}
