import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

export class HttpUtil {
  static toFormData(formValue: {[key: string]: any}) {
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

  static setPaginator(paginator: HttpPaginatorMeta): HttpPaginatorMeta {
    const newPaginator = _.cloneDeep(paginator);

    if (paginator.totalPages === paginator.currentPage) newPaginator.isLastPage = true;
    else newPaginator.isLastPage = false;
    if (paginator.totalItems === paginator.itemCount) newPaginator.isLastForInfiniteScroll = true;
    else newPaginator.isLastForInfiniteScroll = false;

    return newPaginator;
  }
}
