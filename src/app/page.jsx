"use client";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Instructor from "@/components/Instructor";
import Review from "@/components/Review";
import { Providers } from "@/providers/providers";
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Feature />
      <Instructor />
      <Review />
    </div>
  );
}
