import React from "react";

import styles from "./Property.module.css";

function Property({ property }) {
  const { street, city, province } = property;

  return (
    <div className={styles.box}>
      <h2>{street}</h2>
      <p>{city}</p>
      <p>{province}</p>
    </div>
  );
}

export default Property;
