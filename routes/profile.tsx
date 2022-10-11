import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Navigation from "../islands/Navigation.tsx";
import { getCookies } from "cookie";

const title = "🛍 Turquoze | Home";
const description = "e-commerce page for you";

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    if (cookies.Id != undefined || cookies.Id != null) {
      return ctx.render();
    } else {
      return new Response("", {
        status: 307,
        headers: {
          Location: "/login",
        },
      });
    }
  },
};

export default function ProfilePage(props: PageProps) {
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
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="w-full max-w-md space-y-8">
            <h3>Profile page</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
