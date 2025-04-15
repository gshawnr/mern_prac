import { Routes, Route } from "react-router";

import Home from "./Home";
import Agents from "./Agents";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agents" element={<Agents />} />
    </Routes>
  );
};

export default App;
