import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import CreateAgent from "../screens/CreateAgent";
import UpdateAgent from "./UpdateAgent";
import DeleteAgent from "./DeleteAgent";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to this amazing app!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "30%",
          margin: "50px auto",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/agents")}>
          Agents
        </Button>

        <Button variant="contained" onClick={() => navigate("/properties")}>
          Properties
        </Button>
      </div>

      <div>
        <h1 style={{ textAlign: "center" }}>New Agent</h1>
        <CreateAgent />
      </div>

      <div>
        <h1 style={{ textAlign: "center" }}>Update Existing Agent</h1>
        <UpdateAgent />
      </div>

      <div>
        <h1 style={{ textAlign: "center" }}>Delete Existing Agent By Email</h1>
        <DeleteAgent />
      </div>
    </div>
  );
}

export default Home;
