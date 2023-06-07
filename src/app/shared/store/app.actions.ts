import { createAction, props } from '@ngrx/store';
import { Appstate } from './appstate';

export const setAPIStatus = createAction(
  '[API] Success or Failure Status',
  props<{ apiStatus: Appstate }>()
);
