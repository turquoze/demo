import { Handlers } from "$fresh/server.ts";
import { FinalizeCart } from "../../../services/ShopService.ts";
import { deleteCookie } from "cookie";

export const handler: Handlers<unknown, { cartId: string }> = {
  async POST(_req: Request, ctx) {
    try {
      const body = await FinalizeCart(ctx.state.cartId);
      const headers = new Headers();
      deleteCookie(headers, "cart", {
        path: "/",
      });
      return new Response(JSON.stringify({ url: body }), { headers });
    } catch {
      return new Response(
        JSON.stringify({
          msg: "Error with cart",
        }),
        {
          status: 500,
        },
      );
    }
  },
};
