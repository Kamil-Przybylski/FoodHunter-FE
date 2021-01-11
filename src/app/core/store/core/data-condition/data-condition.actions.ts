import { EntitiesStateComponents } from './../entities/entities.models';
import { createAction, Action, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';

export const downloadAction = <T extends keyof EntitiesStateComponents, P>() =>
  createAction(
    '[Data Condition] Download',
    props<{
      key: T;
      dataId: number;
      requestObservable: Observable<
        | EntitiesStateComponents[T][]
        | { entities: EntitiesStateComponents[T][]; loadData: P }
      >;
      nextActions?: Action[];
    }>()
  );

export const switchDownloadAction = <
  T extends keyof EntitiesStateComponents,
  P
>() =>
  createAction(
    '[Data Condition] Switch Download',
    props<{
      key: T;
      dataId: number;
      requestObservable: Observable<
        | EntitiesStateComponents[T][]
        | { entities: EntitiesStateComponents[T][]; loadData: P }
      >;
      nextActions?: Action[];
    }>()
  );
export const downloadSuccessAction = <
  T extends keyof EntitiesStateComponents,
  P
>() =>
  createAction(
    '[Data Condition] Download Success',
    props<{
      key: T;
      dataId: number;
      entityIds: number[];
      loadData: P;
    }>()
  );
export const downloadFailAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Data Condition] Download Fail',
    props<{
      key: T;
      dataId: number;
      error: HttpErrorResDto;
    }>()
  );

export const saveAction = <T extends keyof EntitiesStateComponents, P>() =>
  createAction(
    '[Data Condition] Save',
    props<{
      key: T;
      dataId: number;
      requestObservable: Observable<
        | EntitiesStateComponents[T][]
        | { entities: EntitiesStateComponents[T][]; sendData: P }
      >;
      nextActions?: Action[];
    }>()
  );
export const saveSuccessAction = <
  T extends keyof EntitiesStateComponents,
  P
>() =>
  createAction(
    '[Data Condition] Save Success',
    props<{
      key: T;
      dataId: number;
      entityIds: number[];
      sendData: P;
    }>()
  );
export const saveFailAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Data Condition] Save Fail',
    props<{
      key: T;
      dataId: number;
      error: HttpErrorResDto;
    }>()
  );

export const clearAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Data Condition] Clear',
    props<{
      key: T;
      dataId: number;
    }>()
  );
