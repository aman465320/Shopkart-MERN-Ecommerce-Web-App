import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../styles/components_styles/header.css";
const SearchForm = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `/api/v1/products/search-product/${search.keyword}`
      );
      setSearch({ ...search, results: data.results });
      navigate("/search");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="search-div p-2">
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2 search-input"
          type="search"
          placeholder="🔍Search Products"
          aria-label="Search"
          value={search.keyword}
          required
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <button className="btn btn-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
