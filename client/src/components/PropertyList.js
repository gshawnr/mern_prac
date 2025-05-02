import React from "react";

import styles from "./PropertyList.module.css";

function PropertyList({ properties }) {
  return (
    <ul className={styles.listContainer}>
      {properties.map((property) => {
        const { _id, agentId: listingAgent, street, city, province } = property;
        return (
          <li className={styles.item} key={_id}>
            {/* <div style={{ textAlign: "center" }}> */}
            <p>{street}</p>
            <p>{city}</p>
            <p>{province}</p>
            <p>{listingAgent}</p>
            {/* </div> */}
          </li>
        );
      })}
    </ul>
  );
}

export default PropertyList;
