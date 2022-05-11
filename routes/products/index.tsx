/** @jsx h */
import { h, tw } from "../../client_deps.ts";

export default function Products() {
  return (
    <div>
      <p class={tw`text-3xl text-black font-extrabold break-words sm:text-4xl`}>
        Products
      </p>
    </div>
  );
}
