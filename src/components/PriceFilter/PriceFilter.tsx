"use client";
import { useRef, useState } from "react";
import { useCartStore } from "@/lib/zustand/store";

// Blogpost and origin:
//https://webanimation.blog/blog/react-dual-range-slider-framer-motion/
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";


const PriceFilter = () => {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const { setFilteredProducts, filterProductsByPrice, products } =
    useCartStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (Number(lowPrice) < 0) {
      alert("Low price cannot be less than 0");
      return;
    }
    if (Number(highPrice) > 1000) {
      alert("High price cannot be more than 1,000");
      return;
    }
    filterProductsByPrice(Number(lowPrice), Number(highPrice));
  };

  const handleReset = () => {
    setFilteredProducts(products);
    setLowPrice("");
    setHighPrice("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
       {/* <Slider
        defaultMinBudget={Number(lowPrice)}
        defaultMaxBudget={Number(highPrice)}
        label={"Slider!"}
        max={4000}
        setSliderMin={num => setLowPrice(String(num))}
        setSliderMax={num => setHighPrice(String(num))}
      /> */}
      <input type="hidden" name={"minBudget"} defaultValue={lowPrice} />
      <input type="hidden" name={"maxBudget"} defaultValue={highPrice} />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 px-4  flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
      >
        Apply Filter
      </button>
    </form>
  );
};

export default PriceFilter;
