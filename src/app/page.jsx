"use client";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Instructor from "@/components/Instructor";
import Review from "@/components/Review";
import NavBar from "@/components/NavBar";
import SubFooter from "@/components/SubFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Feature />
      <Instructor />
      <Review />
      <SubFooter />
      <Footer />
    </>
  );
}
