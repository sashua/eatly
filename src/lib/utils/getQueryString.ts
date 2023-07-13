export const getQueryString = (
  searchParams:
    | Record<string, boolean | number | string | string[]>
    | null
    | undefined
) => {
  if (!searchParams) {
    return '';
  }
  const queryString = Object.entries(searchParams)
    .map(
      ([key, val]) =>
        `${key}=${encodeURIComponent(Array.isArray(val) ? val.join(',') : val)}`
    )
    .join('&');
  return queryString ? '?' + queryString : '';
};
