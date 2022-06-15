export interface CartProduct {
  id: number;
  name: string;
  quantity: number;
  image: string;
  imageAlt?: "product image";
  slug: string;
  price: number;
}

export interface Cart {
  products: Array<CartProduct>;
  cost: {
    subtotal: number;
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

export async function GetCart(): Promise<Cart | undefined> {
  try {
    const id = "f3231621-3ccd-4d65-a4d3-e2dba8477bfd";
    const response = await fetch(`${host}carts/${id}/items`, {
      headers: new Headers({
        "x-turquoze-key": token,
      }),
    });

    if (!response.ok) {
      throw new Error("Not Ok");
    }

    const body: { carts: Array<CartItem> } = await response.json();

    console.log(body);

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
          const price = (item.price * item.quantity);

          cart.cost.subtotal += price;

          return {
            id: item.id,
            image: product.images[0] ?? "",
            imageAlt: "product image",
            name: product.title,
            price: item.price,
            quantity: item.quantity,
            slug: product.slug,
          };
        }
      }),
    );

    // @ts-expect-error not on type
    cart.products = cartItems;

    return cart;
  } catch (error) {
    console.log(error);
    return {
      cost: {
        subtotal: 0,
      },
      products: [],
    };
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
      limit: params.limit,
      offset: params.offset,
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
      nbHits: 0,
      query: params.query,
    };
  } catch {
    return {
      products: [],
      nbHits: 0,
      query: params.query,
    };
  }
}
