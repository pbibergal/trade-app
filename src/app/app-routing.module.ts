import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveEventBoxComponent } from './active-event-box/active-event-box.component';

const routes: Routes = [
  { path: 'active-event/:id', component: ActiveEventBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
