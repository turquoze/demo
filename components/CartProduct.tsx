/** @jsx h */

import { h } from "$fresh/runtime.ts";
import { tw } from "../utils/twind.ts";
import { CartProduct } from "../services/ShopService.ts";

interface CartProductProps {
  product: CartProduct;
}

export default function CartProductComponent(props: CartProductProps) {
  return (
    <li key={props.product.id} class={tw`flex py-6`}>
      <div
        class={tw
          `h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200`}
      >
        <img
          src={props.product.image}
          alt={props.product.imageAlt}
          class={tw`h-full w-full object-cover object-center`}
        />
      </div>

      <div class={tw`ml-4 flex flex-1 flex-col`}>
        <div>
          <div
            class={tw`flex justify-between text-base font-medium text-gray-900`}
          >
            <h3>
              <a href={`/products/${props.product.slug}`}>
                {props.product.name}
              </a>
            </h3>
            <p class={tw`ml-4`}>${props.product.price}</p>
          </div>
        </div>
        <div class={tw`flex flex-1 items-end justify-between text-sm`}>
          <p class={tw`text-gray-500`}>Qty {props.product.quantity}</p>

          <div class={tw`flex`}>
            <button
              type="button"
              class={tw`font-medium`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
