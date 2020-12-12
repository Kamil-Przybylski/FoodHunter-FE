import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@core/store';
import { layoutRouterSetPreviousPageAction } from '@core/store/core/layout/layout.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  constructor(private store: Store<AppState>, private platform: Platform, private router: Router) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(layoutRouterSetPreviousPageAction({ payload: { url: event.url } }));
      }
    });
  }
}
