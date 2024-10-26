"use client";
import { useCartStore } from "@/lib/zustand/store";
import { useEffect, useState } from "react";
import { IProduct } from "@/lib/types/product.type";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Slider from "@/components/Slider/Slider";

const ProductDetails = () => {
  const params = useParams();
  const id = Number(params.productId);
  const { products, addItem } = useCartStore();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    setProduct(product || null);
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const slideDatas = [
    {
      title: product.title,
      thumbnail: product.thumbnail
    },
    {
      title: "img-gratis",
      thumbnail: product.thumbnail
    }
  ]


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-col justify-center items-center">
      <Slider
  config={{
    slidesToShow: 1,
    spacing: 4,
  }}
  responsiveConfig={[
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ]}
  data={slideDatas}
  renderItem={(item, index) => {
  // return an item of your choosing
    return (
        <Image
          className="w-[400px] h-[400px] object-cover mb-4 rounded-lg"
          src={item.thumbnail}
          alt={item.title}
          height={300}
          width={300}
          priority
        />
    );
  }}
/>
        {/* <Image
          className="w-[400px] h-[400px] object-cover mb-4 rounded-lg"
          src={product.thumbnail}
          alt={product.title}
          height={300}
          width={300}
          priority
        /> */}
        <p className="mb-4">{product.description}</p>
        <p className="font-bold mb-4">${product.price}</p>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 mt-4 flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
          onClick={() => addItem(product)}
        >
          Add to order <MdOutlineAddShoppingCart className=" text-2xl mx-2" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
