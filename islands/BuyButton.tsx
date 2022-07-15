/** @jsx h */

import { h } from "preact";
import { tw } from "twind";
import { useState } from "preact/hooks";

interface BuyButtonProps {
  productId: string;
  loading: boolean;
  showOptions: boolean;
  options: Array<{
    id: string;
    title: string;
    default: boolean;
  }>;
}

export default function BuyButton(props: BuyButtonProps) {
  const [loading, setLoading] = useState(props.loading);
  const [value, setValue] = useState(props.options.find((o) => o.default)?.id);

  async function onSubmit(e: Event) {
    e.preventDefault();

    if (value != undefined && value != "NULL") {
      // add to cart
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(`/api/cart`, {
        headers: {
          "Accept": "application/json",
        },
        body: JSON.stringify({ id: props.productId }),
        method: "POST",
      });

      setLoading(false);

      if (!response.ok) {
        alert("No connection to cart");
      }
    } else {
      alert("Not allowed");
    }
  }

  // @ts-expect-error no type
  function onValueChange(e) {
    const { value } = e.target;
    setValue(value);
  }

  if (loading) {
    return (
      <div class={tw`h-48 mb-2 text-center flex`}>
        <span class={tw`align-middle self-center`}>
          Processing...
        </span>
      </div>
    );
  }

  return (
    <form
      class={tw`mt-10 mb-10`}
      onSubmit={onSubmit}
      method="POST"
      action="/cart"
    >
      <input type="hidden" value={props.productId} name="ID" />
      {props.showOptions
        ? (
          <label>
            <select
              class={tw
                `w-full mt-1 rounded-md shadow-sm bg-white p-3 focus:ring-2 border-solid border-1`}
              value={value}
              onInput={onValueChange}
              name="VARIANT"
              required={true}
            >
              <option value="NULL" selected={true}>Select Version</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
        )
        : null}
      <button
        type="submit"
        class={tw
          `mt-6 w-full bg-black rounded-md py-3 px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        Add to bag
      </button>
    </form>
  );
}
