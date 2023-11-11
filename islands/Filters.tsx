import { SearchInfo } from "../utils/types.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface FiltersProps {
  info: SearchInfo;
  // deno-lint-ignore ban-types
  onFilter: Function;
}

export default function Filters(props: FiltersProps) {
  const handleClick = (e: Event) => {
    //@ts-expect-error not on type
    const id = e.target.id as string;
    //@ts-expect-error not on type
    const value = e.target.value as string;

    const filters = [];

    const splits = id.split("-");
    const [first, filterId] = splits;

    const localUrl = new URL(window.location.toString());
    const hasKey = localUrl.searchParams.has(`${first}-${filterId}`);

    let match = false;
    if (hasKey) {
      const searchValue = localUrl.searchParams.get(`${first}-${filterId}`);
      match = searchValue == value;
    }

    if (!match) {
      filters.push({
        id: `${first}-${filterId}`,
        value: value,
      });
    }

    setUrl(filters);
    props.onFilter();
  };

  // deno-lint-ignore no-explicit-any
  function setUrl(filters: Array<{ id: string; value: any }>) {
    const url = new URL(window.location.toString());

    for (const [key, _value] of url.searchParams.entries()) {
      if (key.includes("filter")) {
        url.searchParams.delete(key);
      }
    }
    for (const i in filters) {
      url.searchParams.set(filters[i].id, filters[i].value);
    }

    window.history.replaceState({}, document.title, url);
  }

  return (
    <>
      <form>
        <h3 class="pb-4">Filters</h3>
        <div class="border-b border-gray-200 h-40 md:h-96 overflow-y-scroll">
          {props.info?.facetsDistribution != null &&
            Object.entries(props.info?.facetsDistribution).map(
              ([key, values]) => {
                const arr = Object.entries(values);
                if (arr.length > 15) {
                  const chunks = [];

                  const chunkSize = arr.length / 5;
                  for (let i = 0; i < arr.length; i += chunkSize) {
                    const chunk = arr.slice(i, i + chunkSize);
                    chunks.push(chunk);
                  }

                  return (
                    <div key={key} class="pt-6" id="filter-section-0">
                      <h4 class="pb-2">{key}</h4>
                      <div class="space-y-4">
                        {chunks.map((a) => {
                          const [first, _f] = a[0];
                          const [last, _l] = a[a.length - 1];
                          const htmlId = `filter-${key}-${first}-${last}`;
                          return (
                            <div key={htmlId} class="flex items-center">
                              <input
                                checked={false}
                                id={htmlId}
                                name={`min:${first}|max:${last}`}
                                value={`min:${first}|max:${last}`}
                                onChange={handleClick}
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                for={htmlId}
                                class="ml-3 text-sm text-gray-600"
                              >
                                {first} - {last}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} class="pt-6" id="filter-section-0">
                      <h4 class="pb-2">{key}</h4>
                      <div class="space-y-4">
                        {Object.entries(values).map(([value, amount]) => {
                          const htmlId = `filter-${key}-${value}`;
                          let match = false;

                          if (IS_BROWSER) {
                            const localUrl = new URL(
                              window.location.toString(),
                            );
                            const hasKey = localUrl.searchParams.has(
                              `filter-${key}`,
                            );

                            if (hasKey) {
                              const searchValue = localUrl.searchParams.get(
                                `filter-${key}`,
                              );
                              match = searchValue == value;
                            }
                          }

                          return (
                            <div key={htmlId} class="flex items-center">
                              <input
                                checked={match}
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
                }
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
