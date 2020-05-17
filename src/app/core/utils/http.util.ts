import { ResFoodDto } from '@core/models/food.models';
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

  static getImgUrl(foods: ResFoodDto[], postfix: string) {
    return _.map(
      foods,
      (food) =>
        ({
          ...food,
          photoPath: `${environment.apiUrl}/${food.photoPath}`,
        } as ResFoodDto)
    );
  }
}
