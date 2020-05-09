import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import * as dataCondtitionActions from './data-condition.actions';
import * as _ from 'lodash';

@Injectable()
export class DataConditionEffects {

  download$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.downloadAction()),
  ));

  switchDownload$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.downloadAction()),
  ));

  downloadFail$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.downloadFailAction()),
    tap(({error}) => {
      // this.notifierService.snackBarError(error);
    })
  ), {dispatch: false});

  save$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.downloadAction()),
  ));

  saveUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.downloadAction()),
  ));

  saveSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.saveSuccessAction()),
    tap(() => {
      // this.notifierService.snackBarSuccess();
    })
  ), {dispatch: false});

  saveFail$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.saveFailAction()),
    tap(({error}) => {
      // this.notifierService.snackBarError(error);
    })
  ), {dispatch: false});

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.downloadAction()),
  ));

  deleteSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.deleteSuccessAction()),
    filter(({dataId}) => _.isNumber(dataId)),
    tap(() => {
      // this.notifierService.snackBarSuccess();
    })
  ), {dispatch: false});

  deleteFail$ = createEffect(() => this.actions$.pipe(
    ofType(dataCondtitionActions.deleteFailAction()),
    tap(({error}) => {
      // this.notifierService.snackBarError(error);
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    // private notifierService: NotifierService
  ) {}
}
