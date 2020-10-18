import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActiveEventBoxComponent } from './active-event-box/active-event-box.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TradeEventsState } from './_ngxs/states/trade-events.state';
import { MainEventsModule } from './main-events/main-events.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderBookComponent } from './order-book/order-book.component';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ActiveEventBoxComponent,
    OrderBookComponent,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    AppRoutingModule,
    NgxsModule.forRoot([TradeEventsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MainEventsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
