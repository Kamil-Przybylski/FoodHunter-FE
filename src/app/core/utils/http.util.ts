import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

export class HttpUtil {
  static toFormData(formValue: {[key: string]: unknown}) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value as any);
    }

    return formData;
  }

  static getImgUrl(path: string): string {
    return `${environment.apiUrl}/${path}`;
  }
}
