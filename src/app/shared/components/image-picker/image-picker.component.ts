import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  @Input() showPreview = true;

  selectedImage: string;
  usePicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    console.log(666.3);

    Plugins.Camera.getPhoto({
      quality: 95,
      source: CameraSource.Prompt,
      allowEditing: false,
      width: 720,
      height: 720,
      resultType: CameraResultType.DataUrl,
    })
      .then((image) => {
        console.log(666.4);

        this.selectedImage = image.dataUrl;
        this.imagePick.emit(image.dataUrl);
      })
      .catch((error) => {
        console.log(666.5);

        if (this.usePicker) {
          // this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    console.log(666.6);

    const fr = new FileReader();
    fr.onload = () => {
      console.log(666.7);

      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(dataUrl);
    };
    fr.readAsDataURL(pickedFile);
  }
}
