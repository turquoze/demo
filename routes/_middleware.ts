import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "cookie";
import { InitCart } from "../services/ShopService.ts";

interface State {
  cartId: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const cookies = getCookies(req.headers);
  let cartId = "";
  let newCookie = false;

  if (cookies.cart != undefined || cookies.cart != null) {
    // TODO: check if cart is valid
    cartId = cookies.cart;
  } else {
    cartId = await InitCart();
    newCookie = true;
  }

  ctx.state.cartId = cartId;
  const resp = await ctx.next();
  if (newCookie) {
    setCookie(resp.headers, {
      name: "cart",
      value: cartId,
      expires: new Date(Date.now() + (1000 * 60 * 5000)),
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
    });
  }
  return resp;
}
