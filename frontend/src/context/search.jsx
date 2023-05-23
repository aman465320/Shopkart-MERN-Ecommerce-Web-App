import { useState, useContext, createContext, useEffect } from "react";
const SearchContext = createContext();
// auth provider

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    // returning the provide from context api so that it can be used anywhere in the app
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
