import { createSelector } from '@ngrx/store';
import { getDataCondition } from '@core/store/core/data-condition/data-condition.selectors';
import { getEntitiesSelectAll } from '@core/store/core/entities/entities.selectors';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { getFoodModuleState } from '../food.reducer';

export const getFoodCreateState = createSelector(
  getFoodModuleState,
  foodState => foodState.foodCreate
);

export const getFoodCreateAllFoodTypes = createSelector(
  getEntitiesSelectAll(EntitiesEnum.FOOD_TYPE),
  all => all
);

export const getFoodCreateAllFoodTags = createSelector(
  getEntitiesSelectAll(EntitiesEnum.FOOD_TAG),
  all => all
);

export const getFoodCreateConditionIsSending = createSelector(
  getDataCondition(EntitiesEnum.FOOD, 0),
  state => state ? state.isSending : false
);

export const getFoodCreateConditionSendErrors = createSelector(
  getDataCondition(EntitiesEnum.FOOD, 0),
  state => state ? state.sendErrors : null
);

export const getFoodCreateCreateIsSubmitted = createSelector(
  getFoodCreateState,
  state => state.mapDraft && state.isSubmitted
);

export const getFoodCreateIsMapValid = createSelector(
  getFoodCreateState,
  state => state.mapDraft && state.mapDraft.isValid
);
export const getFoodCreateIsCameraValid = createSelector(
  getFoodCreateState,
  state => state.cameraDraft && state.cameraDraft.isValid
);
export const getFoodCreateIsFormValid = createSelector(
  getFoodCreateState,
  state => state.foodDraft && state.foodDraft.isValid
);
