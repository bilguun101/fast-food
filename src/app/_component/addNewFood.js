"use client";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Add } from "../_icons/add";
import { useState } from "react";
import { File } from "../_icons/file";
import Image from "next/image";
const UPLOAD_PRESET = "fast-food";
const CLOUD_NAME = "dfucbr8fk";

export const AddNewFood = ({ categoryId, getData }) => {

    const [logoUrl, setLogoUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const [nameValue, setNameValue] = useState("");
    const [priceValue, setPriceValue] = useState("");
    const [ingredientsValue, setIngredientsValue] = useState("");

    const createFood = async () => {
        if (nameValue.trim() === "") {
            return;
        }
        if (priceValue.trim() === "") {
            return;
        }
        if (ingredientsValue.trim() === "") {
            return;
        }
        const data = await fetch(`http://localhost:8000/food`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                foodName: nameValue,
                price: Number(priceValue),
                ingredients: ingredientsValue,
                category: categoryId,
                image: logoUrl
            })
        });
        getData();
        console.log(logoUrl)
    }
    const uploadToCloudinary = async (file) => {

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
        }
    };

    const handleLogoUpload = async (event) => {

        const file = event.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setLogoUrl(url);
        } catch (err) {
            console.log("Failed to upload logo: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center w-[270px] h-[241px] rounded-xl border border-dashed border-red-500">
                <div className="flex flex-col gap-6 justify-center items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-9 h-9 bg-red-400 rounded-full flex justify-center items-center cursor-pointer hover:bg-red-500 duration-200"> <Add /> </Button>
                        </DialogTrigger>
                        <DialogContent className="h-[592px] w-[460px] p-6">
                            <DialogHeader>
                                <DialogTitle className="text-[18px] font-semibold">Add new Dish to Appetizers</DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-between items-center -mt-3 mb-15">
                                <div>
                                    <Label className="mb-2">
                                        Food name
                                    </Label>
                                    <Input
                                        placeholder="Type food name..."
                                        className="w-[194px] h-[38px]"
                                        onChange={(e) => setNameValue(e.target.value)} />
                                </div>
                                <div>
                                    <Label className="mb-2">
                                        Food price
                                    </Label>
                                    <Input
                                        placeholder="Enter price..."
                                        className="w-[194px] h-[38px]"
                                        onChange={(e) => setPriceValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="-mt-15 mb-15">
                                <Label className="mb-2">
                                    Ingredients
                                </Label>
                                <Input
                                    className="w-[412px] h-[90px] flex -mb-20"
                                    placeholder="List ingredients..."
                                    onChange={(e) => setIngredientsValue(e.target.value)} />
                            </div>
                            <div>
                                <Label className="mb-2"> Food image </Label>
                                {/* image section */}
                                <div className="w-[412px] h-[138px] bg-blue-100 rounded-md border border-blue-400 border-dashed flex justify-center items-center cursor-pointer">
                                    {!logoUrl ?
                                        <div>
                                            <Label
                                                className="w-full h-full flex justify-center items-center"
                                                htmlFor="input-file">
                                                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                                    <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center cursor-pointer"> <File /> </div>
                                                    <p className="font-semibold"> Choose a file or drag & drop it here </p>
                                                </div>
                                            </Label>
                                            <input
                                                id="input-file"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                disabled={uploading}
                                                className="hidden"
                                            />
                                        </div>
                                        : <div>
                                            {logoUrl && (
                                                <div className="mt-4">
                                                    <p className="text-green-600 font-semibold mb-2">Logo uploaded!</p>
                                                    <div className="relative w-64 h-64">
                                                        <Image
                                                            src={logoUrl}
                                                            alt="Uploaded logo"
                                                            fill
                                                            className="object-contain rounded border border-gray-300"
                                                        />
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-600 break-all">{logoUrl}</p>
                                                </div>
                                            )}
                                        </div>}
                                    {uploading && <p className="text-blue-600">Uploading...</p>}
                                </div>
                            </div>
                            <DialogFooter className="flex justify-end items-end">
                                <Button
                                    onClick={createFood}
                                    className="cursor-pointer"> Add category </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog >
                    <p className="text-[14px] font-medium w-[154px] text-center"> Add new Dish to Appetizers </p>
                </div >
            </div >
        </>
    );
}