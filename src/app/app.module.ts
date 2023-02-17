import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  COUNTRY_API_BASE,
  FLAG_API_BASE,
  MOVIE_API_BASE,
  MOVIE_SEARCH_API_BASE,
} from './tokens';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ActorNamesPipe } from './actor-names.pipe';

@NgModule({
  declarations: [AppComponent, ActorNamesPipe],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
  ],
  providers: [
    {
      provide: MOVIE_SEARCH_API_BASE,
      useValue: environment.movieSearchApiBase,
    },
    {
      provide: MOVIE_API_BASE,
      useValue: environment.movieApiBase,
    },
    {
      provide: COUNTRY_API_BASE,
      useValue: environment.countryApiBase,
    },
    {
      provide: FLAG_API_BASE,
      useValue: environment.flagApiBase,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
