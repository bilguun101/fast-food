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

export const AddNewFood = ({ categoryId, getData }) => {
    const [isOpen, setIsOpen] = useState();

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
                category: categoryId
            })
        });
        getData();
        setIsOpen(false);
    }


    return (
        <>
            <div className="flex justify-center items-center w-[270px] h-[241px] rounded-xl border border-dashed border-red-500">
                <div className="flex flex-col gap-6 justify-center items-center">
                    <Dialog open={isOpen} onOpenChange={setIsOpen} >
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
                                <div className="w-[412px] h-[138px] bg-blue-100 rounded-md border border-blue-400 border-dashed"></div>
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