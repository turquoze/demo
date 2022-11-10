import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<unknown, { id: string }> = {
  async GET(_req: Request, ctx) {
    try {
      const { _id } = ctx.params;
      await new Promise((resolve) => setTimeout(resolve, 500));
      return new Response(JSON.stringify([
        {
          id: "1234",
          name: "Warehouse1",
          amount: 34,
          unit: "Pieces",
        },
        {
          id: "1235",
          name: "Warehouse2",
          amount: 12,
          unit: "Pieces",
        },
      ]));
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
