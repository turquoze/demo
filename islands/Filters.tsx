import { Product, SearchInfo, UsedFilter } from "../utils/types.ts";

interface FiltersProps {
  info: SearchInfo;
  usedFilters: UsedFilter;
}

export default function Filters(props: FiltersProps) {
  return (
    <>
      <form>
        <h3 class="pb-4">Filters</h3>
        <div class="border-b border-gray-200 h-40 md:h-96 overflow-y-scroll">
          {Object.entries(props.info.facetsDistribution).map(
            ([key, values]) => {
              return (
                <div key={key} class="pt-6" id="filter-section-0">
                  <h4 class="pb-2">{key}</h4>
                  <div class="space-y-4">
                    {Object.entries(values).map(([value, amount]) => {
                      /*const match = props.usedFilters.find((x) =>
                        x.id == filter && x.value == option
                      );*/
                      const match = undefined;
                      const htmlId = `filter-${key}-${value}`;
                      return (
                        <div key={htmlId} class="flex items-center">
                          <input
                            checked={match != undefined}
                            id={htmlId}
                            name={value}
                            value={value}
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for={htmlId}
                            class="ml-3 text-sm text-gray-600"
                          >
                            {value} - {amount}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            },
          )}
        </div>
        <noscript>
          <div class="pt-2">
            <button
              class="w-28 bg-black rounded-md h-full px-8 flex items-center justify-center text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              type="submit"
            >
              filter
            </button>
          </div>
        </noscript>
      </form>
    </>
  );
}
