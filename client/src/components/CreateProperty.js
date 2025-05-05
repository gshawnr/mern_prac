import { useState } from "react";
import { useNavigate } from "react-router";

function CreateProperty() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [agentEmail, setAgentEmail] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const property = { agentEmail, street, city, province };

      const res = await fetch("http://localhost:5000/api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });

      if (!res.ok) {
        throw new Error("CreateProperty error: unable to create property");
      }
      navigate("/properties");
    } catch (err) {
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
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="province">Province</label>
          <input
            type="text"
            name="province"
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="agentEmail">Listing Agent Email</label>
          <input
            type="text"
            name="agentEmail"
            onChange={(e) => setAgentEmail(e.target.value)}
          />
        </div>
        <button style={{ margin: "10px auto", width: "100%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProperty;
