export function getSearchFilters(url: string) {
  const localUrl = new URL(url);

  // deno-lint-ignore no-explicit-any
  const filters: Array<{ id: string; value: any }> = [];

  for (const [key, value] of localUrl.searchParams.entries()) {
    if (key.includes("filter")) {
      filters.push({
        id: key,
        value: value,
      });
    }
  }

  // deno-lint-ignore no-explicit-any
  const usedFilter = new Map<string, any>();

  if (filters != null && filters.length > 0) {
    for (const i in filters) {
      const element = filters[i];

      const filterId = element.id.split("-")[1];

      if (element.value.includes("min") && element.value.includes("max")) {
        const values = element.value.split("|");
        const min = values[0].split("min:")[1];
        const max = values[1].split("max:")[1];

        //TODO: add when we use new meilisearch version
        //const filter = filterId + min + " TO " + max;
        const filter = filterId + " >= " + min + " AND " + filterId + " < " +
          max;

        usedFilter.set(filterId, filter);
      } else if (usedFilter.has(filterId)) {
        const oldVal = usedFilter.get(filterId);

        const newVal = oldVal + " OR " + filterId + " = " +
          element.value.toString();
        usedFilter.set(filterId, newVal);
      } else {
        usedFilter.set(filterId, filterId + " = " + element.value.toString());
      }
    }
  }

  return usedFilter;
}
