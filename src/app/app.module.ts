import { AuthEffects } from '@store/core/auth/auth.effects';
import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AppInitialProvider,
  appInitialProviderFactory,
} from './app-initial.provider';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { AppState, reducers } from '@core/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { FoodEffects } from '@core/store/food/food-create/food-create.effects';
import { DataConditionEffects } from '@core/store/core/data-condition/data-condition.effects';
import { DiscoverListEffects } from '@core/store/discover/discover-list/discover-list.effects';
import { CommentEffects } from '@core/store/comment/comment.effects';
import { AccountUserEffects } from '@core/store/account/account-user/account-user.effects';

const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CoreModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,

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
      DataConditionEffects,
      
      AuthEffects,
      FoodEffects,
      DiscoverListEffects,
      CommentEffects,
      AccountUserEffects
    ]),
    // StoreRouterConnectingModule.forRoot({
    //   routerState: RouterState.Minimal
    // }),
    StoreDevtoolsModule.instrument({
      maxAge: 500,
      logOnly: environment.production
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: REDUCER_TOKEN, useValue: reducers },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

    AppInitialProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialProviderFactory,
      deps: [AppInitialProvider],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
