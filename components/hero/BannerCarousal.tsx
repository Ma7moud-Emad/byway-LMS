"use client";

import { useState, useEffect } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { BannerProps } from "@/lib/types";

import BannerCard from "./BannerCard";

import banner_1 from "@/public/banner-1.svg";
import banner_2 from "@/public/banner-2.svg";
import banner_3 from "@/public/banner-3.svg";
import banner_4 from "@/public/banner-4.svg";

export default function BannerCarousel() {
  const banners: BannerProps[] = [
    {
      title: "Unlock Your Potential with Byway",
      description:
        "Start your learning journey with a platform designed to help you grow step by step and reach your goals",
      ctaHref: "/courses",
      ctaText: "Start Your Learning Journey",
      image: banner_1,
    },
    {
      title: "Learn Smarter, Not Harder",
      description:
        "Learn in a structured and efficient way with clear learning paths and progress tracking to achieve real results",
      ctaHref: "/signin",
      ctaText: "Discover Smart Learning",
      image: banner_2,
    },
    {
      title: "Earn Your Certificate, Elevate Your Career",
      description:
        "Gain accredited certificates to showcase your skills and open doors to new career opportunities",
      ctaHref: "/signup",
      ctaText: "Get Certified Today",
      image: banner_3,
    },
    {
      title: "Learning Should Be Fun",
      description:
        "Learn in an engaging and enjoyable environment, alone or with peers, and make your educational journey exciting",
      ctaHref: "/courses",
      ctaText: "Start Your First Course",
      image: banner_4,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="group relative w-full bg-[#F8FAFC] sm:px-15">
      {/* Carousel Items */}
      <div className="relative h-[94vh] sm:h-[90vh]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <BannerCard
              title={banner.title}
              description={banner.description}
              ctaHref={banner.ctaHref}
              ctaText={banner.ctaText}
              image={banner.image}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 ">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer hover:bg-gray-900 transition-colors duration-300 ${
              index === current
                ? "bg-gray-900"
                : "bg-white border border-gray-9bg-gray-900"
            }`}
            onClick={() => setCurrent(index)}
            suppressHydrationWarning
          ></button>
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={goPrev}
        suppressHydrationWarning
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-900/50 p-3 rounded-full hover:bg-gray-900/70 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <FaAngleLeft className="text-2xl text-white" />
      </button>
      <button
        suppressHydrationWarning
        onClick={goNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-900/50 p-3 rounded-full hover:bg-gray-900/70 cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <FaAngleRight className="text-2xl text-white" />
      </button>
    </div>
  );
}
