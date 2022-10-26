import { useState } from "preact/hooks";
import ProductCard from "../components/ProductCard.tsx";
import { Product, SearchProps } from "../utils/types.ts";
import Filters from "./Filters.tsx";

export default function SearchForm(props: SearchProps) {
  const [products, setProducts] = useState(props.products);
  const [query, setQuery] = useState(props.query);
  const [stateOffset, setOffset] = useState(props.offset);
  const [hits, setHits] = useState(props.hits);

  const nextServerSideUrl = props.query == ""
    ? `?offset=${props.offset + props.limit}`
    : `?q=${props.query}&offset=${props.offset + props.limit}`;
  const prevServerSideUrl = props.query == ""
    ? `?offset=${props.offset - props.limit}`
    : `?q=${props.query}&offset=${props.offset - props.limit}`;

  async function onSubmit(e: Event) {
    e.preventDefault();
    // @ts-expect-error no type
    setQuery(document.getElementById("search-input")?.value ?? "");
    await search();
  }

  async function search(offset?: number, localLimit = props.limit) {
    const getFilters = getSearchFilters();
    const filters = Array.from(getFilters.values());
    const filterString = filters.join(" AND ");

    let url = `/search?q=${query}&limit=${localLimit}&filter="${filterString}"`;

    if (offset != null) {
      url = url + `&offset=${offset}`;
    }
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
      },
    });

    const data: SearchProps = await response.json();

    setOffset(data.offset);
    setHits(data.hits);
    setProducts(data.products);
    if (offset != undefined) {
      setUrl(offset!);
    }
  }

  function setUrl(offset: number) {
    const url = new URL(window.location.toString());
    if (offset == 0) {
      url.searchParams.delete("offset");
    } else {
      url.searchParams.set("offset", offset.toString());
    }

    url.searchParams.set("limit", props.limit.toString());

    window.history.replaceState({}, document.title, url);
  }

  async function handleLoadMoreData(e: Event) {
    e.preventDefault();

    const nextOffset = (stateOffset + props.limit) > props.hits
      ? stateOffset
      : (stateOffset + props.limit);
    await search(nextOffset, props.limit);
    window.scrollTo(0, 0);
  }

  async function handleLoadPrevData(e: Event) {
    e.preventDefault();

    const nextOffset = (stateOffset - props.limit) < 0
      ? 0
      : (stateOffset - props.limit);
    await search(nextOffset, props.limit);
    window.scrollTo(0, 0);
  }

  // @ts-expect-error no type
  async function onValueChange(e) {
    const { value } = e.target;
    setQuery(value);
    const url = new URL(window.location.toString());
    url.searchParams.set("q", value);
    window.history.replaceState({}, document.title, url);
    await search();
  }

  function getSearchFilters() {
    const url = new URL(window.location.toString());
    const filters = url.searchParams.get("filters");

    const usedFilter = new Map<string, string>();

    if (filters != null) {
      const obj: Record<string, number> = JSON.parse(filters);
      Object.entries(obj).map(([key, value]) => {
        const filterId = key.split("-")[1];

        if (usedFilter.has(filterId)) {
          const oldVal = usedFilter.get(filterId);

          const newVal = oldVal + " OR " + filterId + " = " + value.toString();
          usedFilter.set(filterId, newVal);
        } else {
          usedFilter.set(filterId, filterId + " = " + value.toString());
        }
      });
    }

    return usedFilter;
  }

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="p-4">
          <Filters
            info={props.info}
            onFilter={search}
          />
        </div>
        <div class="col-span-2">
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
          <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
          <div class="flex justify-center pt-10">
            <h5>hits - {hits}</h5>
          </div>
          <div class="flex justify-center pt-2">
            {stateOffset > 0 && stateOffset <= hits + props.limit
              ? (
                <a
                  href={prevServerSideUrl}
                  onClick={handleLoadPrevData}
                  class="w-28 m-4 pt-2 pb-2 bg-black rounded-md h-full ml-2 px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="submit"
                >
                  Back
                </a>
              )
              : null}
            {stateOffset + props.limit < hits
              ? (
                <a
                  href={nextServerSideUrl}
                  onClick={handleLoadMoreData}
                  class="w-28 m-4 pt-2 pb-2 bg-black rounded-md h-full ml-2 px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="submit"
                >
                  Next
                </a>
              )
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
