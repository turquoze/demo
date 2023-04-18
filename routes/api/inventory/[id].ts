import { Handlers } from "$fresh/server.ts";
import { GetInventoryByProductId } from "../../../services/ShopService.ts";

export const handler: Handlers<unknown, { id: string }> = {
  async GET(_req: Request, ctx) {
    try {
      const { id } = ctx.params;
      const inventories = await GetInventoryByProductId(id);

      if (inventories == undefined) {
        return new Response(JSON.stringify([]));
      }

      const responseData = inventories.map((inventory) => {
        return {
          id: inventory.id,
          name: inventory.warehouse,
          amount: inventory.quantity,
          unit: "Pieces",
        };
      });

      return new Response(JSON.stringify(responseData));
    } catch {
      return new Response(
        JSON.stringify({
          msg: "Error with inventory",
        }),
        {
          status: 500,
        },
      );
    }
  },
};
