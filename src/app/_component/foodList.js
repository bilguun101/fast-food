"use client";
import { useState, useEffect } from "react";
import { AddNewFood } from "./addNewFood";
import { EditFoodDialog } from "./editFoodDialog";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    }
}

export const FoodList = ({ categoryId, categoryName, items }) => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [foods, setFoods] = useState([]);

    const getData = async () => {
        const data = await fetch(`${backendUrl}/food/byCategory/${categoryId}`, options);
        const jsonData = await data.json();
        setFoods(jsonData);
        console.log("foodsasdfasdf", jsonData);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div
                className="flex flex-col bg-white rounded-xl">
                <div className="w-full min-h-0 flex flex-col gap-4 p-5">
                    <p className="text-[20px] font-semibold">{`${categoryName} (${foods.length})`} </p>
                    <div className="flex flex-wrap gap-4">
                        <AddNewFood categoryId={categoryId} getData={getData} />
                        {foods.map((food) => (
                            <div key={food._id} className="flex flex-col justify-center w-[270px] h-[241px] rounded-xl border border-gray-200 p-4">
                                <div className="w-[238px] h-[139px] relative flex justify-end items-end">
                                    <img
                                        className="absolute w-full h-full object-cover rounded-xl z-0"
                                        src={food.image}
                                        alt="no image" />
                                    <EditFoodDialog
                                        foodName={food.foodName}
                                        foodCategory={food.category}
                                        foodPrice={food.price}
                                        foodIngredients={food.ingredients}
                                        id={food._id}
                                        getData={getData}
                                        items={items} />
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
            </div>
        </>
    );
}