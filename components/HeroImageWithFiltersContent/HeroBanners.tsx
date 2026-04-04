"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  hero_banners:
    | { image_url: string; id: string; name: string; productId: string }[]
    | null;
}

const HeroBanners = ({ hero_banners }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const totalImages = hero_banners?.length || 0;
  const [isHovered, setIsHovered] = useState(false);

  const goToIndex = (index: number) => {
    const parent = divRef.current;
    if (parent) {
      parent.scrollTo({
        left: index * parent.offsetWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % totalImages;
    goToIndex(next);
  }, [currentIndex, totalImages]);

  const prevSlide = () => {
    const prev = (currentIndex - 1 + totalImages) % totalImages;
    goToIndex(prev);
  };

  const handleScroll = () => {
    if (divRef.current) {
      const scrollLeft = divRef.current.scrollLeft;
      const width = divRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    if (!isHovered && totalImages > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, totalImages, nextSlide]);

  if (!hero_banners || hero_banners.length === 0) return null;

  return (
    <div className="relative w-[90%] md:ml-auto max-md:mx-auto max-md:w-full group overflow-hidden">
      <div
        ref={divRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-lg scroll-smooth overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-1 transition-transform"
      >
        {hero_banners.map((banner, index) =>
          banner.productId ? (
            <Link
              key={banner.id}
              href={`/productDetails/${banner.productId}`}
              className="relative min-w-full h-75 md:h-80 snap-center"
            >
              <Image
                src={banner.image_url}
                alt={banner.name}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding={index === 0 ? "sync" : "async"}
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-center rounded-lg"
              />
            </Link>
          ) : (
            <div
              key={banner.id}
              className="relative min-w-full h-75 md:h-80 snap-center"
            >
              <Image
                src={banner.image_url}
                alt={banner.name}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding={index === 0 ? "sync" : "async"}
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-center rounded-lg"
              />
            </div>
          ),
        )}
      </div>
      {totalImages > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4 transition-opacity pointer-events-none">
          <Button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            aria-label="Previous Slide"
            variant="secondary"
            className="h-10 w-10 bg-black/80 text-white hover:bg-black/60 pointer-events-auto"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            aria-label="Next Slide"
            variant="secondary"
            className="h-10 w-10 bg-black/80 text-white hover:bg-black/60 pointer-events-auto"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {hero_banners.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              divRef.current?.scrollTo({
                left: index * divRef.current.offsetWidth,
                behavior: "smooth",
              });
              setCurrentIndex(index);
            }}
            key={index}
            className={`rounded-full border border-black/30 cursor-pointer transition-all duration-300
            h-4 hover:bg-white
              ${currentIndex === index ? "bg-white w-12" : "w-8 bg-white/50"} 
            `}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroBanners;
