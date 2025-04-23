import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { getData } from "../utils/api";

import "./Agents.css";

function Agents() {
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data to display
        const data = await getData("/agent");
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
      <div className="agents-box">
        <Button variant="contained" onClick={() => navigate("/")}>
          Home
        </Button>

        <ul className="agents-list">
          {agents.map((agent) => {
            const { firstName, lastName, email, telephone } = agent;
            return (
              <li key={agent._id} style={{ listStyle: "none" }}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>{email}</p>
                <p>{telephone}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return <>{formatAgents()}</>;
}

export default Agents;
