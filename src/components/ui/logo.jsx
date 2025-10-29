"use client"
import { logoService } from "@/services/logo-service";
import { Gamepad2, Play, Zap } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Logo = () => {
  const [image, setImage] = useState({ imagePath: "" });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const response = await logoService.get()
        if (isMounted) {

          setImage(response)

          console.log("imagePath", response.imagePath);
        }


      } catch (err) {
        console.error("Fetch error:", err)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [])


  return (
    <>
      {/* {image?.imagePath ? (
        <Image src={image.imagePath} alt="Buta Games" width={50} height={60} className="rounded-full" />
      ) : <div className="text-center space-y-1">} */}

      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-30 transition-opacity duration-300 ${isHovered ? 'opacity-60' : ''}`}></div>


        <div className="relative bg-gradient-to-b from-slate-950 via-gray-950 to-[#07043C] shadow-2xl p-2 rounded-full border border-gray-300 transform transition-transform duration-300 hover:scale-105 w-16 h-16 flex flex-col items-center justify-center">
          <div className="">

            <div className="font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-xs uppercase tracking-wider">
              Games
            </div>
          </div>


          <div className="absolute top-2 right-7">
            <div className={`w-2 h-2 bg-green-400 rounded-full animate-ping ${isHovered ? 'animate-pulse' : ''}`}></div>
          </div>

        </div>
      </div>







    </>
  );
};

export default Logo;
