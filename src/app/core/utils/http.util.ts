import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

export class HttpUtil {
  static toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  static getImgUrl(path: string): string {
    return `${environment.apiUrl}/${path}`;
  }
}
