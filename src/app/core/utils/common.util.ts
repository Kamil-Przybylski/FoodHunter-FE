import { ActivatedRoute } from '@angular/router';
import { AppRoutesEnum } from 'src/app/app.routes';
import * as _ from 'lodash';

export class CommonUtil {
  static getUrlProp(route: ActivatedRoute, idCode: AppRoutesEnum): number {
    const idUrl: string | null = route.snapshot.paramMap.get(idCode);
    let id: number;

    if (_.isString(idUrl)) id = +idUrl;
    else id = -1;

    return id;
  }
}
