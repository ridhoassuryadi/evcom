import { useCartStore } from '@/lib/zustand/store';
import React from 'react';
import { MdFilterList } from "react-icons/md";

interface AppBarProps {
  title?: string;
}

const AppBarProducts = ({ title = "EverStore" }: AppBarProps) => {
  const { toggleFilterOpen, filterOpen } = useCartStore();
  const filterOpenClass = filterOpen ? "bg-green-800" : ""
  return (
    <header className="w-full bg-green-600 text-white shadow-md appbar">
      <div className="flex items-center justify-between px-4 py-2">
        {/* App Title */}
        <h1 className="text-xl font-semibold">{title}</h1>
        
        {/* Settings Button */}
        <button 
          onClick={() => toggleFilterOpen()}
          className={filterOpenClass+" p-2 rounded-full hover:bg-green-800 transition-colors"}
          aria-label="Settings"
        >
          <MdFilterList size={20} />
        </button>
      </div>
    </header>
  );
};

export default AppBarProducts;