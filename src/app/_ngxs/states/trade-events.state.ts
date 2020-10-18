import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GetEvents } from '../actions/trade-events.action';
import { TradeEventModel } from '../models/trade-event.model';
import { DataService } from '../../services/data.service';
import { TradeEvent } from '../../interfaces/trade-event';
import { Status } from '../../status';

@State<TradeEventModel>({
  name: 'tradeEvents',
  defaults: {
    events: [],
  },
})

@Injectable()
export class TradeEventsState {
  constructor(private dataService: DataService) {
  }

  static getEvent(id: number): any {
    return createSelector([TradeEventsState], (state: TradeEventModel) => {
      return state.events.filter(s => s.id === id);
    });
  }

  static getEventsByStatus(status): any {
    return createSelector([TradeEventsState], (state: TradeEventModel) => {
      if (status === Status.ALL) {
        return state.events;
      }

      return state.events.filter(s => s.status === status);
    });
  }

  @Selector()
  static getStatuses(state): any {
    return ['ALL', ...new Set(state.events.map(d => d.status))];
  }

  @Action(GetEvents)
  async getEvents({ getState, setState }: StateContext<TradeEventModel>): Promise<void> {
    const data = await this.dataService.getData();

    const state = getState();
    setState({
      ...state,
      events: data,
    });
  }
}
