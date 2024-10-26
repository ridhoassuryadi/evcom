export const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
