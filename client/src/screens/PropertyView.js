import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function PropertyView() {
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (e) {
        console.log("PropertyView error: ", e.message);
        setError(e);
      }
    };
  }, []);

  return (
    <div>
      <div>
        Hello
        {/* <h1> Agent: {property.agentId}</h1>
        <h1> Street: {property.address.street}</h1>
        <h1>Province: {property.address.province}</h1>
        <h1>Postal Code: {property.address.postalCode}</h1> */}
      </div>
    </div>
  );
}

export default PropertyView;
