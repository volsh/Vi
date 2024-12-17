export function mergeArrays(
  arr1: Array<{ [key: string]: unknown }>,
  arr2: Array<{ [key: string]: unknown }>,
  key: string
) {
  const merged = [
    ...arr1
      .concat(arr2)
      .reduce(
        (m, o) =>
          m.set(
            typeof o === "object" ? o[key] : o,
            Object.assign(m.get(typeof o === "object" ? o[key] : o) || {}, o)
          ),
        new Map()
      )
      .values(),
  ];
  return merged;
}
