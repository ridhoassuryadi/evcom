// useSearchbar.tsx
import React, { useState, ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useCartStore } from "@/lib/zustand/store";

interface Suggestion {
  id: number;
  title: string;
}

const Searchbar = () => {
  const [activeSearch, setActiveSearch] = useState<Suggestion[]>([]);
  const { products } = useCartStore();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      setActiveSearch([]);
      return false;
    }

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );

    // Extracting only a limited number of suggestions
    const suggestions: Suggestion[] = filteredProducts
      .slice(0, 8)
      .map((product) => ({
        id: product.id,
        title: product.title,
      }));

    setActiveSearch(suggestions);
  };

  return (
    <form className="w-full relative ">
      <div className="relative px-4">
        <input
          type="search"
          placeholder="Search Items Here"
          className="w-full py-2 px-4 rounded-2xl bg-slate-100 text-sm"
          onChange={handleSearch}
        />
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-10 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col">
          {activeSearch.map((suggestion) => (
            <Link
              className="hover:bg-slate-600 p-2 text-lg font-semibold rounded-2xl"
              key={suggestion.id}
              href={`/products/${suggestion.id}`}
            >
              <span>{suggestion.title}</span>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default Searchbar;
