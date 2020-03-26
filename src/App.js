import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useRef returns a ref object
  const searchInputRef = useRef();

  // UseEffect should return a cleanup function or nothing
  // It cannot return a promise
  useEffect(() => {
    fetchData({ query });
  }, [query]);

  const fetchData = async ({ query }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    fetchData({ query });
  };

  const handleClear = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>

      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-teal rounded p-1"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark">Loading Results</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li
              key={result.objectID}
              className="text-indigo-dark hover:text-indigo-darkest"
            >
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}
