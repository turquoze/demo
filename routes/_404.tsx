/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import { UnknownPageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import { asset, Head } from "$fresh/runtime.ts";
import Navigation from "../islands/Navigation.tsx";
import { tw } from "twind";

const title = "🛍 Turquoze | 404";
const description = "e-commerce page for you";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const favicon = new URL(asset("/favicon.svg"), url).href;

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
          class={tw`max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
        >
          <h2
            class={tw`text-2xl tracking-tight text-gray-900 mb-2`}
          >
            404 not found: {url.pathname}
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
