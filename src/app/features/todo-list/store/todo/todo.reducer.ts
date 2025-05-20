import { createFeature, createReducer, on } from '@ngrx/store';
import { TodoApiActions, TodoPageActions } from './todo.actions';
import { TodoItem } from '../../../../core/models/todo-item.model';

interface State {
  todoItems: TodoItem[];
  loading: boolean;
  error: string | null;
  selectedTodoItem: TodoItem | null;
}

const initialState: State = {
  todoItems: [],
  loading: false,
  error: null,
  selectedTodoItem: null,
};

export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    on(TodoPageActions.loadTodoItems, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoApiActions.loadTodoItemsSuccess, (state, { todoItems }) => ({
      ...state,
      loading: false,
      todoItems,
    })),
    on(TodoApiActions.loadTodoItemsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(TodoPageActions.insertTodoItem, (state, { title }) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoApiActions.insertTodoItemSuccess, (state, { todoItem }) => ({
      ...state,
      loading: false,
      todoItems: [...state.todoItems, todoItem],
    })),
    on(TodoApiActions.insertTodoItemFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(TodoPageActions.updateTodoItem, (state, { id, title }) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoApiActions.updateTodoItemSuccess, (state, { todoItem }) => ({
      ...state,
      loading: false,
      todoItems: state.todoItems.map((item) =>
        item.id === todoItem.id ? { ...item, title: todoItem.title } : item
      ),
    })),
    on(TodoApiActions.updateTodoItemFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(TodoPageActions.toggleTodoItem, (state, { id, isCompleted }) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoApiActions.toggleTodoItemSuccess, (state, { todoItem }) => ({
      ...state,
      loading: false,
      todoItems: state.todoItems.map((item) =>
        item.id === todoItem.id
          ? { ...item, isCompleted: todoItem.isCompleted }
          : item
      ),
    })),
    on(TodoApiActions.toggleTodoItemFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(TodoPageActions.deleteTodoItem, (state, { id }) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(TodoApiActions.deleteTodoItemSuccess, (state, { id }) => ({
      ...state,
      loading: false,
      todoItems: state.todoItems.filter((item) => item.id !== id),
    })),
    on(TodoApiActions.deleteTodoItemFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});

export const {
    name,
    reducer,
    selectTodoItems,
    selectLoading,
    selectError,
    selectSelectedTodoItem,
} = todoFeature;