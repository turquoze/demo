/** @jsx h */
import { h, PageProps } from "../../client_deps.ts";

export default function Greet(props: PageProps) {
  return <div>Product {props.params.slug}</div>;
}
