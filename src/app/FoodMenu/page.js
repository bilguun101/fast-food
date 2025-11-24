"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../_icons/logo";
import { WhiteMenu } from "../_icons/whiteMenu";
import { BlackTruck } from "../_icons/blackTruck";
import { Add } from "../_icons/add";
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
import { FoodList } from "../_component/foodList";


const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    }
}

export default function FoodMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const [values, setValues] = useState("");

    const [items, setItems] = useState([]);


    const router = useRouter();

    const handleOrdersButton = () => {
        router.push('/Orders');
    }

    const handleHomePage = () => {
        router.push('/');
    }


    const createCategory = async () => {
        if (values.trim() === "") {
            return;
        }
        if (values.length === 0) {
            return;
        }
        const data = await fetch(`http://localhost:8000/food-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoryName: values
            })
        });
        getData();
        setIsOpen(false);
    }


    const getData = async () => {
        const data = await fetch(`http://localhost:8000/food-category`, options);
        const jsonData = await data.json();
        setItems(jsonData);
        console.log("category", jsonData);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="w-full h-screen flex">
            {/* left side */}
            <div className="bg-white w-[14.24%] h-screen">
                <div className="mt-9 flex justify-center items-center gap-3">
                    <button
                        onClick={handleHomePage}
                        className="cursor-pointer"><Logo /></button>
                    <div>
                        <p className="text-[22px] font-semibold"> NomNom </p>
                        <p className="text-[14px] font-normal text-gray-500"> Swift delivery </p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center gap-6">
                    <button className="w-[165px] h-10 flex justify-center items-center gap-3 cursor-pointer bg-black opacity-85 text-white rounded-full"> <WhiteMenu /> Food menu </button>
                    <button
                        onClick={handleOrdersButton}
                        className="w-[165px] h-10 bg-white opacity-85 rounded-full pr-7 flex justify-center items-center gap-3 cursor-pointer"> <BlackTruck /> Orders </button>
                </div>
            </div>
            {/* right side */}
            <div className="bg-gray-100 w-[85.76%] h-fit">
                <div className="mr-30">
                    <div className="mt-6 flex flex-col gap-6 items-end mb-15">
                        <div className="flex justify-end">
                            <img className="w-10 h-10 rounded-full cursor-pointer" src="/morty.jpg" alt="here should be an image" />
                        </div>
                        <div className="w-[94.53%] min-h-0 bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
                            <p className="text-[20px] font-semibold"> Dishes category </p>
                            <div className="flex gap-3 flex-wrap">
                                {items.length > 0 ? (
                                    items.map((item, index) => (
                                        <button
                                            key={index}
                                            className="min-w-0 h-9 border border-gray-300 rounded-full pl-4 pr-4 hover:bg-gray-300 duration-200 cursor-pointer"
                                        >
                                            {item.categoryName}
                                        </button>
                                    ))
                                ) : (
                                    <p>No categories found.</p>
                                )}
                                <Dialog open={isOpen} onOpenChange={setIsOpen} >
                                    <DialogTrigger asChild>
                                        <Button className="w-9 h-9 bg-red-400 rounded-full flex justify-center items-center cursor-pointer hover:bg-red-500 duration-200"> <Add /> </Button>
                                    </DialogTrigger>
                                    <DialogContent className="h-[272px] w-[460px] p-6">
                                        <DialogHeader>
                                            <DialogTitle className="text-[18px] font-semibold">Add new category</DialogTitle>
                                        </DialogHeader>
                                        <Label className="mt-2">
                                            Category name
                                        </Label>
                                        <Input
                                            placeholder="Type category name..."
                                            className="-mt-2"
                                            onChange={(e) => setValues(e.target.value)} />
                                        <DialogFooter className="flex justify-end items-end">
                                            <Button
                                                className="cursor-pointer"
                                                onClick={createCategory}> Add category </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="w-[94.53%] min-h-0 rounded-xl flex flex-col gap-4">
                            {items.map((item) => {
                                return (
                                    <FoodList key={item._id} categoryId={item._id} categoryName={item.categoryName} items={items} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}