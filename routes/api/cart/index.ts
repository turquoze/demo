import { HandlerContext, Handlers } from "$fresh/server.ts";
import {
  AddToCart,
  GetCart,
  RemoveFromCart,
} from "../../../services/ShopService.ts";

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    try {
      const cart = await GetCart();
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
  async POST(req: Request, _ctx: HandlerContext) {
    try {
      const body: { id: string } = await req.json();
      await AddToCart(body.id);
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
  async DELETE(req: Request, _ctx: HandlerContext) {
    try {
      const body: { id: string } = await req.json();
      await RemoveFromCart(body.id);
      const cart = await GetCart();
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
};
