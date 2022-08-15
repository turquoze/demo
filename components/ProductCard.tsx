/** @jsx h */

import { h } from "preact";
import { tw } from "twind";
import { Product } from "../services/ShopService.ts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <a href={`/products/${props.product.slug}`}>
      <div
        class={tw`
        w-full
        bg-gray-200
        rounded-lg
        overflow-hidden
      `}
      >
        <img
          src={props.product.images[0]}
          alt="product image"
          class={tw`w-full h-full object-center object-cover group-hover:opacity-75`}
        />
      </div>
      <h3 class={tw`mt-4 text-sm text-gray-700`}>
        {props.product.title}
      </h3>
      <p class={tw`mt-1 text-lg text-gray-900`}>
        ${props.product.price}
      </p>
    </a>
  );
}
