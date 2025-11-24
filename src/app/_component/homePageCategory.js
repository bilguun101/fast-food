import { WhiteLeftIcon } from "../_icons/whiteLeftArrow";
import { WhiteRightIcon } from "../_icons/WhiteRightArrow";

export const HomePageCategory = ({ categoryItems }) => {
    return (
        <div className="w-full h-10 flex items-center">
            <button className="w-10 h-10 flex justify-center items-center cursor-pointer"> <WhiteLeftIcon /> </button>
            <div className="w-full flex gap-2 ml-2 mr-2">
                {categoryItems.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className="m-w-0 h-9 pl-5 pr-5 pt-px pb-px bg-white cursor-pointer rounded-full"> {item.categoryName} </button>
                    )
                })}
            </div>
            <button className="w-10 h-10 flex justify-center items-center cursor-pointer"> <WhiteRightIcon /> </button>
        </div>
    );
}