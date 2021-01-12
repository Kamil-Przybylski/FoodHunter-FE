import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogsListPageRoutingModule } from './catalogs-list-routing.module';

import { CatalogsListPage } from './catalogs-list.page';
import { SharedModule } from '@shared/shared.module';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogsListPageRoutingModule,
    SharedModule
  ],
  declarations: [CatalogsListPage, CatalogListComponent]
})
export class CatalogsListPageModule {}
