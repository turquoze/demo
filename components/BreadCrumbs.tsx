/** @jsx h */

import { h } from "$fresh/runtime.ts";
import { tw } from "../utils/twind.ts";

interface BreadCrumbsProps {
  first: {
    href: string;
    name: string;
  };
  links: Array<{
    href: string;
    name: string;
  }>;
}

export default function BreadCrumbs(props: BreadCrumbsProps) {
  return (
    <nav class={tw`flex ml-4`} aria-label="Breadcrumb">
      <ol class={tw`inline-flex items-center space-x-1 md:space-x-3`}>
        <li class={tw`inline-flex items-center`}>
          <svg
            class={tw`mr-2 w-4 h-4`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
            </path>
          </svg>
          <a
            href={props.first.href}
            class={tw
              `inline-flex items-center text-sm text-black hover:text-gray-400`}
          >
            {props.first.name}
          </a>
        </li>
        {props.links.map((breadcrumb) => {
          return (
            <li class={tw`inline-flex items-center`}>
              {">"}
              <a
                href={breadcrumb.href}
                class={tw
                  `inline-flex items-center text-sm text-black hover:text-gray-400 ml-2`}
              >
                {breadcrumb.name}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
