import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';
import { environment } from 'src/environments/environment';
import { ManufacturingEffects } from './manufacturing/store/manufacturing.effects';
import { MoneyComponent } from './header/money/money.component';
import { MoneyEffects } from './header/money/store/money.effects';
import { AppEffects } from './store/app.effects';
import { StockEffects } from './stock/store/stock.effects';
import { RetailEffects } from './retail/store/retail.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      ManufacturingEffects,
      MoneyEffects,
      AppEffects,
      StockEffects,
      RetailEffects
    ]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
