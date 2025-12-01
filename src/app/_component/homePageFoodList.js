import { useState, useEffect } from "react";
import { RedAdd } from "../_icons/redAdd";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Minus, Plus } from "lucide-react";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    }
}

export const HomePageFoodList = ({ categoryId, categoryName }) => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [foods, setFoods] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const getData = async () => {
        const data = await fetch(`${backendUrl}/food/byCategory/${categoryId}`, options);
        const jsonData = await data.json();
        setFoods(jsonData);
        console.log("foods", jsonData);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="pb-12 pt-10 mr-44 ml-44 flex flex-col gap-[54px]">
            <p className="text-[30px] font-semibold text-white"> {`${categoryName}`} </p>
            <div className="flex gap-9 flex-wrap">
                {foods.map((food) => (
                    <div
                        key={food._id}
                        className="w-[398px] h-[342px] bg-white rounded-[20px] p-4 flex flex-col gap-5">
                        <div className="w-[365px] h-[210px] relative flex justify-end items-end">
                            <img
                                className="absolute w-full h-full object-cover rounded-xl"
                                src="home-food-trial.png" />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-11 h-11 bg-white z-10 relative rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 duration-200 mr-5 mb-5"> <RedAdd /> </Button>
                                </DialogTrigger>
                                <DialogContent className="h-[412px] w-[826px] p-6 flex justify-between">
                                    <div className="w-[377px] h-[364px]">
                                        <img className="w-full h-full object-cover rounded-xl" src="selection-food.png" />
                                    </div>
                                    <div className="flex flex-col justify-between pt-5 w-[377px] h-[364px]">
                                        <div className="flex flex-col gap-1">
                                            <DialogHeader>
                                                <DialogTitle className="text-[30px] font-semibold text-[#EF4444]"> {food.foodName} </DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription> {food.ingredients} </DialogDescription>
                                        </div>
                                        <div className="flex flex-col gap-6">
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <p> Total price </p>
                                                    <p className="text-[24px] font-semibold"> ${food.price} </p>
                                                </div>
                                                <div className="flex justify-center items-center gap-3">
                                                    <div className="w-11 h-11 border rounded-full flex justify-center items-center cursor-pointer"> <Minus /> </div>
                                                    <p className="text-[18px] font-semibold"> 1 </p>
                                                    <div className="w-11 h-11 border rounded-full flex justify-center items-center cursor-pointer"> <Plus /> </div>
                                                </div>
                                            </div>
                                            <Button className="rounded-full cursor-pointer"> Add to cart </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-[24px] text-red-500"> {food.foodName} </p>
                                <p className="font-semibold text-[18px]"> ${food.price} </p>
                            </div>
                            <p className="text-[14px]"> {food.ingredients} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}