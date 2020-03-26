import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);

  // UseEffect should return a cleanup function or nothing
  // It cannot return a promise
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      "http://hn.algolia.com/api/v1/search?query=reacthooks"
    );
    setResults(response.data.hits);
  };

  return (
    <>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
