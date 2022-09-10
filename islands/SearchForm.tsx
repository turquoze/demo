import { tw } from "twind";
import { useState } from "preact/hooks";

import { Product, SearchProps } from "../services/ShopService.ts";
import ProductCard from "../components/ProductCard.tsx";

export default function SearchForm(props: SearchProps) {
  const [products, setProducts] = useState(props.products);
  const [query, setQuery] = useState(props.query);

  async function onSubmit(e: Event) {
    e.preventDefault();
    // @ts-expect-error no type
    setQuery(document.getElementById("search-input")?.value ?? "");
    await search();
  }

  async function search() {
    const response = await fetch(`/search?q=${query}`, {
      headers: {
        "Accept": "application/json",
      },
    });

    const data: SearchProps = await response.json();

    setProducts(data.products);
  }

  // @ts-expect-error no type
  async function onValueChange(e) {
    const { value } = e.target;
    setQuery(value);
    const url =
      `${window.location.origin}${window.location.pathname}?q=${value}`;
    window.history.replaceState({}, document.title, url);
    await search();
  }

  return (
    <>
      <div class="my-8 flex justify-center">
        <form
          onSubmit={onSubmit}
          method="GET"
          action="/search"
        >
          <div class="grid grid-cols-3 justify-items-center">
            <div class="col-span-2">
              <input
                type="text"
                name="q"
                class="h-10 block w-full pl-7 text-sm pr-12 border-gray-300 rounded-md shadow-md border"
                placeholder="search"
                value={query}
                onInput={onValueChange}
                id="search-input"
              />
            </div>

            <div class="col-span-1">
              <button
                class="w-28 bg-black rounded-md h-full ml-2 px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        {products?.map((product: Product) => {
          return <ProductCard product={product} />;
        })}
        {props.hits == 0 && products.length == 0
          ? (
            <h2 class="text-4xl tracking-tight text-gray-900 mb-2">
              No search hits
            </h2>
          )
          : null}
      </div>
    </>
  );
}
