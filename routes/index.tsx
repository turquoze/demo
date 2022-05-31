/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, PageProps } from "$fresh/runtime.ts";
import { tw } from "../utils/twind.ts";
import ProductCard from "../components/ProductCard.tsx";
import PromoHeader from "../components/PromoHeader.tsx";
import Footer from "../components/Footer.tsx";
import { Handlers } from "$fresh/server.ts";
import { GetFeaturedProducts, Product } from "../services/ShopService.ts";
import Navigation from "../islands/Navigation.tsx";

const title = "🛍 Turquoze | Home";
const description = "e-commerce page for you";

export const handler: Handlers<Array<Product> | null> = {
  async GET(_, ctx) {
    const products = await GetFeaturedProducts();
    if (products === undefined) {
      return ctx.render(null);
    }
    return ctx.render(products);
  },
};

export default function Home({ data }: PageProps<Array<Product> | null>) {
  if (!data) {
    return <h1>Products not found</h1>;
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
      </Head>
      <div>
        <Navigation />
        <PromoHeader />
        <div
          class={tw
            `max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
        >
          <h2
            class={tw`text-2xl tracking-tight text-gray-900 mb-2`}
          >
            Featured Products
          </h2>
          <div
            class={tw
              `grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`}
          >
            {data.map((product) => {
              return <ProductCard product={product} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
