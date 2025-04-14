import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router";
import { fetchData } from "../utils/api";

function Properties() {
  const [properties, setProperties] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchData({ url: "property" });
        setProperties(data);
        setTimeout(() => {
          // nothing happening here
        }, 9000);
      } catch (e) {
        console.log(e);
        setError(`server Error: ${e.message}`);
      }
    };
    fetchProperties();
  }, []);

  const handleNavigation = () => {
    navigate("/");
  };

  const getDisplay = () => {
    if (properties === null) return <p>...Loading</p>;
    if (properties.length == 0) return <p>No items to display</p>;

    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <ul>
          {properties.map((property, index) => {
            const {
              _id,
              agent,
              address: { street, province, postalCode },
            } = property;
            return (
              <li style={{ margin: "15px 0" }} key={_id}>
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={`/property/${_id}`}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "375px 250px 50px 100px",
                      fontSize: "20px",
                    }}
                  >
                    <p>Agent: {agent}</p>
                    <p>{street}</p>
                    <p>{province}</p>
                    <p>{postalCode}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
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

      {getDisplay()}
    </div>
  );
}

export default Properties;

const classes = {
  p: { fontSize: "20px" },
};
