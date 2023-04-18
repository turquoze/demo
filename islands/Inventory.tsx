import { useEffect, useState } from "preact/hooks";

interface InventoryProps {
  productId: string;
}

export default function Inventory(props: InventoryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inventories, setInventories] = useState<
    Array<{ id: string; name: string; amount: number; unit: string }>
  >([]);

  useEffect(() => {
    const inventory = async (id: string) => {
      setLoading(true);

      const response = await fetch(`/api/inventory/${id}`, {
        headers: {
          "Accept": "application/json",
        },
        method: "GET",
      });

      setLoading(false);

      if (response.ok) {
        setInventories(await response.json());
      } else {
        setError(true);
      }
    };

    inventory(props.productId);
  }, [props.productId]);

  if (loading) {
    return (
      <div class="mb-4">
        <h3 class="mt-2 mb-2 text-sm font-semibold text-gray-900 uppercase">
          Stock
        </h3>
        <span class="align-middle self-center">
          Processing...
        </span>
      </div>
    );
  } else {
    if (error) {
      return <div></div>;
    } else {
      return (
        <div class="mb-4">
          <h3 class="mt-2 mb-2 text-sm font-semibold text-gray-900 uppercase">
            Stock
          </h3>
          {inventories.length == 0 ? <h4>No Stock</h4> : (
            <ol>
              {inventories.map((inv) => {
                return <li>{inv.name} - {inv.amount} {inv.unit}</li>;
              })}
            </ol>
          )}
        </div>
      );
    }
  }
}
