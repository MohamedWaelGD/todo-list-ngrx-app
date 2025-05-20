import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { TodoApiActions, TodoPageActions } from './todo.actions';
import { TodoService } from '../../../../core/services/todo.service';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  loadTodoItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoPageActions.loadTodoItems),
      switchMap(() =>
        this.todoService.getAll().pipe(
          map((todoItems) =>
            TodoApiActions.loadTodoItemsSuccess({ todoItems })
          ),
          catchError((error) =>
            of(TodoApiActions.loadTodoItemsFailure({ error }))
          )
        )
      )
    )
  );

  insertTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoPageActions.insertTodoItem),
      exhaustMap(({ title }) =>
        this.todoService.create({ title }).pipe(
          map((todoItem) => TodoApiActions.insertTodoItemSuccess({ todoItem })),
          catchError((error) =>
            of(TodoApiActions.insertTodoItemFailure({ error }))
          )
        )
      )
    )
  );

  updateTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoPageActions.updateTodoItem),
      exhaustMap(({ id, title }) =>
        this.todoService.update(id, { title, isCompleted: false }).pipe(
          map((todoItem) => TodoApiActions.updateTodoItemSuccess({ todoItem })),
          catchError((error) =>
            of(TodoApiActions.updateTodoItemFailure({ error }))
          )
        )
      )
    )
  );

  toggleTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoPageActions.toggleTodoItem),
      exhaustMap(({ id, isCompleted }) =>
        this.todoService.toggle(id, isCompleted).pipe(
          map((todoItem) => TodoApiActions.toggleTodoItemSuccess({ todoItem })),
          catchError((error) =>
            of(TodoApiActions.toggleTodoItemFailure({ error }))
          )
        )
      )
    )
  );

  deleteTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoPageActions.deleteTodoItem),
      exhaustMap(({ id }) =>
        this.todoService.delete(id).pipe(
          map(() => TodoApiActions.deleteTodoItemSuccess({ id })),
          catchError((error) =>
            of(TodoApiActions.deleteTodoItemFailure({ error }))
          )
        )
      )
    )
  );
}
