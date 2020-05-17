import { createFeatureSelector, createReducer } from '@ngrx/store';

export type FoodState = null;

export const foodReducer = createReducer(null);

export const getFoodModuleState = createFeatureSelector<FoodState>('food');
