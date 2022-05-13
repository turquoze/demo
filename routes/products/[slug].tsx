/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, PageProps, tw } from "../../client_deps.ts";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";

const title = "🛍 Turquoze | Product";
const description = "e-commerce page for you";

export default function Product(props: PageProps) {
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
      </Head>
      <div class={tw`bg-white`}>
        <div class={tw`pt-6`}>
          <BreadCrumbs
            first={{ href: "#", name: "home" }}
            links={[{ href: "#", name: props.params.slug }]}
          />
          <div
            class={tw`
          mt-6
          max-w-2xl
          mx-auto
          sm:px-6
          lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8
        `}
          >
            <div
              class={tw`sm:rounded-lg sm:overflow-hidden`}
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="product image"
                class={tw`w-full h-full object-center object-cover`}
              />
            </div>

            <div class={tw`lg:mt-24 max-w-2xl mx-auto pt-10 pb-2 px-4 sm:px-6`}>
              <div class={tw`lg:col-span-2 lg:border-gray-200 lg:pr-8`}>
                <h1
                  class={tw`
                text-2xl
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-3xl
              `}
                >
                  {props.params.slug}
                </h1>
              </div>

              <div class={tw`mt-4 lg:mt-0 lg:row-span-3`}>
                <h2 class={tw`sr-only`}>Product information</h2>
                <p class={tw`text-3xl text-gray-900`}>$10.00</p>

                <div class={tw`mt-6`}>
                  <h3 class={tw`sr-only`}>Reviews</h3>
                  <div class={tw`flex items-center`}>
                    <div class={tw`flex items-center`}>
                      * * *
                    </div>
                    <p class={tw`sr-only`}>3 out of 5 stars</p>
                  </div>
                </div>

                <form class={tw`mt-10 mb-10`}>
                  <button
                    type="submit"
                    class={tw`
                  mt-10
                  w-full
                  bg-black
                  rounded-md
                  py-3
                  px-8
                  flex
                  items-center
                  justify-center
                  text-base
                  font-medium
                  text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                `}
                  >
                    Add to bag
                  </button>
                </form>
              </div>

              <div
                class={tw`
              py-10
              lg:pt-6
              lg:pb-5
              lg:col-start-1
              lg:col-span-2
              lg:border-gray-200
              lg:pr-8
            `}
              >
                <div>
                  <h3 class={tw`sr-only`}>Description</h3>
                  <div class={tw`space-y-6`}>
                    <p class={tw`text-base text-gray-900`}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
