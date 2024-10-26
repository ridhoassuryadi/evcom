"use client";
import { useCartStore } from "@/lib/zustand/store";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

// Define the cart icon component
const CartIcon = () => {
  // Get the number of cart items from the store using the numberCart selector
  const cartCount = useCartStore((state) => state.getCartCount());

  // Display the cart icon and the number of cart items
  return (
    <Link href={"/cart"}>
      <div className="relative py-2">
        <div className="top-0 absolute left-6">
          <p className="flex size-1 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">
            {cartCount}
          </p>
        </div>
        <FaCartShopping className="text-3xl" />
      </div>
    </Link>
  );
};

export default CartIcon;
