/** @jsx h */
import { h, PageProps, tw } from "../client_deps.ts";
import CartProduct from "../components/CartProduct.tsx";
import { Handlers } from "../server_deps.ts";
import { Cart, GetCart } from "../services/ShopService.ts";

export const handler: Handlers<Cart | null> = {
  async GET(_, ctx) {
    const cart = await GetCart();
    if (cart === undefined) {
      return ctx.render(null);
    }
    return ctx.render(cart);
  },
};

export default function CartPage({ data }: PageProps<Cart | null>) {
  return (
    <div>
      <div class={tw`mx-4 md:mx-36 xl:mx-96`}>
        <h3
          class={tw
            `text-4xl tracking-tight text-gray-900 sm:text-5xl text-center mb-8`}
        >
          Shopping Cart
        </h3>
        <ul role="list" class={tw`mt-12 -my-6 divide-y divide-gray-200`}>
          {data?.products.map((product) => {
            return <CartProduct product={product} />;
          })}
        </ul>

        <div class={tw`mt-6 border-t border-gray-200 py-6`}>
          <div
            class={tw`flex justify-between text-base font-medium text-gray-900`}
          >
            <p>Subtotal</p>
            <p>$262.00</p>
          </div>
          <p class={tw`mt-0.5 text-sm text-gray-500`}>
            Shipping and taxes calculated at checkout.
          </p>
          <div class={tw`mt-6`}>
            <a
              href="#"
              class={tw
                `flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white shadow-sm bg-black`}
            >
              Checkout
            </a>
          </div>
          <div
            class={tw
              `mt-6 flex justify-center text-center text-sm text-gray-500`}
          >
            <p>
              or{" "}
              <a
                href="/"
                type="button"
                class={tw`font-medium`}
              >
                Continue Shopping<span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
