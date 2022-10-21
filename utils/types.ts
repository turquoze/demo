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
  seen: number;
  limit: number;
  offset: number;
  facetsDistribution: any | undefined;
  usedFilter: UsedFilter;
}

export type UsedFilter = Array<{ id: string; value: string }>;

export interface CartItem {
  id: number;
  cart_id: string;
  product_id: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface SearchInfo {
  hits: number;
  offset: number;
  limit: number;
  facetsDistribution: any | undefined;
  exhaustiveNbHits: boolean;
  exhaustiveFacetsCount: boolean | undefined;
}

export interface LoginResponse {
  token: string;
}
