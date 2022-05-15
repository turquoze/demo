/** @jsx h */

import { h, tw } from "../client_deps.ts";

export default function PromoHeader() {
  return (
    <div class={tw`relative bg-white overflow-hidden`}>
      <div class={tw`pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48`}>
        <div
          class={tw`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static`}
        >
          <div class={tw`sm:max-w-lg`}>
            <h1
              class={tw`text-4xl tracking-tight text-gray-900 sm:text-5xl`}
            >
              New Products in stock
            </h1>
            <p class={tw`mt-4 text-xl text-gray-500`}>
              This year, our new summer products collection will be even better
              than last year.
            </p>
          </div>
          <div>
            <div class={tw`mt-10`}>
              <div
                aria-hidden="true"
                class={tw
                  `pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full`}
              >
                <div
                  class={tw
                    `absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8`}
                >
                  <div class={tw`flex items-center space-x-6 lg:space-x-8`}>
                    <div
                      class={tw
                        `flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8`}
                    >
                      <div
                        class={tw
                          `w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100`}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                      <div class={tw`w-44 h-64 rounded-lg overflow-hidden`}>
                        <img
                          src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                    </div>
                    <div
                      class={tw
                        `flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8`}
                    >
                      <div class={tw`w-44 h-64 rounded-lg overflow-hidden`}>
                        <img
                          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                      <div class={tw`w-44 h-64 rounded-lg overflow-hidden`}>
                        <img
                          src="https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                      <div class={tw`w-44 h-64 rounded-lg overflow-hidden`}>
                        <img
                          src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                    </div>
                    <div
                      class={tw
                        `flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8`}
                    >
                      <div class={tw`w-44 h-64 rounded-lg overflow-hidden`}>
                        <img
                          src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                      <div class={tw`w-44 h-64 rounded-lg overflow-hidden`}>
                        <img
                          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                          alt=""
                          class={tw`w-full h-full object-center object-cover`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/products"
                class={tw
                  `inline-block text-center rounded-md py-3 px-8 bg-black text-white`}
              >
                Shop Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
