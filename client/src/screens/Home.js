import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to this amazing app!</h1>
      <div style={{ width: "30%", margin: "50px auto" }}>
        <h2>Agents</h2>
        <Button variant="contained" onClick={() => navigate("/agents")}>
          To Agents
        </Button>
      </div>
    </div>
  );
}

export default Home;
