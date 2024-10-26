"use client";
import { useCartStore } from "@/lib/zustand/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IProduct } from "@/lib/types/product.type";

// A component to display the cart items and interact with the store
export default function CartPage() {
  // Get the cart state and actions from the store
  const { items, total, addItem, removeItem, clearCart, removeItemCompletely } =
    useCartStore();

  // Using useState to avoid Hydrate mismatch errors caused due to server sending blank data & localstorage sending filled data
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    setCartItems(items);
    setCartTotal(total);
  }, [items, total]);

  return (
    <div className="container mx-auto px-4">
      <div className="py-6 space-y-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <span className="text-2xl font-bold">
            Total Payable: ₹{cartTotal}
          </span>
          <button
            onClick={() => clearCart()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-[#242424] shadow rounded-xl flex flex-col pb-2"
              >
                <Image
                  className="h-64 w-auto flex flex-wrap rounded-t-xl"
                  src={item.thumbnail}
                  alt={item.title}
                  height={700}
                  width={700}
                ></Image>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
                  <p className="text-gray-300 mt-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">₹{item.price} /-</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="bg-red-500 text-white px-2 py-1 my2 rounded"
                      >
                        -
                      </button>
                      <span className="text-gray-200">{item.quantity}</span>
                      <button
                        onClick={() => addItem(item)}
                        className="bg-green-500 text- px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-auto ml-auto">
                  <button
                    onClick={() => removeItemCompletely(item.id)}
                    className="text-xs border-dotted border-b-2 text-red-500 border-red-500 mr-2"
                  >
                    remove item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/products">
            <p className="text-blue-500 hover:underline">Go back to shop</p>
          </Link>
        </div>
      )}
    </div>
  );
}
