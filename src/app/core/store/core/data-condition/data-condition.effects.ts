import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, switchMap, mergeMap, catchError } from 'rxjs/operators';
import * as dataCondtitionActions from './data-condition.actions';
import * as entitiesActions from '../entities/entities.actions';
import * as _ from 'lodash';
import { NotifierService } from '@shared/services/notifier.service';
import { EntitiesStateComponents, EntitiesEnum } from '../entities/entities.models';
import { of } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';

@Injectable()
export class DataConditionEffects {
  download$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataCondtitionActions.downloadAction()),
      mergeMap(({ key, dataId, requestObservable, nextActions = [] }) =>
        requestObservable.pipe(
          mergeMap((res) => {
            if (_.isArray(res)) {
              const ids = this.getIds(res);
              return [
                entitiesActions.upsertManyAction()({ key, entities: res }),
                dataCondtitionActions.downloadSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  loadData: null,
                }),
                ...nextActions,
              ];
            } else {
              const ids = this.getIds(res.entities);
              return [
                entitiesActions.upsertManyAction()({
                  key,
                  entities: res.entities,
                }),
                dataCondtitionActions.downloadSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  loadData: res.loadData,
                }),
                ...nextActions,
              ];
            }
          }),
          catchError((err: HttpErrorResDto) =>
            of(
              dataCondtitionActions.downloadFailAction()({
                key,
                error: {
                  error: err.error,
                  message: err.message,
                  statusCode: err.statusCode,
                },
                dataId,
              })
            )
          )
        )
      )
    )
  );

  switchDownload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataCondtitionActions.switchDownloadAction()),
      switchMap(({ key, dataId, requestObservable, nextActions = [] }) =>
        requestObservable.pipe(
          mergeMap((res) => {
            if (_.isArray(res)) {
              const ids = this.getIds(res);
              return [
                entitiesActions.upsertManyAction()({ key, entities: res }),
                dataCondtitionActions.downloadSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  loadData: null,
                }),
                ...nextActions,
              ];
            } else {
              const ids = this.getIds(res.entities);
              return [
                entitiesActions.upsertManyAction()({
                  key,
                  entities: res.entities,
                }),
                dataCondtitionActions.downloadSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  loadData: res.loadData,
                }),
                ...nextActions,
              ];
            }
          }),
          catchError((err: HttpErrorResDto) =>
            of(
              dataCondtitionActions.downloadFailAction()({
                key,
                error: {
                  error: err.error,
                  message: err.message,
                  statusCode: err.statusCode,
                },
                dataId,
              })
            )
          )
        )
      )
    )
  );

  downloadFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataCondtitionActions.downloadFailAction()),
        tap(({ error }) => this.notifierService.snackBarError(error.message))
      ),
    { dispatch: false }
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataCondtitionActions.saveAction()),
      mergeMap(({ key, dataId, requestObservable, nextActions = [] }) => {
        return requestObservable.pipe(
          mergeMap((res) => {
            if (_.isArray(res)) {
              const ids = this.getIds(res);
              return [
                entitiesActions.upsertManyAction()({ key, entities: res }),
                dataCondtitionActions.saveSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  sendData: null,
                }),
                ...nextActions,
              ];
            } else if (_.isObject(res)) {
              const ids = this.getIds(res.entities);
              return [
                entitiesActions.upsertManyAction()({
                  key,
                  entities: res.entities,
                }),
                dataCondtitionActions.saveSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  sendData: res.sendData,
                }),
                ...nextActions,
              ];
            } else {
              return [
                dataCondtitionActions.saveSuccessAction()({
                  key,
                  dataId,
                  entityIds: [],
                  sendData: null,
                }),
                ...nextActions,
              ];
            }
          }),
          catchError((err: HttpErrorResDto) =>
            of(
              dataCondtitionActions.saveFailAction()({
                key,
                dataId,
                error: {
                  error: err.error,
                  message: err.message,
                  statusCode: err.statusCode,
                },
              })
            )
          )
        );
      })
    )
  );

  saveSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataCondtitionActions.saveSuccessAction()),
        tap(() => this.notifierService.snackBarSuccess())
      ),
    { dispatch: false }
  );

  saveFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataCondtitionActions.saveFailAction()),
        tap(({ error }) => this.notifierService.snackBarError(error.message))
      ),
    { dispatch: false }
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataCondtitionActions.deleteAction()),
      mergeMap(({ key, dataId, requestObservable, nextActions = [] }) => {
        return requestObservable.pipe(
          mergeMap((res) => {
            if (_.isArray(res)) {
              const ids = this.getIds(res);

              return [
                entitiesActions.upsertManyAction()({ key, entities: res }),
                dataCondtitionActions.deleteSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  sendData: null,
                }),
                ...nextActions,
              ];
            } else if (_.isObject(res)) {
              const ids = this.getIds(res.entities);
              return [
                entitiesActions.upsertManyAction()({
                  key,
                  entities: res.entities,
                }),
                dataCondtitionActions.deleteSuccessAction()({
                  key,
                  dataId,
                  entityIds: ids,
                  sendData: res.sendData,
                }),
                ...nextActions,
              ];
            } else {
              return [
                dataCondtitionActions.deleteSuccessAction()({
                  key,
                  dataId,
                  entityIds: [],
                  sendData: null,
                }),
                ...nextActions,
              ];
            }
          }),
          catchError((err: HttpErrorResDto) =>
            of(
              dataCondtitionActions.deleteFailAction()({
                key,
                dataId,
                error: {
                  error: err.error,
                  message: err.message,
                  statusCode: err.statusCode,
                },
              })
            )
          )
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataCondtitionActions.deleteSuccessAction()),
        tap(() => this.notifierService.snackBarSuccess())
      ),
    { dispatch: false }
  );

  deleteFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataCondtitionActions.deleteFailAction()),
        tap(({ error }) => this.notifierService.snackBarError(error.message))
      ),
    { dispatch: false }
  );

  private getIds(entities: EntitiesStateComponents[EntitiesEnum][]): number[] {
    if (!_.isArray(entities)) return [];
    const ids = _.map(entities, (entity) => entity.id);
    const hasIds = _.filter(ids, (id) => !id && id !== 0);
    return !hasIds.length ? ids : [];
  }

  constructor(private actions$: Actions, private notifierService: NotifierService) {}
}
