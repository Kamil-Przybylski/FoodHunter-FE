import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/store';
import { discoverListDownloadFoodAction } from '@core/store/discover/discover-list/discover-list.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.downloadData();
  }

  downloadData() {
    this.store.dispatch(discoverListDownloadFoodAction({ payload: { pageNo: 1 } }));
  }

}
