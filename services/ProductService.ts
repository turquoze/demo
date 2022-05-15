export interface Product {
  href: string;
  name: string;
  img: string;
  description: string;
  price: number;
  slug: string;
}

const products: Array<Product> = [
  {
    slug: "test1",
    name: "Test1",
    img:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    href: "products/test1",
    price: 20.00,
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
  },
  {
    slug: "test2",
    name: "Test2",
    img:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    href: "products/test2",
    price: 34.95,
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
  },
  {
    slug: "test3",
    name: "Test3",
    img:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    href: "products/test3",
    price: 56.49,
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
  },
  {
    slug: "test4",
    name: "Test4",
    img:
      "https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    href: "products/test4",
    price: 109.95,
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
  },
];

export async function Get(slug: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products.find((p) => p.slug == slug);
}

export async function GetAll(): Promise<Array<Product> | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
}
