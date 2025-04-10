import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { fetchData } from "../utils/api";

function Agents() {
  const [error, setError] = useState("");
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await fetchData({ url: "agent" });
        setAgents(data);
      } catch (e) {
        setError("Server Error");
      }
    };

    fetchAgents();
  }, []);

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleNavigation}
        sx={{ margin: "10px" }}
      >
        Home
      </Button>
      <h2 style={{ textAlign: "center" }}>Agents List</h2>

      <div style={{ width: "70%", margin: "auto" }}>
        <ul>
          {agents.map((agent) => {
            const { agentId, email } = agent;
            return (
              <li key={agentId}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "250px 1fr",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>ID: {agentId}</p>
                  <p style={{ fontSize: "20px" }}>Email: {email}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Agents;
