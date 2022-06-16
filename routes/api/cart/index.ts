import { HandlerContext } from "$fresh/server.ts";
import { GetCart } from "../../../services/ShopService.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
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
};
