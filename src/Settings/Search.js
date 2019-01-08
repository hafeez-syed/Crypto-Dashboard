import React from "react";
import styled from "styled-components";
import fuzzy from "fuzzy";
import _ from "lodash";
import { AppContext } from "../App/AppProvider";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SeatchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  color: #1163c9;
  height: 25px;
  place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
  // Get all the coin symbols
  let coinSymbols = Object.keys(coinList);

  // Get all the coin names
  let coinNames = coinSymbols.map(symbol => coinList[symbol].CoinName);

  // Concat coin symbols and names
  let allStringsToSearch = coinSymbols.concat(coinNames);

  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);

  let filteredCoins = _.pickBy(coinList, (result, symkey) => {
    let coinName = result.CoinName;

    return (
      _.includes(fuzzyResults, symkey) || _.includes(fuzzyResults, coinName)
    );
  });

  setFilteredCoins(filteredCoins);
}, 500);

const filteredCoins = (event, setFilteredCoins, coinList) => {
  let inputValue = event.target.value;

  if (!inputValue) {
    setFilteredCoins(null);
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
};

const Search = () => {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search all coins</h2>
          <SeatchInput
            onKeyUp={event => filteredCoins(event, setFilteredCoins, coinList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
};

export default Search;
