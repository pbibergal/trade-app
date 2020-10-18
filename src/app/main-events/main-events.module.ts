import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainEventsComponent } from './main-events.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [MainEventsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRippleModule,
  ],
  exports: [MainEventsComponent],
})
export class MainEventsModule {
}

