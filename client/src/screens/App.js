import { Routes, Route } from "react-router";

import Home from "./Home";
import Agents from "./Agents";
import Properties from "./Properties";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/properties" element={<Properties />} />
    </Routes>
  );
};

export default App;
