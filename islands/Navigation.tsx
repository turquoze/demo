/** @jsx h */
/** @jsxFrag Fragment */

import {
  Fragment,
  h,
  IS_BROWSER,
  useEffect,
  useState,
} from "$fresh/runtime.ts";
import { theme, tw } from "../utils/twind.ts";
import CartProduct from "../components/CartProduct.tsx";

import { Cart, GetCart } from "../services/ShopService.ts";

interface CounterProps {}

export default function Navigation(props: CounterProps) {
  const [open, setOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(false);

  const mobileNav = () => {
    const isOpen = !open;
    setOpen(isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1020) {
      setOpen(false);
    }
  };

  const handleCartClick = async (e: Event) => {
    try {
      e.preventDefault();
      setCartIsOpen(true);
      setLoading(true);
      const response = await fetch("/api/cart");
      const cart: Cart = await response.json();
      if (cart !== undefined) {
        setCart(cart);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <>
      <header class={tw`relative bg-white`}>
        <noscript>
          <p
            class={tw
              `bg-black h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8`}
          >
            For full functionality of this site it is necessary to enable
            JavaScript. Here are the{" "}
            <a
              href="https://enable-javascript.com/"
              class={tw`ml-1 hover:text-gray-400`}
              target="_blank"
            >
              instructions how to enable JavaScript in your web browser
            </a>
          </p>
        </noscript>
        <p
          class={tw
            `bg-black h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8`}
        >
          Test e-commerce site for{" "}
          <a
            href="https://turquoze.com/"
            class={tw`ml-1`}
            target="_blank"
          >
            Turquoze
          </a>
        </p>
        <nav
          aria-label="Top"
          class={tw`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div class={tw`border-b border-gray-200`}>
            <div class={tw`h-16 flex items-center`}>
              {IS_BROWSER
                ? (
                  <button
                    type="button"
                    class={tw`bg-white p-2 rounded-md text-gray-400 lg:hidden`}
                    onClick={mobileNav}
                  >
                    <span class={tw`sr-only`}>Open menu</span>
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
                )
                : null}
              <div class={tw`ml-2 flex lg:ml-0`}>
                <a href="/">
                  <div
                    class={tw`h-8 w-8 rounded-md`}
                    style={{ backgroundColor: theme.colors.turquoise }}
                  >
                  </div>
                </a>
              </div>
              <div class={tw`hidden lg:ml-8 lg:block lg:self-stretch`}>
                <div class={tw`h-full flex space-x-8`}>
                  <a
                    href="/products"
                    class={tw
                      `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
                  >
                    Products
                  </a>
                  <a
                    href="/about"
                    class={tw
                      `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
                  >
                    About
                  </a>
                </div>
              </div>

              <div class={tw`ml-auto flex items-center`}>
                <div class={tw`ml-4 flow-root lg:ml-6`}>
                  {cartIsOpen
                    ? (
                      <div
                        class={tw`relative z-10`}
                        aria-labelledby="slide-over-title"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div
                          class={tw
                            `fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
                        >
                        </div>

                        <div class={tw`fixed inset-0 overflow-hidden`}>
                          <div class={tw`absolute inset-0 overflow-hidden`}>
                            <div
                              class={tw
                                `pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10`}
                            >
                              <div
                                class={tw
                                  `pointer-events-auto w-screen max-w-md`}
                              >
                                <div
                                  class={tw
                                    `flex h-full flex-col overflow-y-scroll bg-white shadow-xl`}
                                >
                                  <div
                                    class={tw
                                      `flex-1 overflow-y-auto py-6 px-4 sm:px-6`}
                                  >
                                    <div
                                      class={tw
                                        `flex items-start justify-between`}
                                    >
                                      <h2
                                        class={tw
                                          `text-lg font-medium text-gray-900`}
                                        id="slide-over-title"
                                      >
                                        Shopping cart
                                      </h2>
                                      <div
                                        class={tw`ml-3 flex h-7 items-center`}
                                      >
                                        <button
                                          type="button"
                                          class={tw
                                            `-m-2 p-2 text-gray-400 hover:text-gray-500`}
                                          onClick={() => setCartIsOpen(false)}
                                        >
                                          <span class={tw`sr-only`}>
                                            Close panel
                                          </span>
                                          <svg
                                            class={tw`h-6 w-6`}
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

                                    <div class={tw`mt-8`}>
                                      <div class={tw`flow-root`}>
                                        <ul
                                          role="list"
                                          class={tw
                                            `-my-6 divide-y divide-gray-200`}
                                        >
                                          {loading
                                            ? (
                                              <h3 class={tw`mt-4`}>
                                                Loading...
                                              </h3>
                                            )
                                            : cart == undefined ||
                                                cart.products.length <= 0
                                            ? (
                                              <h3 class={tw`mt-4`}>
                                                No Product
                                              </h3>
                                            )
                                            : null}
                                          {cart?.products.map((product) => {
                                            return (
                                              <CartProduct product={product} />
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class={tw
                                      `border-t border-gray-200 py-6 px-4 sm:px-6`}
                                  >
                                    <div
                                      class={tw
                                        `flex justify-between text-base font-medium text-gray-900`}
                                    >
                                      <p>Subtotal</p>
                                      <p>${cart?.cost.subtotal ?? 0}</p>
                                    </div>
                                    <p class={tw`mt-0.5 text-sm text-gray-500`}>
                                      Shipping and taxes calculated at checkout.
                                    </p>
                                    <div class={tw`mt-6`}>
                                      <a
                                        href="#"
                                        class={tw
                                          `flex items-center justify-center bg-black rounded-md px-6 py-3 text-base font-medium text-white shadow-sm`}
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
                                        <button
                                          type="button"
                                          class={tw
                                            `font-medium text-indigo-600`}
                                          onClick={() => setCartIsOpen(false)}
                                        >
                                          Continue
                                          Shopping<span aria-hidden="true">
                                            &rarr;
                                          </span>
                                        </button>
                                      </p>
                                    </div>
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
                    class={tw`group -m-2 p-2 flex items-center`}
                    onClick={handleCartClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class={tw
                        `flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500`}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      >
                      </path>
                    </svg>
                    <span
                      class={tw
                        `ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800`}
                    >
                      {cart?.products.length}
                    </span>
                    <span class={tw`sr-only`}>items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {open
        ? (
          <div
            class={tw`relative lg:hidden`}
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <ul class={tw`my-6 mx-6`}>
              <li class={tw`ml-4 mb-2`}>
                <a
                  href="/products"
                  class={tw
                    `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
                >
                  Products
                </a>
              </li>
              <li class={tw`ml-4`}>
                <a
                  href="/about"
                  class={tw
                    `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
                >
                  About
                </a>
              </li>
            </ul>
            <hr />
          </div>
        )
        : null}

      <noscript>
        <div
          class={tw`relative lg:hidden`}
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <ul class={tw`my-6 mx-6`}>
            <li class={tw`ml-4 mb-2`}>
              <a
                href="/products"
                class={tw
                  `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
              >
                Products
              </a>
            </li>
            <li class={tw`ml-4`}>
              <a
                href="/about"
                class={tw
                  `flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
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
