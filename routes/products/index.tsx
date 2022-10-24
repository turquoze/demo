import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import Footer from "../../components/Footer.tsx";
import { Categories, Search } from "../../services/ShopService.ts";
import Navigation from "../../islands/Navigation.tsx";
import SearchForm from "../../islands/SearchForm.tsx";
import Filters from "../../islands/Filters.tsx";
import { ProductsProps } from "../../utils/types.ts";

export const handler: Handlers<ProductsProps | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const urlParams = new URLSearchParams(url.search);
    const limit = urlParams.get("limit");
    const offset = urlParams.get("offset");

    const usedFiltersArr: Array<{ id: string; value: string }> = [];

    if (url.search != "" || url.search != undefined) {
      const usedFilters = url.search.replace("?", "").split("&");

      for (const item in usedFilters) {
        const split = usedFilters[item].split("=");
        usedFiltersArr.push({ id: split[0], value: split[1] });
      }
    }

    let limitInt = 20;
    let offsetInt = 0;

    if (limit != null) {
      limitInt = parseInt(limit);
    }

    if (offset != null) {
      offsetInt = parseInt(offset);
    }

    const categories = await Categories();

    const response = await Search({
      query: urlParams.get("q") ?? "",
      limit: limitInt,
      offset: offsetInt,
    });

    if (response.products === undefined) {
      return ctx.render({
        categories: categories,
        search: {
          hits: 0,
          products: [],
          query: "",
          seen: 0,
          offset: 0,
          limit: limitInt,
          facetsDistribution: {},
          usedFilter: usedFiltersArr,
          //@ts-expect-error err
          info: {},
        },
      });
    }

    if (req.headers.get("Accept") === "application/json") {
      return new Response(
        JSON.stringify({
          hits: response.nbHits,
          limit: limitInt,
          seen: response.seen,
          offset: response.offset,
          products: response.products,
          query: response.query,
          usedFilter: usedFiltersArr,
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    } else {
      return ctx.render({
        categories: categories,
        search: {
          hits: response.nbHits,
          products: response.products,
          seen: response.seen,
          query: response.query ?? "",
          limit: limitInt,
          offset: response.offset,
          facetsDistribution: response.facetsDistribution,
          usedFilter: usedFiltersArr,
          //@ts-expect-error err
          info: response.info,
        },
      });
    }
  },
};

const title = "🛍 Turquoze | Products";
const description = "e-commerce page for you";

export default function Products(props: PageProps<ProductsProps | null>) {
  const favicon = new URL(asset("/favicon.svg"), props.url).href;

  if (!props.data) {
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
        <link rel="icon" type="image/svg" href={favicon}></link>
      </Head>
      <Navigation />
      <div class="pt-6">
        <BreadCrumbs
          first={{ href: "/", name: "Home" }}
          links={[{ href: "/products", name: "Products" }]}
        />
      </div>
      <div class="pt-4 grid place-items-center grid-cols-1 gap-y-2 sm:grid-cols-2 gap-x-2 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
        {props.data.categories.map((category) => {
          return (
            <a
              href={`/category/${category.name}`}
              class="px-1 py-1 rounded-md text-sm font-medium"
            >
              {category.name}
            </a>
          );
        })}
      </div>
      <div class="max-w-2xl mx-auto py-2 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="p-4">
            <Filters
              info={props.data.search.info}
              usedFilters={props.data.search.usedFilter}
            />
          </div>
          <div class="col-span-2">
            <SearchForm
              query={props.data.search.query}
              hits={props.data.search.hits}
              seen={props.data.search.seen}
              limit={props.data.search.limit}
              offset={props.data.search.offset}
              products={props.data.search.products}
              facetsDistribution={props.data.search.facetsDistribution}
              usedFilter={[]}
              info={props.data.search.info}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
