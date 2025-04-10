import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import { postData } from "../utils/api";

const DEFAULT_PROPERTY = {
  email: "",
  street: "",
  province: "",
  postalCode: "",
};

function Property() {
  const [propertyData, setPropertyData] = useState(DEFAULT_PROPERTY);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await postData({ url: "property", payload: propertyData });
      setPropertyData(DEFAULT_PROPERTY);
    } catch (e) {
      console.log("CreateProperty Error: ", e.message);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ textAlign: "center" }}>New Property Form</h1>
      <form onSubmit={handleSubmit} style={{ width: "50%", margin: "auto" }}>
        <div>
          <TextField
            label="Agent Email"
            type="email"
            variant="outlined"
            value={propertyData.email}
            onChange={(e) =>
              setPropertyData({ ...propertyData, email: e.target.value })
            }
            fullWidth
            sx={{ my: 2 }}
          />

          <TextField
            label="Street Address"
            variant="outlined"
            value={propertyData.street}
            onChange={(e) =>
              setPropertyData({ ...propertyData, street: e.target.value })
            }
            fullWidth
            sx={{ my: 2 }}
          />

          <TextField
            label="Province"
            variant="outlined"
            value={propertyData.province}
            onChange={(e) =>
              setPropertyData({ ...propertyData, province: e.target.value })
            }
            fullWidth
            sx={{ my: 2 }}
          />

          <TextField
            label="PostalCode"
            variant="outlined"
            value={propertyData.postalCode}
            onChange={(e) =>
              setPropertyData({ ...propertyData, postalCode: e.target.value })
            }
            fullWidth
            sx={{ my: 2 }}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Property;
