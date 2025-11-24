// "use client";
// import { Edit } from "lucide-react";
// import { useState, useEffect } from "react";
// import { AddNewFood } from "./addNewFood";

// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
//     }
// }

// export const FoodCard = ({ id }) => {

//     const [foods, setFoods] = useState([]);

//     const getFoodData = async () => {
//         const data = await fetch(`http://localhost:8000/food/byCategory/${id}`, options);
//         const jsonData = await data.json();
//         setFoods(jsonData);
//         console.log("food information", jsonData);
//     }

//     useEffect(() => {
//         getFoodData();
//     }, [])

//     return (
//         <div className="flex flex-wrap gap-4">
//             <AddNewFood />
//             {foods.map((food) => (
//                 <div key={food._id} className="flex flex-col justify-center w-[270px] h-[241px] rounded-xl border border-gray-200 p-4">
//                     <div className="w-[238px] h-[139px] relative flex justify-end items-end">
//                         <img
//                             className="absolute w-full h-full object-cover rounded-xl z-0"
//                             src="random-food.png"
//                             alt="no image" />
//                         <button className="w-11 h-11 bg-white rounded-full z-10 relative m-5 flex justify-center items-center cursor-pointer"> <Edit /> </button>
//                     </div>
//                     {/* map for the prompts of the specified food */}
//                     <div className="flex flex-col gap-2 mt-5">
//                         <div className="flex justify-between">
//                             <p className="text-[14px] font-medium text-red-500"> {food.foodName} </p>
//                             <p className="text-[12px] font-normal"> ${food.price} </p>
//                         </div>
//                         <p className="text-[12px] font-normal flex flex-wrap"> {food.ingredients} </p>
//                     </div>
//                 </div>
//             ))
//             }
//         </div>
//     );
// }