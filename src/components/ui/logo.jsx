import { logoService } from "@/services/logo-service";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Logo = () => {
  const [image, setImage] = useState({ imagePath: "" });


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
      {image?.imagePath ? (
        <Image src={image.imagePath} alt="Buta Games" width={50} height={60} className="rounded-full" />
      ) : <p>Logo</p>}
    </>
  );
};

export default Logo;
