/** @jsx h */
/** @jsxFrag Fragment */

import { asset, Fragment, h, Head, PageProps } from "$fresh/runtime.ts";
import { tw } from "../utils/twind.ts";
import Footer from "../components/Footer.tsx";
import { Handlers } from "$fresh/server.ts";
import { Search, SearchProps } from "../services/ShopService.ts";
import Navigation from "../islands/Navigation.tsx";
import SearchForm from "../islands/SearchForm.tsx";

const title = "🛍 Turquoze | Home";
const description = "e-commerce page for you";

export const handler: Handlers<SearchProps | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const urlParams = new URLSearchParams(url.search);
    const limit = urlParams.get("limit");
    const offset = urlParams.get("offset");

    let limitInt = 20;
    let offsetInt = 0;

    if (limit != null) {
      limitInt = parseInt(limit);
    }

    if (offset != null) {
      offsetInt = parseInt(offset);
    }

    const response = await Search({
      query: urlParams.get("q"),
      limit: limitInt,
      offset: offsetInt,
    });

    if (response.products === undefined) {
      return ctx.render({
        hits: 0,
        products: [],
        query: "",
      });
    }

    if (req.headers.get("Accept") === "application/json") {
      return new Response(
        JSON.stringify({
          hits: response.nbHits,
          products: response.products,
          query: response.query,
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
        hits: response.nbHits,
        products: response.products,
        query: response.query ?? "",
      });
    }
  },
};

export default function SearchPage(props: PageProps<SearchProps>) {
  const favicon = new URL(asset("/favicon.svg"), props.url).href;

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
      <div>
        <Navigation />
        <div
          class={tw
            `max-w-2xl mx-auto py-4 px-8 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8`}
        >
          <SearchForm
            query={props.data.query}
            hits={props.data.hits}
            products={props.data.products}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}