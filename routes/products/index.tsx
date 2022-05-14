/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../../client_deps.ts";
import ProductCard from "../../components/ProductCard.tsx";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";

const products = [
  {
    name: "Test1",
    img:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    href: "products/test1",
    price: 20.00,
  },
  {
    name: "Test2",
    img:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    href: "products/test2",
    price: 34.95,
  },
  {
    name: "Test3",
    img:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    href: "products/test3",
    price: 56.49,
  },
  {
    name: "Test4",
    img:
      "https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    href: "products/test4",
    price: 109.95,
  },
];

const title = "🛍 Turquoze | Products";
const description = "e-commerce page for you";

export default function Products() {
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
      <div class={tw`pt-6`}>
        <BreadCrumbs
          first={{ href: "/", name: "Home" }}
          links={[{ href: "/products", name: "Products" }]}
        />
      </div>
      <div
        class={tw
          `max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
      >
        <h2
          class={tw`text-2xl tracking-tight text-gray-900 mb-2`}
        >
          All Products
        </h2>
        <div
          class={tw
            `grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`}
        >
          {products.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </div>
    </>
  );
}
