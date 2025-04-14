const BASE_URL = "http://localhost:5000/api/";

export const fetchData = async ({ url = "", queryParams = {} }) => {
  const fullUrl = new URL(`${BASE_URL}${url}`);

  Object.entries(queryParams).forEach(([key, val]) =>
    fullUrl.searchParams.append(key, val)
  );

  const res = await fetch(fullUrl);

  if (!res.ok) {
    throw new Error(`HTTP error - status: ${res.status}`);
  }

  return await res.json();
};

export const postData = async ({ url = "", payload = {} }) => {
  const fullUrl = new URL(`${BASE_URL}${url}`);
  const res = await fetch(fullUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`HTTP error - status: ${res.status}`);

  return res.json();
};
