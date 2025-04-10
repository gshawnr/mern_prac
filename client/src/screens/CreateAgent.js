import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Button } from "@mui/material";
import { postData } from "../utils/api";

const DEFAULT_AGENT = {
  email: "",
};

function CreateAgent() {
  const [agent, setAgent] = useState(DEFAULT_AGENT);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await postData({ url: "agent", payload: agent });
      setAgent(DEFAULT_AGENT);
      navigate("/agents");
    } catch (e) {
      console.log("CreateAgent Error: ", e.message);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ textAlign: "center" }}>Create Agent</h1>;
      <form onSubmit={handleSubmit} style={{ width: "50%", margin: "auto" }}>
        <TextField
          label="Email"
          value={agent.email}
          type="email"
          onChange={(e) => setAgent({ ...agent, email: e.target.value })}
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateAgent;
