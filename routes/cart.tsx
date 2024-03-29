import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import CartProduct from "../islands/CartProduct.tsx";
import { GetCart, RemoveFromCart } from "../services/ShopService.ts";
import { Cart } from "../utils/types.ts";

const title = "🛍 Turquoze | Cart";
const description = "e-commerce page for you";

export const handler: Handlers<Cart, { cartId: string } | null> = {
  async GET(_, ctx) {
    try {
      const cart = await GetCart(ctx.state!.cartId);
      if (cart === undefined) {
        return ctx.renderNotFound();
      }
      return ctx.render(cart);
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
  async POST(req, ctx) {
    try {
      const data = await req.formData();
      const body = Object.fromEntries(data.entries());
      const id = body["pid"];

      if (id != null || id != undefined) {
        await RemoveFromCart(ctx.state!.cartId, id.toString());
      }

      const cart = await GetCart(ctx.state!.cartId);
      if (cart === undefined) {
        return ctx.render();
      }
      return ctx.render(cart);
    } catch (error) {
      console.error(error);
      return ctx.render();
    }
  },
};

export default function CartPage(props: PageProps<Cart | null>) {
  const favicon = new URL(asset("/favicon.svg"), props.url).href;

  if (!props.data) {
    return <h1>Cart not found</h1>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg" href={favicon}></link>
      </Head>
      <div>
        <div class="mx-4 md:mx-36 xl:mx-96">
          <h3 class="text-4xl tracking-tight text-gray-900 sm:text-5xl text-center mb-8">
            Shopping Cart
          </h3>
          {props.data.products.length == 0
            ? <h5 class="mt-24 mb-36">No Products</h5>
            : (
              <ul role="list" class="mt-12 -my-6 divide-y divide-gray-200">
                {props.data?.products.map((product) => {
                  return (
                    <CartProduct
                      product={product}
                      onLoad={() => {}}
                      onRemove={() => {}}
                      onFinished={() => {}}
                      onError={() => {}}
                    />
                  );
                })}
              </ul>
            )}

          <div class="border-t border-gray-200 py-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${props.data?.cost.subtotal ?? 0}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            {props.data.products.length > 0
              ? (
                <>
                  <div class="mt-6">
                    <a
                      href="#"
                      class="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <a
                        href="/"
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping<span aria-hidden="true">
                          &rarr;
                        </span>
                      </a>
                    </p>
                  </div>
                </>
              )
              : (
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <a
                    href="/"
                    type="button"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping<span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
