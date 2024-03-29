import { useState } from "preact/hooks";
import { cart } from "../utils/cart.ts";

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

      const cartNum = cart.peek();
      cart.value = cartNum + 1;
      window.scrollTo(0, 0);
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
      <div class="h-48 mb-2 text-center flex">
        <span class="align-middle self-center">
          Processing...
        </span>
      </div>
    );
  } else {
    return (
      <form
        class="mt-10 mb-10"
        onSubmit={onSubmit}
        method="POST"
        action="/cart"
      >
        <input type="hidden" value={props.productId} name="ID" />
        {props.showOptions
          ? (
            <label>
              <select
                class="w-full mt-1 rounded-md shadow-sm bg-white p-3 focus:ring-2 border-solid border-1"
                value={value}
                onInput={onValueChange}
                name="VARIANT"
                required={true}
              >
                {props.options.map((value) => {
                  return <option value={value.id}>{value.title}</option>;
                })}
              </select>
            </label>
          )
          : null}
        <button
          type="submit"
          class="mt-6 w-full bg-black rounded-md py-3 px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Add to bag
        </button>
      </form>
    );
  }
}
