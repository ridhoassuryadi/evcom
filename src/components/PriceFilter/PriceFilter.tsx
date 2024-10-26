"use client";
import { useRef, useState } from "react";
import { useCartStore } from "@/lib/zustand/store";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const PriceFilter = () => {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const { filterProductsByPrice, products } =
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

  return (
    <div onSubmit={handleSubmit} className="flex flex-col space-x-4 px-6 text-left">
      <p className="text-sm font-bold">Price</p>
      <div className="flex w-full py-4" style={{marginLeft: -1}}>
        <div className="flex flex-col w-full custom-filter-range justify-center">
          <RangeSlider
            min={0}
            max={1000}
            onInput={(price) => {
              const lowPrice = price[0];
              const highPrice = price[1];
              setLowPrice(String(price[0]))
              setHighPrice(String(price[1]))
              filterProductsByPrice(lowPrice, highPrice);
            }} />
          <div className="flex w-full justify-between mt-2">
            <p className="text-sm text-slate-500">Rp 0</p>
            <p className="text-sm text-slate-500">Rp 1000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
