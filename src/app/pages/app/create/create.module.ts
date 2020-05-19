import { FoodPhotoComponent } from './components/food-photo/food-photo.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { FoodFormComponent } from './components/food-form/food-form.component';
import { FoodContainerComponent } from './components/food-container/food-container.component';
import { FoodMapComponent } from './components/food-map/food-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBlFsjRrmUFoZ54WwR9JvIpxR842EF2qy4',
      libraries: ['places'],
    }),
  ],
  declarations: [
    CreatePage,
    FoodFormComponent,
    FoodContainerComponent,
    FoodMapComponent,
    FoodPhotoComponent
  ],
})
export class CreatePageModule {}
