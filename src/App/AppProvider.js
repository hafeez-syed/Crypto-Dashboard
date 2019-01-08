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
      isCoinInFavourites: this.isCoinInFavourites
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
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

  fetchCoins = async () => {
    let coinList = (await cryptoCompare.coinList()).Data;
    this.setState({ coinList });
  };

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });

    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favourites: this.state.favourites
      })
    );
  };

  savedSettings = () => {
    let cryptoDashData = localStorage.getItem("cryptoDash");

    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }

    let { favourites } = JSON.parse(cryptoDashData);
    return { favourites };
  };

  setPage = pageName => this.setState({ page: pageName });
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
