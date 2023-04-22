const express = require("express");
const Data = require("./mockedData");
const url = require("url");
// const jsf = require("json-schema-faker");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Listing All the trades and filtering content too
app.get("/trades", async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const {
    assetClass,
    tradeType,
    minPrice,
    maxPrice,
    start,
    end,
    counterparty,
    instrumentId,
    instrumentName,
    trader,
    page,
    limit,
    sort,
  } = query;

  let filteredTrades = Data.filter((trade) => {
    // if (query.assetClass && trade.asset_class !== query.assetClass) {
    //     return false;
    //   }

    //   if (query.tradeType && trade.trade_details.buySellIndicator !== query.tradeType) {
    //     return false;
    //   }

    //   if (query.minPrice && trade.trade_details.price < query.minPrice) {
    //     return false;
    //   }

    //   if (query.maxPrice && trade.trade_details.price > query.maxPrice) {
    //     return false;
    //   }

    //   if (query.start && new Date(trade.trade_date_time) < new Date(query.start)) {
    //     return false;
    //   }

    //   if (query.end && new Date(trade.trade_date_time) > new Date(query.end)) {
    //     return false;
    //   }

    //   if (query.counterparty && trade.counterparty !== query.counterparty) {
    //     return false;
    //   }

    //   if (query.instrumentId && trade.instrument_id !== query.instrumentId) {
    //     return false;
    //   }

    //   if (query.instrumentName && trade.instrument_name !== query.instrumentName) {
    //     return false;
    //   }

    //   if (query.trader && trade.trader !== query.trader) {
    //     return false;
    //   }

    //   return true;

    return (
      (!assetClass || trade.assetClass === assetClass) &&
      (!tradeType || trade.trade_details.buySellIndicator === tradeType) &&
      (!minPrice || trade.trade_details.price >= minPrice) &&
      (!maxPrice || trade.trade_details.price <= maxPrice) &&
      (!start || new Date(trade.trade_date_time) >= new Date(start)) &&
      (!end || new Date(trade.trade_date_time) <= new Date(end)) &&
      (!counterparty || trade.counterparty === counterparty) &&
      (!instrumentId || trade.instrument_id === instrumentId) &&
      (!instrumentName || trade.instrument_name === instrumentName) &&
      (!trader || trade.trader === trader)
    );
  });

  if (sort) {
    filteredTrades = filteredTrades.sort(
      (a, b) => a.trade_details.price - b.trade_details.price
    );
  }

  if (limit > 0) {
    filteredTrades = filteredTrades.slice(0, limit);
  }

  res.json(filteredTrades);
});

// Listing single trade with trade id
app.get("/trades/:trade_id", async (req, res) => {
  Data.forEach((trade) => {
    if (trade["trade_id"] === req.params.trade_id) {
      res.status(200);
      res.json(trade);
    }
  });
  res.status(404);
  res.send("Trade Not Found");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Listening at port", PORT));
