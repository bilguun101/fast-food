import { Add } from "../_icons/add";

export const AddNewFood = () => {
    return (
        <>
            <div className="flex justify-center items-center w-[270px] h-[241px] rounded-xl border border-dashed border-red-500">
                <div className="flex flex-col gap-6 justify-center items-center">
                    <button className="w-9 h-9 bg-red-400 rounded-full flex justify-center items-center cursor-pointer hover:bg-red-500 duration-200"> <Add /> </button>
                    <p className="text-[14px] font-medium w-[154px] text-center"> Add new Dish to Appetizers </p>
                </div>
            </div>
        </>
    );
}