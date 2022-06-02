/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, useState } from "$fresh/runtime.ts";
import { tw } from "../utils/twind.ts";

import { Product } from "../services/ShopService.ts";
import ProductCard from "../components/ProductCard.tsx";

interface SearchProps {
  products: Array<Product>;
  query: string;
  hits: number;
}

export default function SearchForm(props: SearchProps) {
  const [products, setProducts] = useState(props.products);
  const [query, setQuery] = useState(props.query);

  async function onSubmit(e: Event) {
    e.preventDefault();

    await search();
  }

  async function search() {
    const response = await fetch(`/search?q=${query}`, {
      headers: {
        "Accept": "application/json",
      },
    });

    const data: SearchProps = await response.json();
    console.log(data);
    setProducts(data.products);
  }

  // @ts-expect-error no type
  async function onValueChange(e) {
    const { value } = e.target;
    setQuery(value);
    console.log(`search: ${value}`);
    await search();
  }

  return (
    <>
      <div class={tw`my-8 flex justify-center`}>
        <form
          onSubmit={onSubmit}
          method="GET"
          action="/search"
        >
          <div class={tw`grid grid-cols-3 justify-items-center`}>
            <div class={tw`col-span-2`}>
              <input
                type="text"
                name="q"
                class={tw
                  `h-10 block w-full pl-7 text-sm pr-12 border-gray-300 rounded-md shadow-md border`}
                placeholder="search"
                value={query}
                onInput={onValueChange}
              />
            </div>

            <div class={tw`col-span-1`}>
              <button
                class={tw
                  `w-28 bg-black rounded-md h-full ml-2 px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        class={tw
          `grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`}
      >
        {products?.map((product) => {
          return <ProductCard product={product} />;
        })}
        {props.hits == 0 && products.length == 0
          ? (
            <h2 class={tw`text-4xl tracking-tight text-gray-900 mb-2`}>
              No search hits
            </h2>
          )
          : null}
      </div>
    </>
  );
}
