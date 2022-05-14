/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, tw } from "../client_deps.ts";

interface ProductCardProps {
  product: {
    name: string;
    img: string;
    href: string;
    price: number;
  };
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <a href={props.product.href}>
      <div
        class={tw`
        w-full
        bg-gray-200
        rounded-lg
        overflow-hidden
      `}
      >
        <img
          src={props.product.img}
          alt="product image"
          class={tw
            `w-full h-full object-center object-cover group-hover:opacity-75`}
        />
      </div>
      <h3 class={tw`mt-4 text-sm text-gray-700`}>
        {props.product.name}
      </h3>
      <p class={tw`mt-1 text-lg text-gray-900`}>
        {props.product.price}
      </p>
    </a>
  );
}
