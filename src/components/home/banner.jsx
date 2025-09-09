"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Searchbar from "../hero/searchbar";
function Banner() {
  const images = [
    {
      image:
        "https://images.unsplash.com/photo-1549897411-b06572cdf806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486556813609-9a827fdc306f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  //auto-rotate every 5 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="w-[100vw] h-96 md:h-90  top-15 relative overflow-hidden text-white">
        {images.map((img, i) => (
          <Image
            src={img.image}
            key={i}
            alt="Aviation banner image"
            fill
            className={`object-cover  transition-opacity duration-3000 ${
              i === currentImage ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
        <div className=" z-10 absolute inset-0 items-center flex bg-black/40 justify-center flex-col gap-5 ">
          <h1 className="md:text-5xl font-bold">
            Explore the World with SkyRoute
          </h1>
          <p className="md:text-xl">
            Find the best flights and destinations for your next adventure.
          </p>
          <Searchbar />
        </div>
      </div>
    </>
  );
}

export default Banner;
