import React, { useState, useEffect } from "react";

function Agents() {
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data to display
      } catch (e) {
        console.log(`Agents error: ${e.message}`);
        setError(e);
      }
    };

    fetchData();
  }, []);

  const formatAgents = () => {
    const agentsArr = [
      { _id: "1", name: "first" },
      { _id: "2", name: "second" },
      { _id: "3", name: "third" },
    ];

    return (
      <ul>
        {agentsArr.map((agent) => {
          const { _id, name } = agent;
          return (
            <li style={{ listStyle: "none" }}>
              {_id} {name}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div>{agents ? formatAgents() : <p>...Loading</p>}</div>;
}

export default Agents;
