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
        <div className="fixed top-0 z-30 bg-white p-4 max-w-[480px] flex flex-col space-y-4 z-10 w-full bg-[#4CAF50]">
          <PriceFilter />
          <Searchbar />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-4">
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
