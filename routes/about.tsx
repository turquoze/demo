/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import { tw } from "twind";
import { asset, Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Navigation from "../islands/Navigation.tsx";
import BreadCrumbs from "../components/BreadCrumbs.tsx";

const title = "🛍 Turquoze | About";
const description = "e-commerce page for you";

export default function About(props: PageProps) {
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
        <div class={tw`mt-4`}>
          <BreadCrumbs
            first={{ href: "/", name: "Home" }}
            links={[{
              href: "#",
              name: "About",
            }]}
          />
        </div>
        <div class={tw`mt-8 mx-8 md:mx-24`}>
          <h3 class={tw``}>
            Demo site for{" "}
            <a
              href="https://turquoze.com"
              target="_blank"
              class={tw`hover:text-gray-400`}
            >
              Turquoze
            </a>
          </h3>
          <p class={tw`mt-4`}>
            Assumenda iure dolores excepturi et commodi. Nam vel et suscipit
            est. Harum assumenda omnis nesciunt iste ut nisi. Pariatur assumenda
            quae non aut sit consequuntur odit. Accusamus doloremque sunt nobis
            molestiae hic ipsum. A dolore mollitia nostrum ea soluta laborum
            aspernatur. Autem eum repellat perferendis. Nostrum et sint expedita
            reiciendis id ullam quia. Nam quod dicta nihil voluptatem sit
            excepturi. Tempore voluptatem non temporibus. Cum placeat qui nihil
            voluptate veniam sed blanditiis dolorem. Veritatis aut ipsa id
            deleniti voluptas libero. Est quas commodi nemo delectus delectus
            aperiam fugiat error. Aut distinctio sunt error odit ut aut. Unde
            atque ut porro aut id voluptas. Vel aspernatur aut ut porro
            accusantium debitis praesentium adipisci. Sunt aliquam ut maxime
            consequatur qui sunt harum. Eum et qui nostrum veniam. Amet
            voluptatum rerum est vero ut ipsa animi deleniti. Molestiae qui
            commodi aut voluptas sed. Quia cupiditate atque fuga. Cum molestiae
            dolores dolore. Saepe expedita voluptates dolorem ex eum quia et.
            Reprehenderit aut occaecati nisi nostrum. Aut veritatis ullam
            dignissimos quasi quibusdam mollitia. Quia placeat labore nam.
            Cupiditate sed earum possimus quis consectetur. Dolor ut illo
            dolorem tempore ipsam quidem exercitationem. Laboriosam sapiente
            reiciendis quia consequatur doloribus aut. Assumenda voluptas odio
            et est. Nihil nam dolores consectetur perferendis. Rerum doloribus
            esse qui vel. Consequatur dolore numquam iusto. Delectus qui
            laudantium mollitia ut labore omnis cupiditate.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
