import { Logo } from "../_icons/logo"

export const Footer = ({ categoryItems }) => {
    return <div className="w-full h-[755px] bg-primary pt-15">
        <div className="w-full h-[92px] bg-red-500 mb-[76px] overflow-hidden flex items-center">
            <div className="scroll-content animate-scroll flex gap-20 whitespace-nowrap text-[30px] font-bold text-white">
                {Array(25)
                    .fill("Fresh fast delivered")
                    .map((text, i) => (
                        <span key={i} className="inline-block">
                            {text}
                        </span>
                    ))}
                {Array(25)
                    .fill("Fresh fast delivered")
                    .map((text, i) => (
                        <span key={`dup-${i}`} className="inline-block">
                            {text}
                        </span>
                    ))}
            </div>
        </div>

        <div className="w-[92.14%] h-[228px] flex justify-center mb-[150px]">
            <div className="w-22 h-[94px] flex flex-col justify-center items-center mr-[350px]">
                <Logo />
                <p className="text-[20px] font-semibold text-white"> Nom<span className="text-red-500">Nom</span> </p>
                <p className="text-[14px] text-white"> Swift delivery </p>
            </div>
            <div className="flex flex-col gap-5 mr-[300px]">
                <p className="text-[20px] text-[#71717A]"> NomNom </p>
                <a className="text-[20px] text-white cursor-pointer"> Home </a>
                <a className="text-[20px] text-white cursor-pointer"> Contact us </a>
                <a className="text-[20px] text-white cursor-pointer"> Delivery zone </a>
            </div>
            <div className="flex flex-col gap-5 mr-[250px]">
                <p className="text-[20px] text-[#71717A]"> MENU </p>
                <div className="flex gap-35">
                    <div className="flex flex-col gap-5">
                        {categoryItems.slice(0, Math.ceil(categoryItems.length / 2)).map((cat) => (
                            <p key={cat._id} className="text-[20px] text-white cursor-pointer">
                                {cat.categoryName}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col gap-5">
                        {categoryItems.slice(Math.ceil(categoryItems.length / 2)).map((cat) => (
                            <p key={cat._id} className="text-[20px] text-white cursor-pointer">
                                {cat.categoryName}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-[20px] text-[#71717A]"> FOLLOW US </p>
                <div className="flex gap-4">
                    <img
                        className="w-9 cursor-pointer"
                        src="facebook.png" />
                    <img
                        className="w-9 cursor-pointer"
                        src="instagram.png" />
                </div>
            </div>
        </div>
        <div className="w-full h-[84px] flex flex-col justify-center items-center">
            <div className="w-[87.78%] h-px bg-[#71717A]"> </div>
            <div className="w-[87.78%] h-full flex gap-32 mt-8">
                <p className="text-[18px] text-[#71717A]"> Copyright 2024 © NomNom LLC </p>
                <a className="text-[18px] text-[#71717A] cursor-pointer"> Privacy policy </a>
                <a className="text-[18px] text-[#71717A] cursor-pointer"> Terms and condition </a>
                <a className="text-[18px] text-[#71717A] cursor-pointer"> Cookie policy </a>
            </div>
        </div>
    </div>
}