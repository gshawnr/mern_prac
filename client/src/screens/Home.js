import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import CreateAgent from "../components/CreateAgent";
import UpdateAgent from "../components/UpdateAgent";
import DeleteAgent from "../components/DeleteAgent";
import CreateProperty from "../components/CreateProperty";

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

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>New Agent</h1>
            <CreateAgent />
          </div>

          <div>
            <h1 style={{ textAlign: "center" }}>Update Agent</h1>
            <UpdateAgent />
          </div>

          <div>
            <h1 style={{ textAlign: "center" }}>Delete Agent</h1>
            <DeleteAgent />
          </div>
        </div>

        <div>
          <div>
            <h1 style={{ textAlign: "center" }}>New Property</h1>
            <CreateProperty />
          </div>

          <div>
            <h1 style={{ textAlign: "center" }}>Update Property</h1>
            <UpdateAgent />
          </div>

          <div>
            <h1 style={{ textAlign: "center" }}>Delete Property</h1>
            <DeleteAgent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
