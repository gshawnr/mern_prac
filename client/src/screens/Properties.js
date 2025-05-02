import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import { getData } from "../utils/api";
import PropertyList from "../components/PropertyList";

import styles from "./Properties.module.css";

function Properties() {
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState(null);

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

  const renderContent = () => {
    if (error) {
      return <h2>{error.message}</h2>;
    }

    if (!properties) {
      return <h2>....Loading</h2>;
    }

    return <PropertyList properties={properties} />;
  };

  return (
    <div className={styles.box}>
      <Button variant="contained" onClick={() => navigate("/")}>
        Home
      </Button>

      <h1>Properties</h1>
      {renderContent()}
    </div>
  );
}

export default Properties;
