import { GetPrice } from "../services/ShopService.ts";
import { Product } from "../utils/types.ts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  const price = GetPrice(parseInt(props.product.price.toString()), "SEK");

  return (
    <a href={`/products/${props.product.slug}`}>
      <div class="w-full bg-gray-200 rounded-lg overflow-hidden">
        {props.product.images != null && props.product.images.length > 0
          ? (
            <img
              src={props.product.images[0]}
              alt="product image"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          )
          : ""}
      </div>
      <h3 class="mt-4 text-sm text-gray-700">
        {props.product.title}
      </h3>
      <p class="mt-1 text-lg text-gray-900">
        {price}
      </p>
    </a>
  );
}
