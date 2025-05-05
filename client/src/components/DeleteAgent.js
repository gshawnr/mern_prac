import React, { useState } from "react";

function DeleteAgent() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const agent = { email };
      const res = await fetch("http://localhost:5000/api/agent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agent),
      });

      if (!res.ok) {
        throw new Error("DeleteAgent error: unable to create agent");
      }
    } catch (err) {
      console.log("DeleteAgent error", err);
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Show error message conditionally */}
      {error && <h2 style={{ color: "red" }}>error.message</h2>}

      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          margin: "50px auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="email">Email #</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button style={{ margin: "10px auto", width: "100%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeleteAgent;
