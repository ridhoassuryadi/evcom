import { IProduct } from "@/lib/types/product.type";

export type CartAction = {
  setProducts: (item: IProduct[]) => void;
  setFilteredProducts: (products: IProduct[]) => void;
  removeItemCompletely: (id: number) => void;
  addItem: (item: IProduct) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  filterProductsByPrice: (lowerPrice: number, higherPrice: number) => void;
};
