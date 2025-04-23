import React from "react";

function PropertyList({ properties }) {
  return (
    <ul className="properties-list">
      {properties.map((property) => {
        const { _id, listingAgent, address } = property;
        return (
          <li style={{ listStyle: "none" }} key={_id}>
            <div style={{ textAlign: "center" }}>
              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>{address.province}</p>
              <p>{listingAgent.email}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PropertyList;
