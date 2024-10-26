import { IProduct } from "@/lib/types/product.type";
import Image from "next/image";
import Link from "next/link";
import AddtoCart from "@/components/CustomComponents/AddToCartButton";
interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className=""
    >
    <div className="border rounded-lg p-4 flex flex-col items-center relative">
      {/* Discount Badge */}
      {10 > 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          Gratis ongkir
        </span>
      )}
      
      {/* Image */}
      <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          className="object-cover w-full h-full"
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          priority
        ></Image>
        <AddtoCart product={product} />
      </div>

      {/* Prices */}
      <div className="mt-3 text-left self-start">
        <p className="text-red-600 text-sm font-bold">Rp {product.price}</p>
      </div>

      {/* Title and Description */}
      <div className="text-left mt-2">
        <p className="text-gray-800 font-semibold text-sm">{product.title}</p>
      </div>
    </div>
    </Link>
  );
};


export default ProductItem;
