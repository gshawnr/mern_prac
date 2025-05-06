import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import Agent from "../components/Agent";
import { getData } from "../utils/api";

import styles from "./Agents.module.css";

function Agents() {
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data to display
        const data = await getData("/agents");
        setAgents(data);
      } catch (e) {
        console.log(`Agents error: ${e.message}`);
        setError(e);
      }
    };

    fetchData();
  }, []);

  const formatAgents = () => {
    if (!agents) {
      return <h2>...Loading</h2>;
    }

    return (
      <div className={styles.box}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Home
        </Button>

        <ul className={styles.list}>
          {agents.map((agent) => {
            return (
              <div className="box">
                <li key={agent._id} style={{ listStyle: "none" }}>
                  <Agent agent={agent} />
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };

  return <>{formatAgents()}</>;
}

export default Agents;
