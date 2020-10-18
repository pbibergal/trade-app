import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { TradeEventsState } from '../_ngxs/states/trade-events.state';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TradeEvent } from '../interfaces/trade-event';
import { filter, takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PlayerAction, Status } from '../status';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main-events',
  templateUrl: './main-events.component.html',
  styleUrls: ['./main-events.component.scss'],
})
export class MainEventsComponent implements OnInit, OnDestroy {
  events$: BehaviorSubject<TradeEvent[]> = new BehaviorSubject([]);
  @Select(TradeEventsState.getStatuses) statuses$: Observable<string[]>;
  @Input() currentEventId;
  @Input() isPlaying = false;

  displayedColumns: string[] = ['timestamp', 'price', 'status'];
  dataSource: MatTableDataSource<TradeEvent>;
  currentPos;

  @Output() rowSelect: EventEmitter<TradeEvent> = new EventEmitter<TradeEvent>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  currentStatus = Status.ALL;
  playerStatus = PlayerAction;
  playerIsPlaying = false;

  private destroy: Subject<void> = new Subject<void>();

  constructor(private store: Store, private dataService: DataService) {
    this.events$
      .pipe(
        takeUntil(this.destroy),
        filter(v => v.length > 0),
      )
      .subscribe(v => {
        this.dataSource = new MatTableDataSource(v);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.store.select(TradeEventsState.getEventsByStatus(this.currentStatus))
      .pipe(
        takeUntil(this.destroy),
        filter((v: TradeEvent[]) => v.length > 0),
      )
      .subscribe((s: TradeEvent[]) => {
        this.events$.next(s);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onRowClick(row: TradeEvent): void {
    this.rowSelect.emit(row);
    this.currentPos = row.id;
  }

  onSelectChange(status): void {
    this.currentStatus = status;
    this.getEvents();
  }

  playerButtonClick(status): void {
    this.dataService.playerAction.next(status);
  }
}
