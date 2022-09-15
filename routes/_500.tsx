import { ErrorPageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import { asset, Head } from "$fresh/runtime.ts";
import Navigation from "../islands/Navigation.tsx";

const title = "🛍 Turquoze | 500";
const description = "e-commerce page for you";

export default function Error500Page(props: ErrorPageProps) {
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
        <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl tracking-tight text-gray-900 mb-2">
            500 internal error: {(props.error as Error).message}
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
