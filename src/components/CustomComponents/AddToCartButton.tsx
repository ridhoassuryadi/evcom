"use client";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IProduct } from "@/lib/types/product.type";
import { useCartStore } from "@/lib/zustand/store";

interface CustomButtonProps {
  product: IProduct;
}

const AddtoCart: React.FC<CustomButtonProps> = ({ product }) => {
  const { addItem } = useCartStore();
  return (
    <button
      className="absolute bottom-2 right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mt-4 flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
      onClick={() => addItem(product)}
    >
      <MdOutlineAddShoppingCart className=" text-2xl mx-2" />
    </button>
  );
};

export default AddtoCart;
