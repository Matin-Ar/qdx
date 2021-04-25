export function createQueryFn(baseUrl) {
  return async ({ queryKey }) => {
    const path =
      typeof queryKey === "string" ? queryKey : queryKey[0] + queryKey[1];
    const res = await fetch(baseUrl + path);

    if (!res.ok) throw new Error(await res.json());

    return res.json();
  };
}
