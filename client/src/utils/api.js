const BASE_URL = `http://localhost:5000/api`;

export const getData = async (urlStr, searchParams) => {
  try {
    const url = new URL(`${BASE_URL}${urlStr}`);

    if (searchParams) {
      Object.entries(searchParams).forEach(([key, val]) =>
        url.searchParams.append(key, val)
      );
    }

    const res = await fetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP error - status: ${res.status}`);
    }

    return await res.json();
  } catch (e) {
    console.log(`getData error: ${e.message}`);
  }
};

export const postData = async (urlStr) => {
  try {
  } catch (e) {
    console.log(`postData error: ${e.message}`);
  }
};
