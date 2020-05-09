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

const MATERIAL_MODULES = [MatFormFieldModule, MatInputModule, MatSelectModule];

@NgModule({
  declarations: [
    FormErrorsComponent,
    LoadingButtonComponent,
    DisableControlDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, MATERIAL_MODULES],
  exports: [
    ReactiveFormsModule,
    MATERIAL_MODULES,
    FormErrorsComponent,
    LoadingButtonComponent,
    DisableControlDirective,
  ],
})
export class SharedModule {}
