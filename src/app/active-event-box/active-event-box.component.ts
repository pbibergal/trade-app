import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { TradeEventsState } from '../_ngxs/states/trade-events.state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TradeEvent } from '../interfaces/trade-event';

@Component({
  selector: 'app-active-event-box',
  templateUrl: './active-event-box.component.html',
  styleUrls: ['./active-event-box.component.scss'],
})
export class ActiveEventBoxComponent implements OnInit, OnDestroy {
  event: TradeEvent;

  private destroy: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy))
      .subscribe(async (params) => {
        const id = +params.get('id');
        this.store.select(TradeEventsState.getEvent(id)).subscribe(s => {
          this.event = s[0];
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
