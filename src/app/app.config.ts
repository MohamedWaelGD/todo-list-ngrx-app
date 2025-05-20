import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { TodoEffects } from './features/todo-list/store/todo/todo.effects';
import { todoFeature } from './features/todo-list/store/todo/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(todoFeature),
    provideEffects(),
    provideEffects([TodoEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
