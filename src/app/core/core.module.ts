import { DataConditionEffects } from './store/core/data-condition/data-condition.effects';
import { environment } from './../../environments/environment.prod';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { reducers, AppState } from './store';
import { AuthEffects } from '@store/core/auth/auth.effects';
import { HttpClientModule } from '@angular/common/http';


const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    
    // store
    StoreModule.forRoot(REDUCER_TOKEN, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    EffectsModule.forRoot([
      AuthEffects,
    ]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 500,
      logOnly: environment.production
    }),
  ],
  providers: [
    { provide: REDUCER_TOKEN, useValue: reducers }
  ]
})
export class CoreModule { }
