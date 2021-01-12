import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogsDetailsPageRoutingModule } from './catalogs-details-routing.module';

import { CatalogsDetailsPage } from './catalogs-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogsDetailsPageRoutingModule
  ],
  declarations: [CatalogsDetailsPage]
})
export class CatalogsDetailsPageModule {}
