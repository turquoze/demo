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
      return new Response(JSON.stringify(cart), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch {
      return new Response(
        JSON.stringify({
          msg: "Error with cart",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        },
      );
    }
  },
  async POST(req: Request, ctx) {
    try {
      const body: { id: string } = await req.json();
      await AddToCart(ctx.state.cartId, body.id);
      return new Response(JSON.stringify({}), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch {
      return new Response(
        JSON.stringify({
          msg: "Error with cart",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        },
      );
    }
  },
  async DELETE(req: Request, ctx) {
    try {
      const body: { id: string } = await req.json();
      await RemoveFromCart(ctx.state.cartId, body.id);
      return new Response(JSON.stringify({}), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch {
      return new Response(
        JSON.stringify({
          msg: "Error with cart",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        },
      );
    }
  },
};
