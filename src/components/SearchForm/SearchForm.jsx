/* eslint-disable no-unused-vars */
import { Link, List, ListItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";

const SearchForm = () => {
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  const colors = useTheme().palette;
  const { items, shops, locations } = loggedUser;
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    const itemsFiltered = items.filter((item) => item.name.includes(searchValue));
    const shopsFiltered = shops.filter((shop) => shop.name.includes(searchValue));
    const locationsFiltered = locations.filter((location) => location.name.startsWith(searchValue));

    itemsFiltered.forEach((item) => item.searchType = "Item");
    shopsFiltered.forEach((shop) => shop.searchType = "Shop");
    locationsFiltered.forEach((location) => location.searchType = "Location");

    searchValue == "" ? setSearchResults([]) : setSearchResults([...itemsFiltered, ...shopsFiltered, ...locationsFiltered]);
  };
  return (
    <>
      <form>
        <TextField variant="standard" label="Search" onChange={handleSearch} value={searchValue} autoComplete="false" spellCheck="false" sx={{ width: "81vw" }} />
      </form>
      <List sx={{ position: "absolute", top: "45px", width: "81vw" }}>
        {
          searchResults.map((result) => {
            return <ListItem key={result.name} sx={{ background: colors.primary.dark }}>
              <Link href={`/${result.searchType}/${result.name}`} component="a" color="#fff" underline="none">{`${result.searchType} - ${result.name}`}</Link>
            </ListItem>;
          })
        }
      </List>
    </>
  );
};

export default SearchForm;
