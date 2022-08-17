export interface CartProduct {
  id: number;
  name: string;
  quantity: number;
  image: string;
  imageAlt?: "product image";
  slug: string;
  price: number;
  public_id: string;
}

export interface CartInit {
  id: number;
  public_id: string;
  created_at?: number;
  items: Array<CartItem>;
}

export interface Cart {
  products: Array<CartProduct>;
  cost: {
    subtotal: number;
  };
}

export interface FinalizeCart {
  order: string;
  payment: {
    type: "URL" | "CODE";
    value: string;
  };
}

export interface Product {
  id: number;
  public_id: string;
  created_at?: string;
  slug: string;
  active: boolean;
  parent?: string;
  title: string;
  short_description: string;
  long_description: string;
  images: Array<string>;
  price: number;
  shop: string;
}

export interface SearchProps {
  products: Array<Product>;
  query: string;
  hits: number;
  facetsDistribution: unknown | undefined;
}

export interface CartItem {
  id: number;
  cart_id: string;
  product_id: string;
  price: number;
  quantity: number;
}

export interface SearchInfo {
  hits: number;
  offset: number;
  limit: number;
  facetsDistribution: unknown | undefined;
  exhaustiveNbHits: boolean;
  exhaustiveFacetsCount: boolean | undefined;
}

const host = `https://turquoze-backend.deno.dev/api/`;
const token = `1562452e-d4fe-4a00-a242-4fa1e069584d`;

export async function GetProduct(slug: string): Promise<Product | undefined> {
  try {
    const response = await fetch(
      `${host}products/byslug/${slug}`,
      {
        headers: new Headers({
          "x-turquoze-key": token,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Product } = await response.json();

    return body.products;
  } catch (_error) {
    return undefined;
  }
}

export async function GetProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await fetch(
      `${host}products/${id}`,
      {
        headers: new Headers({
          "x-turquoze-key": token,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Product } = await response.json();

    return body.products;
  } catch (_error) {
    return undefined;
  }
}

export async function GetAllProducts(): Promise<Array<Product> | undefined> {
  try {
    const response = await fetch(`${host}products?limit=20`, {
      headers: new Headers({
        "x-turquoze-key": token,
      }),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Array<Product> } = await response.json();

    return body.products;
  } catch (_error) {
    return undefined;
  }
}

export async function GetFeaturedProducts(): Promise<
  Array<Product> | undefined
> {
  try {
    const response = await fetch(`${host}products?limit=6`, {
      headers: new Headers({
        "x-turquoze-key": token,
      }),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { products: Array<Product> } = await response.json();

    return body.products.slice(0, 4);
  } catch (_error) {
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
          "x-turquoze-key": token,
        }),
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Not Ok");
    }
  } catch (error) {
    console.log(error);
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
        "x-turquoze-key": token,
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
    console.log(error);
  }
}

export async function GetCart(cart_id: string): Promise<Cart | undefined> {
  try {
    const response = await fetch(`${host}carts/${cart_id}/items`, {
      headers: new Headers({
        "x-turquoze-key": token,
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

    const cartItems = await Promise.all(
      body.carts.map(async (item) => {
        const product = await GetProductById(item.product_id);

        if (product != undefined) {
          const price = (product.price * item.quantity);

          cart.cost.subtotal += price;

          return {
            id: item.id,
            image: product.images[0] ?? "",
            imageAlt: "product image",
            name: product.title,
            price: product.price,
            quantity: item.quantity,
            slug: product.slug,
            public_id: product.public_id,
          };
        } else {
          return {};
        }
      }),
    );

    // @ts-expect-error not on type
    cart.products = cartItems;

    return cart;
  } catch {
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
        "x-turquoze-key": token,
        "Content-Type": "application/json",
      }),
      body: data,
    });

    const body: { carts: CartInit } = await response.json();

    return body.carts.public_id;
  } catch (error) {
    throw error;
  }
}

export async function FinalizeCart(cart_id: string): Promise<string> {
  try {
    const response = await fetch(`${host}carts/${cart_id}/finalize`, {
      method: "POST",
      headers: new Headers({
        "x-turquoze-key": token,
        "Content-Type": "application/json",
      }),
    });

    const body: FinalizeCart = await response.json();

    console.log("hahjfhjf");
    console.log(body);
    console.log("sgadya");

    return body.payment.value;
  } catch (error) {
    console.log("err");
    console.log(error);
    throw error;
  }
}

export async function Search(params: {
  query: string | null;
  limit: number;
  offset: number;
}) {
  try {
    const data = JSON.stringify({
      query: params.query,
      options: {
        limit: params.limit,
        offset: params.offset,
        facetsDistribution: ["*"],
      },
    });

    const response = await fetch(`${host}products/search`, {
      method: "POST",
      headers: new Headers({
        "x-turquoze-key": token,
        "Content-Type": "application/json",
      }),
      body: data,
    });

    const body: { products: Array<Product>; info: SearchInfo } = await response
      .json();

    return {
      products: body.products,
      nbHits: body.info.hits,
      query: params.query,
      facetsDistribution: body.info.facetsDistribution,
    };
  } catch {
    return {
      products: [],
      nbHits: 0,
      query: params.query,
      facetsDistribution: {},
    };
  }
}
