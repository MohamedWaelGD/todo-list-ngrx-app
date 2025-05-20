import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TodoItem } from '../../../../core/models/todo-item.model';

export const TodoPageActions = createActionGroup({
  source: 'Todo Page',
  events: {
    loadTodoItems: emptyProps(),
    insertTodoItem: props<{ title: string }>(),
    updateTodoItem: props<{ id: string; title: string }>(),
    toggleTodoItem: props<{ id: string; isCompleted: boolean }>(),
    deleteTodoItem: props<{ id: string }>(),
  },
});

export const TodoApiActions = createActionGroup({
  source: 'Todo Api',
  events: {
    loadTodoItemsSuccess: props<{ todoItems: TodoItem[] }>(),
    loadTodoItemsFailure: props<{ error: string }>(),
    insertTodoItemSuccess: props<{ todoItem: TodoItem }>(),
    insertTodoItemFailure: props<{ error: string }>(),
    updateTodoItemSuccess: props<{ todoItem: TodoItem }>(),
    updateTodoItemFailure: props<{ error: string }>(),
    toggleTodoItemSuccess: props<{ todoItem: TodoItem }>(),
    toggleTodoItemFailure: props<{ error: string }>(),
    deleteTodoItemSuccess: props<{ id: string }>(),
    deleteTodoItemFailure: props<{ error: string }>(),
  },
});
