"use client";
import { useState, useEffect } from "react";
import { Logo } from "./_icons/logo";
import { FoodCart } from "./_icons/foodCart";
import { Profile } from "./_icons/profile";
import { Location } from "./_icons/location";
import { RightArrow } from "./_icons/rightArrow";
import { WhiteFoodCart } from "./_icons/whiteFoodCart";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RedX } from "./_icons/redX";
import { Minus, Plus } from "lucide-react";
import { HomePageCategory } from "./_component/homePageCategory";
import { HomePageFoodList } from "./_component/homePageFoodList";
import { Footer } from "./_component/footer";
import { useRouter } from "next/navigation";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  }
}

export default function Home() {

  const [categoryItems, setCategoryItems] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleProfile = () => {
    router.push("/Login");
  }

  const getCategoryData = async () => {
    const data = await fetch(`http://localhost:8000/food-category`, options);
    const jsonData = await data.json();
    setCategoryItems(jsonData);
    console.log("category", jsonData);
  }

  useEffect(() => {
    getCategoryData();
  }, [])

  return (
    <div className="w-full h-screen">
      {/* header menu */}
      <div className="w-full h-20 bg-primary flex justify-between items-center pl-44 pr-44">
        <div className="flex justify-center items-center gap-3">
          <Logo />
          <div className="flex flex-col">
            <p className="text-white text-[20px] font-semibold"> Nom<span className="text-red-500">Nom</span> </p>
            <p className="text-white"> Swift delivery </p>
          </div>
        </div>
        <div className="flex gap-3">
          {/* location dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
              <Button className="w-[251px] h-9 bg-background rounded-full flex justify-center items-center cursor-pointer text-[12px] text-red-500 gap-2 hover:bg-gray-300 duration-200"> <Location /> Delivery address: <span className="text-gray-600">Add location</span> <RightArrow /> </Button>
            </DialogTrigger>
            <DialogContent className="h-[272px] w-[460px] p-6">
              <DialogHeader>
                <DialogTitle className="text-[24px] font-semibold">Please write your delivery address!</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Please share your complete address..."
                className="-mt-5 h-20" />
              <DialogFooter className="flex justify-end items-end">
                <Button className="bg-white text-black border cursor-pointer hover:bg-gray-200"> Cancel </Button>
                <Button className="cursor-pointer"> Deliver here </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-9 h-9 bg-background rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 duration-200"> <FoodCart /> </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#404040] w-[535px] sm:max-w-none rounded-tl-xl rounded-bl-xl">
              <SheetHeader>
                <SheetTitle className="text-white text-[20px] font-semibold flex gap-3 items-center pt-5 pl-3"> <WhiteFoodCart /> Order detail</SheetTitle>
              </SheetHeader>

              {/* tabs */}
              <Tabs defaultValue="account" className="w-[535px]">
                <TabsList className="w-[471px] h-11">
                  <TabsTrigger value="account" className="text-[18px] cursor-pointer">Cart</TabsTrigger>
                  <TabsTrigger value="password" className="text-[18px] cursor-pointer">Order</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  {/* top white box */}
                  <div className="w-[471px] h-[620px] bg-background mt-6 rounded-xl p-4 flex flex-col justify-between">
                    {/* cart section */}
                    <div>
                      <p className="text-[20px] font-semibold text-muted-foreground pb-5"> My cart </p>
                      <div className="w-[439px] h-[120px] flex gap-2.5">
                        <div className="w-[124px] h-[120px]">
                          <img
                            className="w-full h-full object-cover rounded-xl"
                            src="another-example.png" />
                        </div>
                        <div>
                          <div className="flex gap-2.5">
                            <div className="w-[259px] flex flex-col">
                              <p className="font-bold text-red-500"> *Long food name* </p>
                              <p className="text-[14px] flex flex-wrap text-foreground"> *assume this is the list of the ingredients that make up the food* </p>
                            </div>
                            <div>
                              <button className="w-9 h-9 border border-red-500 rounded-full cursor-pointer flex justify-center items-center"> <RedX /> </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-3">
                              <button className="cursor-pointer"> <Minus /> </button>
                              <p className="text-[18px] font-semibold"> 1 </p>
                              <button className="cursor-pointer"> <Plus /> </button>
                            </div>
                            <div>
                              <p className="font-bold"> $12.99 </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Delivery location section */}
                    <div>
                      <p className="text-[20px] font-semibold text-muted-foreground pb-2"> Delivery location </p>
                      <div>
                        <input
                          placeholder="Please share your complete address"
                          className="w-[439px] h-20 border border-[#E4E4E7] rounded-md pl-3" />
                      </div>
                    </div>
                  </div>
                  {/* botton white box */}
                  <div className="w-[471px] h-[276px] bg-background mt-7 rounded-xl p-4 flex flex-col gap-5">
                    <p className="text-[20px] font-semibold text-muted-foreground"> Payment info </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground"> Items </p>
                        <p> - </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground"> Shipping </p>
                        <p> - </p>
                      </div>
                    </div>
                    <div className="w-[439px] h-px border border-gray-400 border-dashed"></div>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground"> Total </p>
                      <p> - </p>
                    </div>
                    <button className="w-[439px] h-11 bg-[#EF4444] rounded-full font-medium text-white flex justify-center items-center cursor-pointer hover:bg-red-500 duration-200"> Checkout </button>
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  <div className="w-[471px] h-[900px] bg-white rounded-xl mt-6 p-4">
                    <p className="text-[22px] font-semibold"> Order history </p>
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-[18px]">$26.97 {`(#20156)`}</p>
                        <div className="border border-red-500 flex justify-center items-center rounded-full"> Pending </div>
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div></div>
                    <div></div>
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
          <button
            onClick={handleProfile}
            className="w-9 h-9 bg-red-500 rounded-full flex justify-center items-center cursor-pointer hover:bg-red-600 duration-200"> <Profile /> </button>
        </div>
      </div>
      {/* big bg */}
      <div className="aspect-1440/570">
        <img
          className="w-full h-full"
          src="home-bg.png" />
      </div>
      {/* category section */}
      <div className="w-full h-44 bg-[#404040]">
        <div className="ml-30 mr-30 pt-10 pb-10 flex flex-col gap-9">
          <p className="text-[30px] font-semibold text-white pl-10"> Categories </p>
          <HomePageCategory categoryItems={categoryItems} />
        </div>
      </div>
      {/* hardest part of the entire page */}
      <div className="bg-[#404040] w-full min-h-0 pb-10">
        {categoryItems.map((item) => {
          return (
            <HomePageFoodList key={item._id} categoryId={item._id} categoryName={item.categoryName} />
          )
        })}
      </div>
      <Footer categoryItems={categoryItems} />
    </div >
  );
}
