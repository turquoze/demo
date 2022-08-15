import { Handlers } from "$fresh/server.ts";
import {
  AddToCart,
  GetCart,
  RemoveFromCart,
} from "../../../services/ShopService.ts";

export const handler: Handlers<unknown, { cartId: string }> = {
  async GET(_req: Request, ctx) {
    try {
      const cart = await GetCart(ctx.state.cartId);
      return new Response(JSON.stringify(cart));
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
  async POST(req: Request, ctx) {
    try {
      const body: { id: string } = await req.json();
      await AddToCart(ctx.state.cartId, body.id);
      return new Response(JSON.stringify({}));
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
  async DELETE(req: Request, ctx) {
    try {
      const body: { id: string } = await req.json();
      await RemoveFromCart(ctx.state.cartId, body.id);
      return new Response(JSON.stringify({}));
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
