import React, { useState } from "react";
import { fetchData, postData } from "../utils/api";

const ApiComponent = () => {
  const [result, setResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await fetchData({
        url: "property",
        queryParams: { propertyId: 123 },
      });
      setResult(data);
      console.log("data", data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setLoading(true);
    try {
      const data = await postData({
        url: "data",
        payload: { name: "Shawn", message: "Testing POST" },
      });
      setPostResult(data);
    } catch (err) {
      console.error("Post error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{}}>
      {loading ? <pre>Loading...</pre> : <pre>&nbsp;</pre>}
      {/* {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      {postResult && <pre>{JSON.stringify(postResult, null, 2)}</pre>} */}
    </div>
  );
};

export default ApiComponent;
