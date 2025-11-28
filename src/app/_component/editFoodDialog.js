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

export const EditFoodDialog = ({ id, foodName, foodCategory, foodIngredients, foodPrice, getData, items }) => {

    const [name, setName] = useState(foodName);
    const [category, setCategory] = useState(foodCategory);
    const [ingredients, setIngredients] = useState(foodIngredients);
    const [price, setPrice] = useState(foodPrice);

    const updateFoodInfo = async () => {
        const updatedFood = {
            foodName: name,
            price: price,
            ingredients: ingredients,
            category: category,
            id: id
        };

        await fetch(`http://localhost:8000/food`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFood)
        });
        if (getData) getData();
    }

    const deleteFood = async () => {
        const data = await fetch(`http://localhost:8000/food`, {
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
                            <div className="w-[288px] h-[116px] border rounded-md bg-blue-100 border-blue-400 border-dashed"></div>
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