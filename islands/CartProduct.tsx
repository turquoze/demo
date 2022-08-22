/** @jsx h */

import { h } from "preact";
import { tw } from "twind";
import { CartProduct } from "../services/ShopService.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface CartProductProps {
  product: CartProduct;
  // deno-lint-ignore ban-types
  onLoad: Function;
  // deno-lint-ignore ban-types
  onRemove: Function;
  // deno-lint-ignore ban-types
  onFinished: Function;
  // deno-lint-ignore ban-types
  onError: Function;
}

export default function CartProductComponent(props: CartProductProps) {
  async function onRemove(e: Event) {
    e.preventDefault();

    try {
      props.onLoad();
      const data = { id: props.product.public_id };
      const response = await fetch(`/api/cart`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Content-Length": `${JSON.stringify(data).length}`,
        },
        body: JSON.stringify(data),
        method: "DELETE",
      });

      if (!response.ok) {
        props.onRemove();
      }

      await props.onFinished();
    } catch (error) {
      props.onError(error);
    }
    props.onRemove();
  }

  return (
    <div>
      {IS_BROWSER
        ? (
          <div
            class={tw`mt-10 mb-10`}
          >
            <li key={props.product.id} class={tw`flex py-6`}>
              <div
                class={tw`h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200`}
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
                      type="submit"
                      class={tw`font-medium`}
                      onClick={onRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </div>
        )
        : (
          <form
            class={tw`mt-10 mb-10`}
            method="POST"
            action="/cart"
          >
            <input type="hidden" value={props.product.public_id} name="pid" />
            <li key={props.product.id} class={tw`flex py-6`}>
              <div
                class={tw`h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200`}
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
                      type="submit"
                      class={tw`font-medium`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </form>
        )}
    </div>
  );
}