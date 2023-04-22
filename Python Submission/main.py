from fastapi import FastAPI
from typing import List
from mockData import trades
from dbSchema import Trade
from fastapi import FastAPI
from fastapi import Query as Q
from pydantic import BaseModel, Field
from elasticsearch import Elasticsearch as es
from datetime import datetime

app = FastAPI()


# Schema models
class TradeDetails(BaseModel):
    buySellIndicator: str = Field(description="A value of BUY for buys, SELL for sells.")
    price: float = Field(description="The price of the Trade.")
    quantity: int = Field(description="The amount of units traded.")


class Trade(BaseModel):
    assetClass: str = Field(default=None, description="The asset class of the instrument traded. E.g. Bond, Equity, FX...etc")
    counterparty: str = Field(default=None, description="The counterparty the trade was executed with. May not always be available")
    instrumentId: str = Field(description="The ISIN/ID of the instrument traded. E.g. TSLA, AAPL, AMZN...etc")
    instrumentName: str = Field(description="The name of the instrument traded.")
    tradeDateTime: datetime = Field(description="The date-time the Trade was executed")
    tradeDetails: TradeDetails = Field(description="The details of the trade, i.e. price, quantity")
    tradeId: str = Field(default=None, description="The unique ID of the trade")
    trader: str = Field(description="The name of the Trader")


# API endpoints
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/trades", response_model=List[Trade])
async def get_trades():
    return trades

@app.get("/trades/{trade_id}", response_model=Trade)
async def get_trade_by_id(trade_id: str):
    for trade in trades:
        if trade["tradeId"] == trade_id:
            return trade
    return {"detail": "Trade not found"}


