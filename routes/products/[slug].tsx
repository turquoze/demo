/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import { tw } from "twind";
import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import Footer from "../../components/Footer.tsx";
import { GetProduct, Product } from "../../services/ShopService.ts";
import BuyButton from "../../islands/BuyButton.tsx";
import Navigation from "../../islands/Navigation.tsx";

const title = "🛍 Turquoze | Product";
const description = "e-commerce page for you";

export const handler: Handlers<Product | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const product = await GetProduct(slug);
    if (product === undefined) {
      return new Response("404 Page not found", {
        status: 404,
      });
    }
    return ctx.render(product);
  },
};

export default function ProductPage(props: PageProps<Product | null>) {
  const favicon = new URL(asset("/favicon.svg"), props.url).href;

  if (!props.data) {
    return <h1>Product not found</h1>;
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
      <Navigation />
      <div class={tw`bg-white`}>
        <div class={tw`pt-6`}>
          <BreadCrumbs
            first={{ href: "/", name: "Home" }}
            links={[{ href: "/products", name: "Products" }, {
              href: "#",
              name: props.data.title,
            }]}
          />
          <div
            class={tw
              `mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8`}
          >
            <div class={tw`sm:rounded-lg sm:overflow-hidden`}>
              <img
                src={props.data.images[0]}
                alt="product image"
                class={tw`w-full h-full object-center object-cover`}
              />
            </div>

            <div class={tw`lg:mt-24 max-w-2xl mx-auto pt-10 pb-2 px-4 sm:px-6`}>
              <div class={tw`lg:col-span-2 lg:border-gray-200 lg:pr-8`}>
                <h1
                  class={tw`text-2xl tracking-tight text-gray-900 sm:text-3xl`}
                >
                  {props.data.title}
                </h1>
              </div>

              <div class={tw`mt-4 lg:mt-0 lg:row-span-3`}>
                <h2 class={tw`sr-only`}>Product information</h2>
                <p class={tw`text-3xl text-gray-900`}>${props.data.price}</p>

                <div class={tw`mt-6`}>
                  <h3 class={tw`sr-only`}>Reviews</h3>
                  <div class={tw`flex items-center`}>
                    <div class={tw`flex items-center`}>
                      * * *
                    </div>
                    <p class={tw`sr-only`}>3 out of 5 stars</p>
                  </div>
                </div>

                <BuyButton
                  productId={props.data.slug}
                  loading={false}
                  showOptions={true}
                  options={[]}
                />
              </div>

              <div
                class={tw
                  `py-10 lg:pt-6 lg:pb-5 lg:col-start-1 lg:col-span-2 lg:border-gray-200 lg:pr-8`}
              >
                <div>
                  <h3 class={tw`sr-only`}>Description</h3>
                  <div class={tw`space-y-6`}>
                    <p class={tw`text-base text-gray-900`}>
                      {props.data.long_description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
