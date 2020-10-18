import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TradeEvent } from '../interfaces/trade-event';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  playerAction: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }

  getData(): Promise<TradeEvent[]> {
    return this.http.get<TradeEvent[]>('assets/events.json')
      .pipe(
        /**
         * The array came from the server not indexed.
         * Needed to add id manually
         */
        map((ev: TradeEvent[]) => {
          ev.forEach((e, i) => e.id = i);
          return ev;
        }),
      )
      .toPromise();
  }
}
