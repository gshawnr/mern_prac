import React from "react";

import styles from "./Agent.module.css";

function Agent({ agent }) {
  const { firstName, lastName, email, telephone } = agent;

  return (
    <div className={styles.box}>
      <h2>
        {firstName} {lastName}
      </h2>
      <p>e: {email}</p>
      <p>t: {telephone}</p>
    </div>
  );
}

export default Agent;
