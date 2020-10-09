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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTabsModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    FormErrorsComponent,
    LoadingButtonComponent,
    ImagePickerComponent,
    ToolbarComponent,
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
    ToolbarComponent,
    DisableControlDirective,
    AuthImagePipePipe,
  ],
})
export class SharedModule {}
