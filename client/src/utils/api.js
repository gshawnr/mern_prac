import { fetch } from "react";

const dataFetch = async (urlStr) => {
  try {
    const res = fetch("urlStr");
  } catch (e) {
    console.log(`api error: ${e.message}`);
  }
};
