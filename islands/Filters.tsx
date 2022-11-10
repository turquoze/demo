import { Product, SearchInfo, UsedFilter } from "../utils/types.ts";
import { useEffect, useState } from "preact/hooks";

interface FiltersProps {
  info: SearchInfo;
  // deno-lint-ignore ban-types
  onFilter: Function;
}

export default function Filters(props: FiltersProps) {
  const [usedFilters, setUsedFilters] = useState<Record<string, number>>({});

  useEffect(() => {
    const url = new URL(window.location.toString());
    const filters = url.searchParams.get("filters");

    if (filters != null) {
      const usedFiltersLocal = JSON.parse(filters);
      setUsedFilters(usedFiltersLocal);
    } else {
      setUsedFilters({});
    }
  }, [props]);

  const handleClick = (e: Event) => {
    //@ts-expect-error not on type
    const id = e.target.id;
    //@ts-expect-error not on type
    const value = e.target.value;

    const filters = getFilters();
    const entry = Object.keys(filters).find((x) => x == id);
    if (entry != undefined) {
      delete filters[id];
    } else {
      filters[id] = value;
    }

    setUrl(filters);
    props.onFilter();
  };

  function setUrl(filter: Record<string, number>) {
    const url = new URL(window.location.toString());

    if (Object.keys(filter).length === 0) {
      url.searchParams.delete("filters");
    } else {
      url.searchParams.set("filters", JSON.stringify(filter));
    }

    window.history.replaceState({}, document.title, url);
  }

  function getFilters(): Record<string, number> {
    const url = new URL(window.location.toString());

    const filters = url.searchParams.get("filters");

    if (filters == null) {
      return {};
    }

    return JSON.parse(filters);
  }

  return (
    <>
      <form>
        <h3 class="pb-4">Filters</h3>
        <div class="border-b border-gray-200 h-40 md:h-96 overflow-y-scroll">
          {props.info?.facetsDistribution != null &&
            Object.entries(props.info?.facetsDistribution).map(
              ([key, values]) => {
                return (
                  <div key={key} class="pt-6" id="filter-section-0">
                    <h4 class="pb-2">{key}</h4>
                    <div class="space-y-4">
                      {Object.entries(values).map(([value, amount]) => {
                        const htmlId = `filter-${key}-${value}`;
                        const match = Object.keys(usedFilters).find((x) =>
                          x == htmlId
                        );
                        return (
                          <div key={htmlId} class="flex items-center">
                            <input
                              checked={match != undefined}
                              id={htmlId}
                              name={value}
                              value={value}
                              onChange={handleClick}
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
