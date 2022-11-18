import Dinero from "https://cdn.skypack.dev/dinero.js@1.9.1";
import {
  Cart,
  CartInit,
  CartItem,
  Category,
  FinalizeCart,
  LoginResponse,
  Product,
  SearchInfo,
} from "../utils/types.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { config } from "https://deno.land/std@0.160.0/dotenv/mod.ts";

let host: string | undefined = "";
let turquozeID: string | undefined = "";
let turquozeSecret: string | undefined = "";

if (!IS_BROWSER) {
  await config({ export: true });
  host = Deno.env.get("HOST");
  if (!host) {
    throw new Error("environment variable HOST not set");
  }

  turquozeID = Deno.env.get("TurquozeId");
  if (!turquozeID) {
    throw new Error("environment variable TurquozeId not set");
  }

  turquozeSecret = Deno.env.get("TurquozeSecret");
  if (!turquozeSecret) {
    throw new Error("environment variable TurquozeSecret not set");
  }
}

const authHeaders = {
  "X-Turquoze-Id": turquozeID,
  "X-Turquoze-Secret": turquozeSecret,
};

export function GetPrice(price: number, currency: string): string {
  // TODO: get currency from api
  return Dinero({ amount: price, currency: currency }).toFormat();
}

export async function GetProduct(slug: string): Promise<Product | undefined> {
  try {
    const response = await fetch(
      `${host}products/byslug/${slug}`,
      {
        headers: new Headers({
          ...authHeaders,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Product } = await response.json();

    return body.products;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function GetProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await fetch(
      `${host}products/${id}`,
      {
        headers: new Headers({
          ...authHeaders,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Product } = await response.json();

    return body.products;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function GetAllProducts(): Promise<Array<Product> | undefined> {
  try {
    const response = await fetch(`${host}products?limit=20`, {
      headers: new Headers({
        ...authHeaders,
      }),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Array<Product> } = await response.json();

    return body.products;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function GetFeaturedProducts(): Promise<
  Array<Product> | undefined
> {
  try {
    const response = await fetch(`${host}products?limit=6`, {
      headers: new Headers({
        ...authHeaders,
      }),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Array<Product> } = await response.json();

    return body.products.slice(0, 4);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function RemoveFromCart(
  cart_id: string,
  product_id: string,
): Promise<void> {
  try {
    const response = await fetch(
      `${host}carts/${cart_id}/items/${product_id}`,
      {
        headers: new Headers({
          ...authHeaders,
        }),
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function AddToCart(
  cart_id: string,
  product_id: string,
): Promise<void> {
  try {
    const data = {
      cart_id: cart_id,
      product_id: product_id,
      price: 2000,
      quantity: 1,
    };
    const response = await fetch(`${host}carts/${cart_id}/items/`, {
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
        "Content-Length": `${JSON.stringify(data).length}`,
      }),
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function GetCart(cart_id: string): Promise<Cart | undefined> {
  try {
    const response = await fetch(`${host}carts/${cart_id}/items`, {
      headers: new Headers({
        ...authHeaders,
      }),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { carts: Array<CartItem> } = await response.json();

    const cart: Cart = {
      products: [],
      cost: {
        subtotal: 0,
      },
    };

    const ids = body.carts.map((item) => item.product_id).join(",");

    const productsResponse = await fetch(
      `${host}products/byids?ids=${ids}`,
      {
        headers: new Headers({
          ...authHeaders,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const { products }: { products: Array<Product> } = await productsResponse
      .json();

    if (products == undefined || products.length == 0) {
      return {
        cost: {
          subtotal: 0,
        },
        products: [],
      };
    }

    cart.products = products.map((product) => {
      const item = body.carts.find((p) => p.product_id == product.public_id);

      if (item == undefined) {
        throw new Error("Error with cart");
      }

      cart.cost.subtotal += item.quantity * product.price;

      return {
        id: product.id,
        image: product.images[0] ?? "",
        imageAlt: "product image",
        name: product.title,
        price: product.price,
        quantity: item.quantity,
        slug: product.slug,
        public_id: product.public_id,
      };
    });

    return cart;
  } catch (error) {
    console.error(error);
    return {
      cost: {
        subtotal: 0,
      },
      products: [],
    };
  }
}

export async function InitCart(): Promise<string> {
  try {
    const data = JSON.stringify({
      public_id: null,
    });

    const response = await fetch(`${host}carts/`, {
      method: "POST",
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
      }),
      body: data,
    });

    if (!response.ok) {
      throw new Error("Not OK");
    }

    const body: { carts: CartInit } = await response.json();

    return body.carts.public_id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function FinalizeCart(cart_id: string): Promise<string> {
  try {
    const response = await fetch(`${host}carts/${cart_id}/finalize`, {
      method: "POST",
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
      }),
    });

    const body: FinalizeCart = await response.json();

    return body.payment.value;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Search(params: {
  query: string | null;
  limit: number;
  offset: number;
  filters: string | null;
}) {
  try {
    let filters = null;
    if (params.filters != null) {
      filters = params.filters.replace('"', "");
    }

    const data = JSON.stringify({
      query: params.query,
      options: {
        limit: params.limit,
        offset: params.offset,
        facetsDistribution: ["*"],
        filter: filters,
      },
    });

    const response = await fetch(`${host}products/search`, {
      method: "POST",
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
      }),
      body: data,
    });

    const body: { products: Array<Product>; info: SearchInfo } = await response
      .json();

    const hitsSeen = body?.info?.offset == undefined || body.info.offset == 0
      ? body?.info?.limit ?? 0
      : body.info.offset + body.info.limit;

    return {
      products: body.products,
      nbHits: body?.info?.hits ?? 0,
      seen: hitsSeen,
      offset: body?.info?.offset ?? 0,
      query: params.query,
      facetsDistribution: body?.info?.facetsDistribution ?? {},
      info: body.info,
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      nbHits: 0,
      seen: 0,
      offset: 0,
      query: params.query,
      facetsDistribution: {},
      info: {},
    };
  }
}

export async function Login(
  email: string,
  password: string,
): Promise<string> {
  try {
    const data = {
      email,
      password,
    };

    const response = await fetch(`${host}users/login`, {
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
        "Content-Length": `${JSON.stringify(data).length}`,
      }),
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const loginResponse: LoginResponse = await response.json();

    return loginResponse.token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Register(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  try {
    const data = {
      name,
      email,
      password,
    };

    const response = await fetch(`${host}users`, {
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
        "Content-Length": `${JSON.stringify(data).length}`,
      }),
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Categories(): Promise<Array<Category>> {
  try {
    const response = await fetch(`${host}categories`, {
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
      }),
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { categories: Array<Category> } = await response.json();

    return body.categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function ProductsByCategory(
  name: string,
): Promise<Array<Product>> {
  try {
    const response = await fetch(`${host}categories/byname/${name}`, {
      headers: new Headers({
        ...authHeaders,
        "Content-Type": "application/json",
      }),
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { categories: Category } = await response.json();

    if (
      body?.categories?.public_id == undefined ||
      body?.categories?.public_id == ""
    ) {
      throw new Error("Not Ok");
    }

    const responseProducts = await fetch(
      `${host}categories/${body.categories.public_id}/products`,
      {
        headers: new Headers({
          ...authHeaders,
          "Content-Type": "application/json",
        }),
        method: "GET",
      },
    );

    if (!responseProducts.ok) {
      throw new Error("Not Ok");
    }

    const products: { products: Array<Product> } = await responseProducts
      .json();

    return products.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
