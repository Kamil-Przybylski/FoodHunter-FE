import { createSelector } from '@ngrx/store';
import { getFoodModuleState } from './food.reducer';
import { getDataCondition } from '../core/data-condition/data-condition.selectors';
import { getEntitiesSelectAll } from '../core/entities/entities.selectors';
import { EntitiesEnum } from '../core/entities/entities.models';

export const getFoodState = createSelector(
  getFoodModuleState,
  foodState => foodState
);

export const getFoodAllFoodTypes = createSelector(
  getEntitiesSelectAll(EntitiesEnum.FOOD_TYPE),
  all => all
);

export const getFoodAllFoodTags = createSelector(
  getEntitiesSelectAll(EntitiesEnum.FOOD_TAG),
  all => all
);

export const getFoodConditionIsSending = createSelector(
  getDataCondition(EntitiesEnum.FOOD, 0),
  state => state ? state.isSending : false
);

export const getFoodConditionSendErrors = createSelector(
  getDataCondition(EntitiesEnum.FOOD, 0),
  state => state ? state.sendErrors : null
);

export const getFoodIsSubmitted = createSelector(
  getFoodModuleState,
  state => state.mapDraft && state.isSubmitted
);

export const getFoodIsMapValid = createSelector(
  getFoodModuleState,
  state => state.mapDraft && state.mapDraft.isValid
);
export const getFoodIsCameraValid = createSelector(
  getFoodModuleState,
  state => state.cameraDraft && state.cameraDraft.isValid
);
export const getFoodIsFormValid = createSelector(
  getFoodModuleState,
  state => state.foodDraft && state.foodDraft.isValid
);
