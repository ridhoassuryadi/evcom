"use client";
import { useState } from "react";
import { useCartStore } from "@/lib/zustand/store";

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
    if (Number(highPrice) > 10000) {
      alert("High price cannot be more than 10,000");
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
      <input
        required
        type="number"
        value={lowPrice}
        onChange={(e) => setLowPrice(e.target.value)}
        placeholder="Low price"
        className="border-2 bg-gray-800 border-gray-600 p-2 rounded-md"
      />
      <input
        required
        type="number"
        value={highPrice}
        onChange={(e) => setHighPrice(e.target.value)}
        placeholder="High price"
        className="border-2 bg-gray-800 border-gray-600 p-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 px-4  flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
      >
        Apply Filter
      </button>
      <button
        type="button"
        className="bg-red-500 text-white rounded-md hover:bg-red-600 active:bg-red-700 px-4  flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
        onClick={handleReset}
      >
        Reset Filter
      </button>
    </form>
  );
};

export default PriceFilter;
