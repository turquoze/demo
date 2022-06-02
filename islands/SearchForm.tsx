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

    const data = await response.json();
    console.log(data);
  }

  // @ts-expect-error no type
  async function onValueChange(e) {
    const { value } = e.target;
    setQuery(value);
    await search();
  }

  return (
    <>
      <div class={tw`my-8 grid justify-items-center`}>
        <form
          class={tw`w-4/5 md:w-1/3`}
          onSubmit={onSubmit}
          method="GET"
          action="/search"
        >
          <label
            for="search"
            class={tw`text-sm font-medium text-gray-700`}
          >
            Search
          </label>
          <div class={tw`mt-1 relative rounded-md shadow-md`}>
            <input
              type="text"
              name="q"
              class={tw
                `h-10 block w-full pl-7 text-sm pr-12 md:text-md border-gray-300 rounded-md`}
              placeholder="search"
              value={query}
              onInput={onValueChange}
            />
          </div>
        </form>
      </div>
      <div
        class={tw
          `grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`}
      >
        {props.products?.map((product) => {
          return <ProductCard product={product} />;
        })}
        {props.hits == 0 && props.products.length == 0
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
