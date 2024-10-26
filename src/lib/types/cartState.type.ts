import { IProduct } from "@/lib/types/product.type";

export type CartState = {
  items: IProduct[] | [];
  filteredProducts: IProduct[] | [];
  products: IProduct[] | [];
  total: number;
  itemCount: number;
};
