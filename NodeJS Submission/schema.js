const mongoose = require("mongoose");

const tradeDetailsSchema = new mongoose.Schema({
  buySellIndicator: {
    type: String,
    required: true,
    description: "A value of BUY for buys, SELL for sells.",
  },
  price: {
    type: Number,
    required: true,
    description: "The price of the Trade.",
  },
  quantity: {
    type: Number,
    required: true,
    description: "The amount of units traded.",
  },
});

const tradeSchema = new mongoose.Schema({
  asset_class: {
    type: String,
    alias: "assetClass",
    default: null,
    description:
      "The asset class of the instrument traded. E.g. Bond, Equity, FX...etc",
  },
  counterparty: {
    type: String,
    default: null,
    description:
      "The counterparty the trade was executed with. May not always be available",
  },
  instrument_id: {
    type: String,
    alias: "instrumentId",
    required: true,
    description:
      "The ISIN/ID of the instrument traded. E.g. TSLA, AAPL, AMZN...etc",
  },
  instrument_name: {
    type: String,
    alias: "instrumentName",
    required: true,
    description: "The name of the instrument traded.",
  },
  trade_date_time: {
    type: Date,
    alias: "tradeDateTime",
    required: true,
    description: "The date-time the Trade was executed",
  },
  trade_details: {
    type: tradeDetailsSchema,
    alias: "tradeDetails",
    required: true,
    description: "The details of the trade, i.e. price, quantity",
  },
  trade_id: {
    type: String,
    alias: "tradeId",
    default: null,
    description: "The unique ID of the trade",
  },
  trader: {
    type: String,
    required: true,
    description: "The name of the Trader",
  },
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = {Trade, tradeSchema};
