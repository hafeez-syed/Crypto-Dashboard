import React, { Component } from "react";
import cryptoCompare from "cryptocompare";
export const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavourites: this.confirmFavourites
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

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
        test: "hello"
      })
    );
  };

  savedSettings = () => {
    let cryptoDash = localStorage.getItem("cryptoDash");

    if (!cryptoDash) {
      return { page: "settings", firstVisit: true };
    }

    return {};
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
