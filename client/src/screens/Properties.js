import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { fetchData } from "../utils/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchData({ url: "property" });
        setProperties(data);
      } catch (e) {
        console.log(e);
        setError("server Error: ", e.message);
      }
    };
    fetchProperties();
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
      <h2 style={{ textAlign: "center" }}>Properties List</h2>

      <div style={{ width: "80%", margin: "auto" }}>
        <ul>
          {properties.map((property, index) => {
            const {
              agentEmail: email,
              address: { street, province, postalCode },
            } = property;
            return (
              <li key={index}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "375px 250px 50px 100px",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Agent Contact: {email}</p>
                  <p style={{ fontSize: "20px" }}>{street}</p>
                  <p style={{ fontSize: "20px" }}>{province}</p>
                  <p style={{ fontSize: "20px" }}>{postalCode}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Properties;
