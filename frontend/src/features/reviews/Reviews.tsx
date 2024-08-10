"use client";

import { InfiniteMovingCards } from "../../components/InfiniteMovingCards";

export default function Reviews() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "An outstanding website! User-friendly with plenty of amazing restaurants to explore comfortably..",
    name: "John Doe",
    title: "",
  },
  {
    quote:
      "I was amazed to find such fantastic dining spots so quickly and effortlessly.",
    name: "Emily Clark",
    title: "",
  },
  {
    quote:
      "Every restaurant we discover here feels like a dream within a dream, thanks to the wonderful reviews.",
    name: "Alex Johnson",
    title: "",
  },
  {
    quote:
      "There’s no doubt Foodie Finds is the best website for discovering new dining experiences and planning outings.",
    name: "Sarah Brown",
    title: "",
  },
  {
    quote:
      "You might call me a fanatic, but I absolutely adore this sleek and modern restaurant-finding website.",
    name: "Michael Reed",
    title: "",
  },
];
