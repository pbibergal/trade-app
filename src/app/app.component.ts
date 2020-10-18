import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetEvents } from './_ngxs/actions/trade-events.action';
import { TradeEvent } from './interfaces/trade-event';
import { Router } from '@angular/router';
import { TradeEventsState } from './_ngxs/states/trade-events.state';
import { filter } from 'rxjs/operators';
import { DataService } from './services/data.service';
import { PlayerAction } from './status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isPlayerPlaying = false;
  currentEventId = 0;
  private interval;

  constructor(
    private store: Store,
    private router: Router,
    private dataService: DataService,
  ) {
    this.store.select(TradeEventsState.getEventsByStatus('ALL'))
      .pipe(
        filter((t: TradeEvent[]) => t.length > 0),
      )
      .subscribe(t => this.currentEventId = t[0].id);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetEvents());
    this.dataService.playerAction
      .pipe(
        filter(p => p.length > 0),
      )
      .subscribe(async (p) => {
        const state: TradeEvent[] = this.store.selectSnapshot(TradeEventsState.getEventsByStatus('ALL'));
        switch (p) {
          case PlayerAction.NEXT:
            if (state.length > this.currentEventId + 1) {
              this.currentEventId++;
            }
            break;
          case PlayerAction.PREV:
            if (this.currentEventId !== 0) {
              this.currentEventId--;
            }
            break;
          case PlayerAction.FIRST:
            this.currentEventId = 0;
            break;
          case PlayerAction.LAST:
            const lastEvent = state[state.length - 1];
            this.currentEventId = lastEvent.id;
            break;
          case PlayerAction.PLAY:
            this.togglePlayer();
            break;
        }

        await this.setActiveEvent(this.currentEventId);
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  /**
   * Toggle player that runs on rows on and off
   */
  togglePlayer(): void {
    if (!this.isPlayerPlaying) {
      this.interval = setInterval(async () => {
        this.currentEventId++;
        await this.setActiveEvent(this.currentEventId);
      }, 1000);

      this.isPlayerPlaying = true;
    }
    else {
      clearInterval(this.interval);
      this.isPlayerPlaying = false;
    }
  }

  /**
   * Method that runs on table row select
   * @param row the TradeEvent object
   */
  async onRowSelect(row: TradeEvent): Promise<void> {
    this.currentEventId = row.id;
    await this.setActiveEvent(row.id);
  }

  async setActiveEvent(eventId: number): Promise<void> {
    await this.router.navigate(['/active-event/' + eventId]);
  }
}
