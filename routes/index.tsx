/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, Head, tw } from "../client_deps.ts";
import Counter from "../islands/Counter.tsx";

const title = "🛍 Turquoze | Home";
const description = "e-commerce page for you";

export default function Home() {
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
      <div>
        <p
          class={tw`text-3xl text-black font-extrabold break-words sm:text-4xl`}
        >
          Turquoze
        </p>
        <Counter start={3} />
      </div>
    </>
  );
}
