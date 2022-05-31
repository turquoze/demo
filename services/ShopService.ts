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

const products = [
  {
    slug: "test1",
    name: "Test1",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    ],
    price: {
      currency: "USD",
      value: 20.00,
    },
    description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown
    printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem
    Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem
    Ipsum.`,
    short_description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s.`,
  },
  {
    slug: "test2",
    name: "Test2",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    ],
    price: {
      value: 34.95,
      currency: "USD",
    },
    description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown
    printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem
    Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem
    Ipsum.`,
    short_description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's`,
  },
  {
    slug: "test3",
    name: "Test3",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    ],
    price: {
      value: 56.49,
      currency: "USD",
    },
    description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown
    printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem
    Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem
    Ipsum.`,
    short_description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown`,
  },
  {
    slug: "test4",
    name: "Test4",
    images: [
      "https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    ],
    price: {
      value: 109.95,
      currency: "USD",
    },
    description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown
    printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem
    Ipsum passages, and more recently with desktop publishing
    software like Aldus PageMaker including versions of Lorem
    Ipsum.`,
    short_description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's`,
  },
];

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

    return body.products
  } catch (_error) {
    return undefined;
  }
}

export async function GetFeaturedProducts(): Promise<Array<Product> | undefined> {
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

    return body.products.slice(0, 4)
  } catch (_error) {
    return undefined;
  }
}

export async function GetCart(): Promise<Cart | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    cost: {
      subtotal: 262.00,
    },
    products: [
      {
        id: 1,
        image: products[0].images[0],
        name: products[0].name,
        price: products[0].price.value,
        quantity: 1,
        slug: products[0].slug,
      },
      {
        id: 2,
        image: products[1].images[0],
        name: products[1].name,
        price: products[1].price.value,
        quantity: 4,
        slug: products[1].slug,
      },
      {
        id: 3,
        image: products[2].images[0],
        name: products[2].name,
        price: products[2].price.value,
        quantity: 1,
        slug: products[2].slug,
      },
      {
        id: 4,
        image: products[3].images[0],
        name: products[3].name,
        price: products[3].price.value,
        quantity: 2,
        slug: products[3].slug,
      },
    ],
  };
}
