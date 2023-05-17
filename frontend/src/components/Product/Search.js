import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Search.css";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim()) {
      navigate(`/products/${searchInput}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
}

export default Search;
