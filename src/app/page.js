"use client";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();

  const handleFood = () => {
    router.push("/Orders");
  }

  const handleLogin = () => {
    router.push("/Login");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center gap-50">
      <button
        onClick={handleFood}
        className="w-45 h-35 bg-gray-300 cursor-pointer hover:bg-gray-400 duration-300 rounded-2xl"> Food selection page </button>
      <button
        onClick={handleLogin}
        className="w-45 h-35 bg-gray-300 cursor-pointer hover:bg-gray-400 duration-300 rounded-2xl"> Login page </button>
    </div >
  );
}
