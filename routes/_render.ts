import { RenderContext, RenderFn } from "$fresh/server.ts";
import { forms, setup, theme } from "../utils/twind.ts";
import { virtualSheet } from "$twind/sheets";

const sheet = virtualSheet();
sheet.reset();
setup({ sheet, theme, plugins: { forms } });

export function render(ctx: RenderContext, render: RenderFn) {
  const snapshot = ctx.state.get("twindSnapshot") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...(sheet).target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twindSnapshot", newSnapshot);
}
