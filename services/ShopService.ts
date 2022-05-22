export interface Product {
  name: string;
  images: Array<string>;
  short_description: string;
  description: string;
  price: {
    value: number;
    currency: string;
  };
  slug: string;
}

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
}

const products: Array<Product> = [
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

const host = `https://turquoze-backend.deno.dev/api/`;
const token = `3970f509-38bb-426b-9e3d-38e767a4e5f6`;

export async function GetProduct(slug: string): Promise<Product | undefined> {
  try {
    const response = await fetch(
      `${host}products/26b7157f-8c4b-4520-9e27-43500b668e8f`,
      {
        headers: new Headers({
          "x-turquoze-key": token,
        }),
      },
    );
    const body = await response.json();

    return products.find((p) => p.slug == slug);
  } catch (_error) {
    return undefined;
  }
}

export async function GetAllProducts(): Promise<Array<Product> | undefined> {
  try {
    const response = await fetch(`${host}products`, {
      headers: new Headers({
        "x-turquoze-key": token,
      }),
    });
    const body = await response.json();

    return products;
  } catch (_error) {
    return undefined;
  }
}

export async function GetCart(): Promise<Cart | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
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
