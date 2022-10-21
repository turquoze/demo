import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import CartProduct from "./CartProduct.tsx";

import { cartQuantity, GetPrice } from "../services/ShopService.ts";
import { Cart } from "../utils/types.ts";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(false);

  const [cartTotal, setCartTotal] = useState<string>();

  setCartTotal(GetPrice(cart?.cost.subtotal ?? 0, "SEK"));

  const mobileNav = () => {
    const isOpen = !open;
    setOpen(isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1020) {
      setOpen(false);
    }
  };

  function handleLoading(state: boolean) {
    setLoading(state);
  }

  async function SubmitCart() {
    if (cart != undefined && cart.products.length > 0) {
      const response = await fetch("/api/cart/pay", {
        method: "POST",
      });
      const data: { url: string } = await response.json();

      window.location.href = data.url;
    } else {
      alert("Error with cart");
    }
  }

  const handleCart = async () => {
    const response = await fetch("/api/cart");
    const cart: Cart = await response.json();

    if (cart !== undefined) {
      let quantity = 0;
      cart.products.forEach((i) => {
        if (i.quantity != null || i.quantity != undefined) {
          quantity += i.quantity;
        }
      });

      cartQuantity.value = quantity;

      setCart(cart);
      setCartTotal(GetPrice(cart?.cost.subtotal ?? 0, "SEK"));
    }
  };

  const handleCartClick = async (e: Event) => {
    try {
      e.preventDefault();
      setCartIsOpen(true);
      setLoading(true);
      await handleCart();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    self.addEventListener("resize", handleResize, false);
    const cart = async () => {
      await handleCart();
    };

    cart();
  }, []);

  return (
    <>
      <header class="relative bg-white">
        <noscript>
          <p class="bg-black h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            For full functionality of this site it is necessary to enable
            JavaScript. Here are the{" "}
            <a
              href="https://enable-javascript.com/"
              class="ml-1 hover:text-gray-400"
              target="_blank"
            >
              instructions how to enable JavaScript in your web browser
            </a>
          </p>
        </noscript>
        <p class="bg-black h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Test e-commerce site for{" "}
          <a
            href="https://turquoze.com/"
            class="ml-1"
            target="_blank"
          >
            Turquoze
          </a>
        </p>
        <nav
          aria-label="Top"
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div class="border-b border-gray-200">
            <div class="h-16 flex items-center">
              <button
                type="button"
                class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={mobileNav}
              >
                <span class="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  >
                  </path>
                </svg>
              </button>
              <div class="ml-2 flex lg:ml-0">
                <a href="/">
                  <div
                    class="h-8 w-8 rounded-md bg-black"
                    style={{ backgroundColor: "#40E0D0" }}
                  >
                  </div>
                </a>
              </div>
              <div class="hidden lg:ml-8 lg:block lg:self-stretch">
                <div class="h-full flex space-x-8">
                  <a
                    href="/products"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Products
                  </a>
                  <a
                    href="/about"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    About
                  </a>
                </div>
              </div>

              <div class="ml-auto flex items-center">
                <div class="ml-4 flow-root lg:ml-6">
                  {IS_BROWSER && cartIsOpen
                    ? (
                      <div
                        class="relative z-10"
                        aria-labelledby="slide-over-title"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                        </div>

                        <div class="fixed inset-0 overflow-hidden">
                          <div class="absolute inset-0 overflow-hidden">
                            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                              <div class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                  <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                    <div class="flex items-start justify-between">
                                      <h2
                                        class="text-lg font-medium text-gray-900"
                                        id="slide-over-title"
                                      >
                                        Shopping cart
                                      </h2>
                                      <div class="ml-3 flex h-7 items-center">
                                        <button
                                          type="button"
                                          class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                          onClick={() => setCartIsOpen(false)}
                                        >
                                          <span class="sr-only">
                                            Close panel
                                          </span>
                                          <svg
                                            class="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>

                                    <div class="mt-8">
                                      <div class="flow-root">
                                        <ul
                                          role="list"
                                          class="-my-6 divide-y divide-gray-200"
                                        >
                                          {loading
                                            ? (
                                              <h3 class="mt-4">
                                                Loading...
                                              </h3>
                                            )
                                            : cart == undefined ||
                                                cart.products.length <= 0
                                            ? (
                                              <h3 class="mt-4">
                                                No Product
                                              </h3>
                                            )
                                            : cart?.products.map((product) => {
                                              return (
                                                <CartProduct
                                                  product={product}
                                                  onLoad={() =>
                                                    handleLoading(true)}
                                                  onRemove={() =>
                                                    handleLoading(false)}
                                                  onFinished={handleCart}
                                                  onError={(error: Error) =>
                                                    console.log(error)}
                                                />
                                              );
                                            })}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                      <p>Subtotal</p>
                                      <p>{cartTotal}</p>
                                    </div>
                                    <p class="mt-0.5 text-sm text-gray-500">
                                      Shipping and taxes calculated at checkout.
                                    </p>
                                    {cart != undefined &&
                                        cart.products.length > 0
                                      ? (
                                        <>
                                          <div class="mt-6">
                                            <button
                                              class="flex items-center justify-center w-full bg-black rounded-md px-6 py-3 text-base font-medium text-white shadow-sm"
                                              onClick={SubmitCart}
                                            >
                                              Checkout
                                            </button>
                                          </div>
                                          <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                              or{" "}
                                              <button
                                                type="button"
                                                class="font-medium text-indigo-600"
                                                onClick={() =>
                                                  setCartIsOpen(false)}
                                              >
                                                Continue
                                                Shopping<span aria-hidden="true">
                                                  &rarr;
                                                </span>
                                              </button>
                                            </p>
                                          </div>
                                        </>
                                      )
                                      : (
                                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                          <p>
                                            <button
                                              type="button"
                                              class="font-medium text-indigo-600"
                                              onClick={() =>
                                                setCartIsOpen(false)}
                                            >
                                              Continue
                                              Shopping<span aria-hidden="true">
                                                &rarr;
                                              </span>
                                            </button>
                                          </p>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                    : null}
                  <a
                    href="/cart"
                    type={"button"}
                    class="group -m-2 p-2 flex items-center"
                    onClick={handleCartClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      >
                      </path>
                    </svg>
                    <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartQuantity.value}
                    </span>
                    <span class="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        class={open ? `relative lg:hidden` : `hidden`}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <ul class="my-6 mx-6">
          <li class="ml-4 mb-2">
            <a
              href="/products"
              class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Products
            </a>
          </li>
          <li class="ml-4">
            <a
              href="/about"
              class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              About
            </a>
          </li>
        </ul>
        <hr />
      </div>

      <noscript>
        <div
          class="relative lg:hidden"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <ul class="my-6 mx-6">
            <li class="ml-4 mb-2">
              <a
                href="/products"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Products
              </a>
            </li>
            <li class="ml-4">
              <a
                href="/about"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                About
              </a>
            </li>
          </ul>
          <hr />
        </div>
      </noscript>
    </>
  );
}
