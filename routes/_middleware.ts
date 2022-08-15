import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "cookie";

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
    cartId = cookies.cart;
  } else {
    // get cart
    cartId = "f3231621-3ccd-4d65-a4d3-e2dba8477bfd";
    newCookie = true;
  }

  ctx.state.cartId = cartId;
  const resp = await ctx.next();
  if (newCookie) {
    setCookie(resp.headers, {
      name: "cart",
      value: cartId,
    });
  }
  return resp;
}
