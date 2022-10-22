import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import BreadCrumbs from "../../components/BreadCrumbs.tsx";
import Footer from "../../components/Footer.tsx";
import { ProductsByCategory } from "../../services/ShopService.ts";
import Navigation from "../../islands/Navigation.tsx";
import { Product } from "../../utils/types.ts";
import ProductCard from "../../components/ProductCard.tsx";

const title = "🛍 Turquoze | Product";
const description = "e-commerce page for you";

export const handler: Handlers<Array<Product> | null> = {
  async GET(_, ctx) {
    try {
      const { slug } = ctx.params;

      const products = await ProductsByCategory(slug);

      return ctx.render(products);
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
};

export default function CategoryPage(props: PageProps<Array<Product> | null>) {
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
      <Navigation />
      <div class="bg-white">
        <div class="pt-6">
          <BreadCrumbs
            first={{ href: "/", name: "Home" }}
            links={[{ href: "/products", name: "Products" }, {
              href: "",
              name: "For Category",
            }]}
          />
          <div class="max-w-2xl mx-auto py-2 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {props.data?.map((product: Product) => {
                return <ProductCard product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
