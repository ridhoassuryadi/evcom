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
        <div className="flex flex-col space-y-4">
          <PriceFilter />
          <Searchbar />
        </div>
      </div>
      <ul className="flex flex-wrap gap-6 justify-center items-center">
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
      </ul>
    </div>
  );
};

export default ProductsPage;
