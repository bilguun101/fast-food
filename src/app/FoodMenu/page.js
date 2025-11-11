"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../_icons/logo";
import { WhiteMenu } from "../_icons/whiteMenu";
import { BlackTruck } from "../_icons/blackTruck";
import { Add } from "../_icons/add";
import { Edit } from "lucide-react";
import { AddNewFood } from "../_component/addNewFood";
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


const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    }
}

const getOptions = {
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

    const [foods, setFoods] = useState([]);

    const [items, setItems] = useState([]);


    const router = useRouter();

    const handleOrdersButton = () => {
        router.push('/Orders');
    }


    const createCategory = async () => {
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

    const getFoodData = async () => {
        const data = await fetch(`http://localhost:8000/food`, getOptions);
        const jsonData = await data.json();
        setFoods(jsonData);
        console.log("food information", jsonData);
    }
    const getData = async () => {
        const data = await fetch(`http://localhost:8000/food-category`, options);
        const jsonData = await data.json();
        setItems(jsonData);
        console.log("category", jsonData);
    }

    useEffect(() => {
        getData();
        getFoodData();
    }, [])

    return (
        <div className="w-full h-screen flex">
            {/* shady background */}
            {isOpen && (
                <div className="absolute inset-0 bg-black/30 z-1"></div>
            )}
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
                    <button className="w-[165px] h-10 flex justify-center items-center gap-3 cursor-pointer bg-black opacity-85 text-white rounded-full"> <WhiteMenu /> Food menu </button>
                    <button
                        onClick={handleOrdersButton}
                        className="w-[165px] h-10 bg-white opacity-85 rounded-full pr-7 flex justify-center items-center gap-3 cursor-pointer"> <BlackTruck /> Orders </button>
                </div>
            </div>
            {/* right side */}
            <div className="bg-gray-100 w-[85.76%] h-fit">
                <div className="mr-30">
                    <div className="mt-6 flex flex-col gap-6 items-end">
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
                        {items.map((item) => {
                            return <div key={item._id} className="w-[94.53%] min-h-0 bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 overflow-y-scroll">
                                <p className="text-[20px] font-semibold"> {item.categoryName} ({foods.filter((cur) => cur.category._id === item._id).length}) </p>
                                <div className="flex flex-wrap gap-4">
                                    <AddNewFood />
                                    {foods.filter((cur) => cur.category._id === item._id).map((food) => (
                                        <div key={food._id} className="flex flex-col justify-center w-[270px] h-[241px] rounded-xl border border-gray-200 p-4">
                                            <div className="w-[238px] h-[139px] relative flex justify-end items-end">
                                                <img
                                                    className="absolute w-full h-full object-cover rounded-xl z-0"
                                                    src="random-food.png"
                                                    alt="no image" />
                                                <button className="w-11 h-11 bg-white rounded-full z-10 relative m-5 flex justify-center items-center cursor-pointer"> <Edit /> </button>
                                            </div>
                                            {/* map for the prompts of the specified food */}
                                            <div className="flex flex-col gap-2 mt-5">
                                                <div className="flex justify-between">
                                                    <p className="text-[14px] font-medium text-red-500"> {food.foodName} </p>
                                                    <p className="text-[12px] font-normal"> ${food.price} </p>
                                                </div>
                                                <p className="text-[12px] font-normal flex flex-wrap"> {food.ingredients} </p>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        })}
                        <div className="flex justify-end">
                            <div className="w-[352px] h-8 bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
