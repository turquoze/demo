/** @jsx h */
import { h, tw } from "../client_deps.ts";

export default function Cart() {
  return (
    <div>
      <p class={tw`text-3xl text-black break-words sm:text-4xl`}>
        Cart
      </p>
    </div>
  );
}
