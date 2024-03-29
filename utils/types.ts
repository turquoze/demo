export interface CartProduct {
  id: number;
  name: string;
  quantity: number;
  image: string;
  imageAlt?: "product image";
  slug: string;
  price: number;
  publicId: string;
}

export interface CartInit {
  id: number;
  publicId: string;
  createdAt?: number;
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
  publicId: string;
  createdAt?: string;
  slug: string;
  active: boolean;
  parent?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  images: Array<string>;
  price: number;
  shop: string;
}

export interface SearchProps {
  products: Array<Product>;
  query: string;
  hits: number;
  seen: number;
  limit: number;
  offset: number;
  facetsDistribution: Record<string, Record<string, number>> | undefined;
  usedFilter: UsedFilter;
  // deno-lint-ignore ban-types
  info: SearchInfo | {};
}

export interface ProductsProps {
  search: SearchProps;
  categories: Array<Category>;
}

export interface Inventory {
  id: number;
  publicId: string;
  createdAt?: number;
  warehouse: string;
  product: string;
  quantity: number;
  warehouse_name: string;
}

export type UsedFilter = Array<{ id: string; value: string }>;

export interface CartItem {
  id: number;
  cartId: string;
  itemId: string;
  price: number;
  quantity: number;
  totalPrice: number;
  type: "PRODUCT" | "DISCOUNT";
}

export interface SearchInfo {
  hits: number;
  offset: number;
  limit: number;
  facets: Record<string, Record<string, number>>;
  facetsDistribution: Record<string, Record<string, number>>;
  exhaustiveNbHits: boolean;
  exhaustiveFacetsCount: boolean | undefined;
}

export interface LoginResponse {
  token: string;
}

export interface Category {
  publicId: string;
  createdAt: string;
  name: string;
  parent: string;
  shop: string;
  id: string;
}
