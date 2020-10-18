import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { TradeEventsState } from '../_ngxs/states/trade-events.state';
import { TradeEvent } from '../interfaces/trade-event';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
})
export class OrderBookComponent implements OnInit, OnDestroy, OnChanges {
  @Input() eventId: number;
  ask;
  bid;
  destroy: Subject<void> = new Subject();
  isOpen = true;

  constructor(
    private store: Store,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.eventId) {
      this.store.select(TradeEventsState.getEvent(changes.eventId.currentValue))
        .pipe(
          takeUntil(this.destroy),
          filter((t: TradeEvent[]) => t.length > 0),
          map(t => t[0]),
        )
        .subscribe(event => {
          this.ask = event.snapshot.ASK;
          this.bid = event.snapshot.BID;
        });
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
