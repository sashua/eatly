import process from "process";

export const getApiUrl = (
  path: string,
  searchParams?: Record<string, string>
) => {
  const searchString = new URLSearchParams({
    page: "1",
    ...searchParams,
  }).toString();

  return `${process.env.NEXT_PUBLIC_API_URL}/${path}${
    searchString ? "?" + searchString : ""
  }`;
};
