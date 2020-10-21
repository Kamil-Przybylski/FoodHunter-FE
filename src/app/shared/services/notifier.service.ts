import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MessageEnum } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private toastController: ToastController) { }

  private async openSnackBar(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  snackBarSuccess(message?: string) {
    this.openSnackBar(message || MessageEnum.SUCCESS, 'success');
  }

  snackBarError(message?: string) {
    this.openSnackBar(message || MessageEnum.FAIL, 'warning');
  }

  snackBarMessage(message: string) {
    this.openSnackBar(message);
  }
}
