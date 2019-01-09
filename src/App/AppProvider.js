import React, { Component } from "react";
import cryptoCompare from "cryptocompare";
import _ from "lodash";
export const AppContext = React.createContext();

const MAX_FAVOURITES = 10;

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "dashboard",
      favourites: ["BTC", "ETH", "XRP", "EOS", "DOGE"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      confirmFavourites: this.confirmFavourites,
      removeCoin: this.removeCoin,
      isCoinInFavourites: this.isCoinInFavourites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
  };

  addCoin = key => {
    let favourites = [...this.state.favourites];
    if (favourites.length < MAX_FAVOURITES) {
      favourites.push(key);
      this.setState({ favourites });
    }
  };

  removeCoin = key => {
    const favourites = [...this.state.favourites];
    this.setState({ favourites: _.pull(favourites, key) });
  };

  isCoinInFavourites = key => _.includes(this.state.favourites, key);

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favourites.length; i++) {
      try {
        let priceData = await cryptoCompare.priceFull(
          this.state.favourites[i],
          "AUD"
        );
        returnData.push(priceData);
      } catch (e) {
        console.warn(`Fetch price error: ${e}`);
      }
    }

    return returnData;
  };

  fetchCoins = async () => {
    let coinList = (await cryptoCompare.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) {
      return;
    }

    let prices = await this.prices();
    this.setState({ prices });
  };

  confirmFavourites = () => {
    let currentFavourite = this.state.favourites[0];

    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavourite
      },
      () => {
        this.fetchPrices();
      }
    );

    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favourites: this.state.favourites,
        currentFavourite
      })
    );
  };

  savedSettings = () => {
    let cryptoDashData = localStorage.getItem("cryptoDash");

    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }

    let { favourites, currentFavourite } = JSON.parse(cryptoDashData);
    return { favourites, currentFavourite };
  };

  setCurrentFavourite = sym => {
    let updatedCurrentFavourite = JSON.stringify({
      ...JSON.parse(localStorage.getItem("cryptoDash")),
      currentFavourite: sym
    });

    this.setState({
      currentFavourite: sym
    });

    localStorage.setItem("cryptoDash", updatedCurrentFavourite);
  };

  setPage = pageName => this.setState({ page: pageName });

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
