export interface TradeEvent {
  timestamp: number;
  price: string;
  status: string;
  snapshot: {
    BID: string[];
    ASK: string[]
  };
  id?: number;
}
