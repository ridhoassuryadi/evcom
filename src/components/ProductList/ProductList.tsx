"use client";
import { useEffect } from "react";
import { useCartStore } from "@/lib/zustand/store";
import ProductItem from "@/components/ProductItem/ProductItem";
import { fetchProducts } from "@/lib/api/fetchProduct";
import Searchbar from "@/components/SearchBar/SearchBar";
import PriceFilter from "@/components/PriceFilter/PriceFilter";

const ProductsPage = () => {
  const { setProducts, products } = useCartStore();
  const { filteredProducts } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    fetchData();
  }, [setProducts, products]);

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <div className="fixed top-0 z-30 bg-white max-w-[480px] flex flex-col space-y-4 z-10 w-full bg-[#4CAF50] border-b-2 border-gray-300 py-4">
          <PriceFilter />
          <div className="w-full h-[1px]" style={{ backgroundColor: "#e5e7eb"}}/>
          <Searchbar />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-4 pt-32">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <li key={product.id}>
                <ProductItem product={product} />
              </li>
            ))
          : products.map((product) => (
              <li key={product.id}>
                <ProductItem product={product} />
              </li>
            ))}
      </div>
    </div>
  );
};

export default ProductsPage;
