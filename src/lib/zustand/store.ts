// Import Zustand and create a store
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/lib/types/product.type";
import { CartState } from "@/lib/types/cartState.type";
import { CartAction } from "@/lib/types/cartAction.type";

// Create the cart store with an initial state
export const useCartStore = create<CartState & CartAction>()(
  persist(
    (set, get) => ({
      filteredProducts: [],
      items: [],
      products: [],
      total: 0,
      itemCount: 0,
      setProducts: (item: IProduct[]) => {
        const updatedItems = [...item];
        set({ products: updatedItems });
      },
      setFilteredProducts: (products: IProduct[]) => {
        set({ filteredProducts: products });
      },
      addItem: (item: IProduct) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);
        // If the item already exists in the cart, increase its quantity
        if (existingItem) {
          const updatedItems = items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          set((state) => ({
            items: updatedItems,
            total: state.total + item.price,
          }));
        } else {
          // Otherwise, add the item to the cart
          const updatedItems = [...items, { ...item, quantity: 1 }];
          set((state) => ({
            items: updatedItems,
            total: state.total + item.price,
          }));
        }
      },
      removeItem: (id: number) => {
        const items = get().items;
        const itemToRemove = items.find((i) => i.id === id);
        // If the item exists in the cart, decrease its quantity or remove it
        if (itemToRemove) {
          const newQuantity = itemToRemove.quantity - 1;
          const updatedItems =
            newQuantity > 0
              ? items.map((i) =>
                  i.id === id ? { ...i, quantity: newQuantity } : i
                )
              : items.filter((i) => i.id !== id);
          set((state) => ({
            items: updatedItems,
            total: state.total - itemToRemove.price,
          }));
        }
      },
      removeItemCompletely: (id: number) => {
        const items = get().items;
        const itemToRemove = items.find((i) => i.id === id);
        // If the item exists in the cart, remove it completely
        if (itemToRemove) {
          const updatedItems = items.filter((i) => i.id !== id);
          set((state) => ({
            items: updatedItems,
            total: state.total - itemToRemove.price * itemToRemove.quantity,
          }));
        }
      },
      filterProductsByPrice: (lowerPrice: number, higherPrice: number) => {
        const allProducts = get().products;
        const filteredProducts = allProducts.filter(
          (product) =>
            product.price >= lowerPrice && product.price <= higherPrice
        );
        get().setFilteredProducts(filteredProducts);
      },
      getCartCount: () => {
        const items = get().items;
        let count = 0;
        // for (let item of items) {
        //   count += item.quantity;
        // }
        count = items.length;
        return count;
      },
      clearCart: () => {
        // Reset the cart state to the initial values
        set(() => ({
          items: [],
          total: 0,
          itemCount: 0,
        }));
      },
    }),
    {
      name: "zustandProduct&CartbySN",
      partialize: (state) => ({
        items: state.items,
        products: state.products,
        total: state.total,
      }),
    }
  )
);
