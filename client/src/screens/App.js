import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import CreateProperty from "./CreateProperty";
import CreateAgent from "./CreateAgent";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    const { name } = e.target;
    navigate(`/${name}`);
  };
  return (
    <div className="App">
      <div>
        <div>
          <Button
            name="agents"
            variant="contained"
            onClick={handleNavigation}
            sx={{ margin: "10px" }}
          >
            Agents
          </Button>

          <Button
            name="properties"
            variant="contained"
            onClick={handleNavigation}
            sx={{ margin: "10px" }}
          >
            Properties
          </Button>
        </div>

        <CreateAgent />

        <CreateProperty />
      </div>
    </div>
  );
}

export default App;
