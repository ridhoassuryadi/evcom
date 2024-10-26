"use client";
import { useRef, useState } from "react";
import { useCartStore } from "@/lib/zustand/store";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

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
    <form onSubmit={handleSubmit} className="flex flex-col space-x-4 px-6 text-left">
      <p className="text-sm font-bold">Filter Price</p>
      <div className="flex w-full py-4">
        <div className="flex flex-col w-full custom-filter-range justify-center">
          <RangeSlider
            min={0}
            max={1000}
            onInput={(price) => {
              setLowPrice(String(price[0]))
              setHighPrice(String(price[1]))
            }} />
          <div className="flex w-full justify-between mt-2">
            <p className="text-sm">Rp 0</p>
            <p className="text-sm">Rp 1000</p>
          </div>
        </div>
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 active:bg-blue-700 px-4 py-3  flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default PriceFilter;
