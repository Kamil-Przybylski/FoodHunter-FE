import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { IonicModule } from '@ionic/angular';
import { DisableControlDirective } from './directives/disable-control.directive';
import { MatButtonModule } from '@angular/material/button';
import { AuthImagePipePipe } from './pipes/auth-image-pipe.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTabsModule,
];

@NgModule({
  declarations: [
    FormErrorsComponent,
    LoadingButtonComponent,
    ImagePickerComponent,
    DisableControlDirective,
    AuthImagePipePipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, MATERIAL_MODULES],
  exports: [
    ReactiveFormsModule,
    MATERIAL_MODULES,
    FormErrorsComponent,
    LoadingButtonComponent,
    ImagePickerComponent,
    DisableControlDirective,
    AuthImagePipePipe,
  ],
})
export class SharedModule {}
