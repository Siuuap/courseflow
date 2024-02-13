"use client";

import axios from "axios";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import React from "react";

function page() {
  return (
    <>
      <NavBar />
      <section className="flex justify-center w-[1440px] h-[1401px]">
        <div className="text-[36px] mt-[60px]">Desired Courses</div>
      </section>
      <Footer />
    </>
  );
}

export default page;
