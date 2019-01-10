import React, { Component } from "react";
import cryptoCompare from "cryptocompare";
import _ from "lodash";
import moment from "moment";
import { currency } from "../utils";
export const AppContext = React.createContext();

const MAX_FAVOURITES = 10;
const TIME_UNITS = 10;
class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "dashboard",
      favourites: ["BTC", "ETH", "XRP", "EOS", "XMR", "DOGE"],
      timeInterval: "months",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      confirmFavourites: this.confirmFavourites,
      removeCoin: this.removeCoin,
      isCoinInFavourites: this.isCoinInFavourites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite,
      changeChartInterval: this.changeChartInterval
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
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
          currency
        );
        returnData.push(priceData);
      } catch (e) {
        console.warn(`Fetch price error: ${e}`);
      }
    }

    return returnData;
  };

  historical = () => {
    let promises = [];

    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cryptoCompare.priceHistorical(
          this.state.currentFavourite,
          [currency],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }

    return Promise.all(promises);
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) {
      return;
    }

    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavourite,
        data: results.map((result, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          result[currency]
        ])
      }
    ];

    this.setState({ historical });
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
        currentFavourite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
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

    if (!cryptoDashData || _.isEmpty(cryptoDashData)) {
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

    this.setState(
      {
        currentFavourite: sym,
        historical: null
      },
      this.fetchHistorical
    );

    localStorage.setItem("cryptoDash", updatedCurrentFavourite);
  };

  setPage = pageName => this.setState({ page: pageName });

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  changeChartInterval = value => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
