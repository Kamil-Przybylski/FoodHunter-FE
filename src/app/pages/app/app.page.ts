import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage implements OnInit {
  @ViewChild('tabs') tabs: IonTabs;
  
  AppRoutesEnum = AppRoutesEnum;
  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  async openTab(tab: string, evt: MouseEvent) {
    const tabSelected = this.tabs.getSelected();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    return tabSelected !== tab
      ? await this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
      : this.tabs.select(tab);
  }

}
