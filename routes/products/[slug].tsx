/** @jsx h */
import { h, PageProps, tw } from "../../client_deps.ts";

export default function Greet(props: PageProps) {
  return (
    <div>
      <p class={tw`text-3xl text-black font-extrabold break-words sm:text-4xl`}>
        Product {props.params.slug}
      </p>
    </div>
  );
}
