import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombinedStatsComponent } from './combined-stats/combined-stats.component';
import { MoviesComponent } from './movies/movies.component';
import { MyListComponent } from './my-list/my-list.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'combinedStats',
    component: CombinedStatsComponent,
  },
  {
    path: 'myList',
    component: MyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
