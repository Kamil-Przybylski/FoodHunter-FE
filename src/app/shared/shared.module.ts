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
import { MatTabsModule } from '@angular/material/tabs';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CommentsModalComponent } from './components/comments-modal/comments-modal.component';
import { DialogContainerComponent } from './components/dialog-container/dialog-container.component';
import {MatDividerModule} from '@angular/material/divider';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDividerModule
];

@NgModule({
  declarations: [
    FormErrorsComponent,
    LoadingButtonComponent,
    ImagePickerComponent,
    ToolbarComponent,
    DisableControlDirective,
    AuthImagePipePipe,
    CommentsModalComponent,
    DialogContainerComponent
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
    CommentsModalComponent,
    DialogContainerComponent,
  ],
  entryComponents: [CommentsModalComponent]
})
export class SharedModule {}
