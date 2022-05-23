/** @jsx h */
/** @jsxFrag Fragment */

import {
  Fragment,
  h,
  IS_BROWSER,
  theme,
  tw,
  useEffect,
  useState,
} from "../client_deps.ts";

interface CounterProps {}

export default function Navigation(props: CounterProps) {
  const [open, setOpen] = useState(false);

  const mobileNav = () => {
    const isOpen = !open;
    setOpen(isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1020) {
      setOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <>
      <header class={tw`relative bg-white`}>
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
                  <a
                    href="/cart"
                    type={"button"}
                    class={tw`group -m-2 p-2 flex items-center`}
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
                      0
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
            class={tw`relative z-10`}
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
    </>
  );
}
