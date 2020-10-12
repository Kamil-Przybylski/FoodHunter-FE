import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
})
export class DialogContainerComponent implements OnInit {
  @Input() tittle: string;
  @Input() description: string;
  @Input() userName: string;
  @Input() avatarPath: string;
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({dismissed: true});
  }

}
