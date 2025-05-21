"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";

interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
}

export function CustomerReviewSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      comment:
        "This product has completely transformed our workflow. The ease of use and powerful features are unmatched in the industry.",
      rating: 5,
      image: "/banner.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO, TechStart",
      comment:
        "Incredible value for the price. Our team adopted it immediately and we've seen a 40% increase in productivity.",
      rating: 4,
      image: "/banner.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      comment:
        "As a solo professional, this gives me capabilities I couldn't afford otherwise. The support team is also fantastic!",
      rating: 5,
      image: "/banner.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentSlide]);

  return (
    <div
      className="relative w-[90%] md:w-[80%] mx-auto rounded-xl overflow-hidden min-h-[400px]"
      style={{
        backgroundImage: "url('/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-sm bg-black/30 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image on left */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={reviews[currentSlide].image}
                alt={reviews[currentSlide].name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Review on right */}
          <div className="w-full md:w-1/2 lg:w-3/5 text-white">
            <div className="space-y-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < reviews[currentSlide].rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
                "{reviews[currentSlide].comment}"
              </blockquote>

              <div>
                <p className="font-bold text-xl">{reviews[currentSlide].name}</p>
                <p className="text-gray-200">{reviews[currentSlide].role}</p>
              </div>

              {/* Navigation dots */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-gray-400"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
