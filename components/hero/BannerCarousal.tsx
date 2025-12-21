"use client";
import { useState, useEffect } from "react";
import banner_1 from "@/public/banner-1.svg";
import banner_2 from "@/public/banner-2.svg";
import banner_3 from "@/public/banner-3.svg";
import banner_4 from "@/public/banner-4.svg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import BannerCard from "./BannerCard";
import { BannerProps } from "@/lib/types";

export default function BannerCarousel() {
  const banners: BannerProps[] = [
    {
      title: "Unlock Your Potential with Byway",
      description:
        "Start your learning journey with a platform built to help you grow. Explore practical courses, expert instructors, and a personalized path that takes you closer to your goals. Whether you're a student, graduate, or looking to upgrade your skills your journey starts here.",
      ctaHref: "/",
      ctaText: "Start Learning Now",
      image: banner_1,
    },
    {
      title: "Learn Smarter. Grow Faster.",
      description:
        "Byway gives you high-quality learning materials, practical exercises, and a guided experience that helps you progress step by step. Choose the right path for your career and start building your future with confidence.",
      ctaHref: "/",
      ctaText: "Join the Journey",
      image: banner_2,
    },
    {
      title: "Your Skills. Your Certificate. Your Future.",
      description:
        "Develop real skills with accredited courses, hands-on assessments, and certificates you can proudly showcase on your profile or CV. Byway is your first step toward real career opportunities.",
      ctaHref: "/",
      ctaText: "Get Certified Today",
      image: banner_3,
    },
    {
      title: "Learning Made Simple & Fun",
      description:
        "Pick your favorite field, learn at your own pace, and celebrate your progress as you grow. Byway makes education flexible, enjoyable, and accessible anytime, anywhere.",
      ctaHref: "/",
      ctaText: "Start Your First Course",
      image: banner_4,
    },
  ];

  const [current, setCurrent] = useState(0);

  // change banner erery 5s
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
    <div className="group relative w-full">
      {/* Carousel Items */}
      <div className="relative h-[94vh] sm:h-[90vh]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <BannerCard
              title={banner.title}
              description={banner.description}
              ctaHref={banner.ctaHref}
              ctaText={banner.ctaText}
              image={banner.image}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 ">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current
                ? "bg-[#3B82F6]"
                : "bg-white border border-[#3B82F6]"
            }`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 p-3 rounded-full hover:bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <FaAngleLeft className="text-2xl text-white" />
      </button>
      <button
        onClick={goNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 p-3 rounded-full hover:bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <FaAngleRight className="text-2xl text-white" />
      </button>
    </div>
  );
}
