import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import { getData } from "../utils/api";
import Property from "../components/Property";

import styles from "./Properties.module.css";

function Properties() {
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("/property");
        setProperties(data);
      } catch (e) {
        console.log(`Propeties error: ${e.message}`);
        setError(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.box}>
      <Button variant="contained" onClick={() => navigate("/")}>
        Home
      </Button>

      <ul className={styles.list}>
        {properties.map((property) => {
          return (
            <div className={styles.box}>
              <li key={property._id} style={{ listStyle: "none" }}>
                <Property property={property} />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Properties;
