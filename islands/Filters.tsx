import { UsedFilter } from "../services/ShopService.ts";

interface FiltersProps {
  filters: Record<string, any>;
  usedFilters: UsedFilter;
}

export default function Filters(props: FiltersProps) {
  const elements = Array<preact.JSX.Element>();

  for (const filter in props.filters) {
    const options = Array<preact.JSX.Element>();
    for (const option in props.filters[filter]) {
      const match = props.usedFilters.find((x) =>
        x.id == filter && x.value == option
      );

      const id = `${filter}`;
      const htmlId = `filter-${id}-${option}`;
      options.push(
        <div class="flex items-center">
          <input
            checked={match != undefined}
            id={htmlId}
            name={id}
            value={option}
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label for={htmlId} class="ml-3 text-sm text-gray-600">
            {option} - {props.filters[filter][option]}
          </label>
        </div>,
      );

      const localElement = (
        <div class="pt-6" id="filter-section-0">
          <h4 class="pb-2">{filter}</h4>
          <div class="space-y-4">
            {options}
          </div>
        </div>
      );
      elements.push(localElement);
    }
  }

  return (
    <>
      <form>
        <h3 class="pb-4">Filters</h3>
        <div class="border-b border-gray-200 h-40 overflow-y-scroll">
          {elements}
        </div>
        <div class="pt-2">
          <button
            class="w-28 bg-black rounded-md h-full px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            type="submit"
          >
            filter
          </button>
        </div>
      </form>
    </>
  );
}
