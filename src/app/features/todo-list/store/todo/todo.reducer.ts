import { createFeature, createReducer, on } from '@ngrx/store';
import { TodoApiActions, TodoPageActions } from './todo.actions';
import { TodoItem } from '../../../../core/models/todo-item.model';

interface State {
  todoItems: TodoItem[];
  loading: boolean;
  errorForm: string | null;
  errorList: string | null;
  selectedTodoItem: TodoItem | null;
}

const initialState: State = {
  todoItems: [],
  loading: false,
  errorForm: null,
  errorList: null,
  selectedTodoItem: null,
};

export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    on(TodoPageActions.loadTodoItems, (state) => ({
      ...state,
      loading: true,
      errorList: null,
    })),
    on(TodoApiActions.loadTodoItemsSuccess, (state, { todoItems }) => ({
      ...state,
      loading: false,
      todoItems,
    })),
    on(TodoApiActions.loadTodoItemsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errorList: error,
    })),

    on(TodoPageActions.insertTodoItem, (state, { title }) => ({
      ...state,
      loading: true,
      errorForm: null,
    })),
    on(TodoApiActions.insertTodoItemSuccess, (state, { todoItem }) => ({
      ...state,
      loading: false,
      todoItems: [...state.todoItems, todoItem],
    })),
    on(TodoApiActions.insertTodoItemFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errorForm: error,
    })),

    on(TodoPageActions.updateTodoItem, (state, { id, title }) => ({
      ...state,
      loading: true,
      errorForm: null,
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
      errorForm: error,
    })),

    on(TodoPageActions.toggleTodoItem, (state, { id, isCompleted }) => ({
      ...state,
      loading: true,
      errorList: null,
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
      errorList: error,
    })),

    on(TodoPageActions.deleteTodoItem, (state, { id }) => ({
      ...state,
      loading: true,
      errorList: null,
    })),
    on(TodoApiActions.deleteTodoItemSuccess, (state, { id }) => ({
      ...state,
      loading: false,
      todoItems: state.todoItems.filter((item) => item.id !== id),
    })),
    on(TodoApiActions.deleteTodoItemFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errorList: error,
    })),
  ),
});

export const {
    name,
    reducer,
    selectTodoItems,
    selectLoading,
    selectErrorList,
    selectErrorForm,
    selectSelectedTodoItem,
} = todoFeature;