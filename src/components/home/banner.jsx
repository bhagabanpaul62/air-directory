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
      <div className="w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[56vh] relative  text-white">
        {images.map((img, i) => (
          <Image
            src={img.image}
            key={i}
            alt="Aviation banner image"
            fill
            className={`object-cover transition-opacity duration-3000 ${
              i === currentImage ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
        <div className="z-10 absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-4 sm:px-6 md:px-8 text-center max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Explore the World with SkyRoute
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-90 max-w-2xl leading-relaxed">
              Find the best flights and destinations for your next adventure.
            </p>
            <Searchbar  />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
