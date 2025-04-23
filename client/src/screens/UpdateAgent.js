import React, { useEffect, useState } from "react";

function UpdateAgent() {
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const agent = { firstName, lastName, email, telephone };
      const res = await fetch("http://localhost:5000/api/agent", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agent),
      });

      if (!res.ok) {
        throw new Error("CreateAgent error: unable to create agent");
      }
    } catch (err) {
      console.log("CreateAgent error", err);
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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="telephone">Telephone #</label>
          <input
            type="text"
            name="telephone"
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <button style={{ margin: "10px auto", width: "100%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateAgent;
