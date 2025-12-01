"use client";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { RedTrashCan } from "../_icons/redTrashCan";
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
const UPLOAD_PRESET = "fast-food";
const CLOUD_NAME = "dfucbr8fk";

export const EditFoodDialog = ({ id, foodName, foodCategory, foodIngredients, foodPrice, getData, items }) => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [name, setName] = useState(foodName);
    const [category, setCategory] = useState(foodCategory);
    const [ingredients, setIngredients] = useState(foodIngredients);
    const [price, setPrice] = useState(foodPrice);

    const [logoUrl, setLogoUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const updateFoodInfo = async () => {
        const updatedFood = {
            foodName: name,
            price: price,
            ingredients: ingredients,
            category: category,
            id: id
        };

        await fetch(`${backendUrl}/food`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFood)
        });
        if (getData) getData();
    }

    const deleteFood = async () => {
        const data = await fetch(`${backendUrl}/food`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        });
        getData();
    }

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
        }
    }

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
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-11 h-11 text-red-500 rounded-full z-10 relative m-5 flex justify-center items-center cursor-pointer"> <Edit /> </Button>
            </DialogTrigger>
            <DialogContent className="h-[596px] w-[472px] p-6 flex flex-col justify-between">
                <div className="flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-[18px] font-semibold">Dishes info</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col mt-3">
                        <div className="flex justify-between items-start mt-3 mb-3">
                            <p className="text-muted-foreground"> Dish name </p>
                            <Textarea
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-[288px]" />
                        </div>
                        <div className="flex justify-between items-start mt-3 mb-3">
                            <p className="text-muted-foreground"> Dish category </p>
                            {/* selection of the categories */}
                            <Select
                                value={category}
                                onValueChange={(value) => setCategory(value)}>
                                <SelectTrigger className="w-[288px]">
                                    <SelectValue placeholder="category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {items.map((cat) => {
                                        return <SelectItem key={cat._id} value={cat._id}>{cat.categoryName}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-between items-start mt-3 mb-3">
                            <p className="text-muted-foreground"> Ingredients </p>
                            <Textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                className="w-[288px] h-20" />
                        </div>
                        <div className="flex justify-between items-start mt-3 mb-3">
                            <p className="text-muted-foreground"> Price </p>
                            <Textarea
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-[288px]" />
                        </div>
                        <div className="flex justify-between items-start mt-3 mb-3">
                            <p className="text-muted-foreground"> Image </p>
                            {/* image section */}
                            <div className="w-[288px] h-[116px] border rounded-md bg-blue-100 border-blue-400 border-dashed">
                                {!logoUrl ?
                                    <div>

                                    </div>
                                    :
                                    <div>
                                        <p className="text-muted-foreground flex justify-center items-center">No image selected</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex justify-between items-center">
                    <button
                        onClick={deleteFood}
                        className="w-12 h-10 border border-[#EF444480] rounded-md flex justify-center items-center cursor-pointer hover:bg-red-200 duration-200"> <RedTrashCan /> </button>
                    <Button
                        onClick={updateFoodInfo}
                        className="cursor-pointer w-[126px] h-10"> Save changes </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}