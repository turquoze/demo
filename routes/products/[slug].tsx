import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import Footer from "../../components/Footer.tsx";
import { GetPrice, GetProduct } from "../../services/ShopService.ts";
import BuyButton from "../../islands/BuyButton.tsx";
import Navigation from "../../islands/Navigation.tsx";
import { Product } from "../../utils/types.ts";
import Inventory from "../../islands/Inventory.tsx";

const title = "🛍 Turquoze | Product";
const description = "e-commerce page for you";

export const handler: Handlers<Product | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const product = await GetProduct(slug);
    if (product === undefined) {
      return ctx.renderNotFound();
    }
    return ctx.render(product);
  },
};

export default function ProductPage(props: PageProps<Product | null>) {
  const favicon = new URL(asset("/favicon.svg"), props.url).href;
  const price = GetPrice(props.data?.price ?? 0, "SEK");

  if (!props.data) {
    return <h1>Product not found</h1>;
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
      <div class="bg-white">
        <div class="pt-6">
          <BreadCrumbs
            first={{ href: "/", name: "Home" }}
            links={[{ href: "/products", name: "Products" }, {
              href: "",
              name: props.data.title,
            }]}
          />
          <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div class="sm:rounded-lg sm:overflow-hidden">
              {props.data.images != null && props.data.images.length > 0
                ? (
                  <img
                    src={props.data.images[0]}
                    alt="product image"
                    class="w-full h-full object-center object-cover"
                  />
                )
                : ""}
            </div>

            <div class="lg:mt-24 max-w-2xl mx-auto pt-10 pb-2 px-4 sm:px-6">
              <div class="lg:col-span-2 lg:border-gray-200 lg:pr-8">
                <h1 class="text-2xl tracking-tight text-gray-900 sm:text-3xl">
                  {props.data.title}
                </h1>
              </div>

              <div class="mt-4 lg:mt-0 lg:row-span-3">
                <h2 class="sr-only">Product information</h2>
                <p class="text-3xl text-gray-900">{price}</p>

                <div class="mt-6">
                  <h3 class="sr-only">Reviews</h3>
                  <div class="flex items-center">
                    <div class="flex items-center">
                      * * *
                    </div>
                    <p class="sr-only">3 out of 5 stars</p>
                  </div>
                </div>

                <Inventory productId={props.data.publicId} />

                <BuyButton
                  productId={props.data.publicId}
                  loading={false}
                  showOptions={false}
                  options={[{
                    default: true,
                    id: props.data.publicId,
                    title: props.data.title,
                  }]}
                />
              </div>

              <div class="py-10 lg:pt-6 lg:pb-5 lg:col-start-1 lg:col-span-2 lg:border-gray-200 lg:pr-8">
                <div>
                  <h3 class="sr-only">Description</h3>
                  <div class="space-y-6">
                    <p class="text-base text-gray-900">
                      {props.data.long_description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
