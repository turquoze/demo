import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Navigation from "../islands/Navigation.tsx";
import { setCookie } from "cookie";
import { Login } from "../services/ShopService.ts";

const title = "🛍 Turquoze | Home";
const description = "e-commerce page for you";

export const handler: Handlers = {
  async POST(req, ctx) {
    //TODO: unblock login
    await new Promise((resolve) => setTimeout(resolve, 10));
    return ctx.render();
    /*
    try {
      const data = await req.formData();
      const email = data.get("email");
      const password = data.get("password");
      const rememberMe = data.get("remember-me");

      const resp = await ctx.render();
      if (email && password) {
        const token = await Login(email.toString(), password.toString());

        setCookie(resp.headers, {
          name: "Id",
          value: token,
          expires: rememberMe != null
            ? new Date(Date.now() + (1000 * 60 * 5000))
            : undefined,
          path: "/",
          httpOnly: true,
          sameSite: "Strict",
        });
      }

      return resp;
    } catch (error) {
      return ctx.render();
    }*/
  },
};

export default function LoginPage(props: PageProps) {
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
            <div>
              <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form class="mt-8 space-y-6" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <label for="email-address" class="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label for="password" class="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 focus:ring-gray-500"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      class="h-5 w-5 text-white group-hover:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
