import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UpsertTodoItemComponent } from "./components/upsert-todo-item/upsert-todo-item.component";
import { Store } from '@ngrx/store';
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { TodoItem } from '../../core/models/todo-item.model';
import { TodoPageActions } from './store/todo/todo.actions';
import { selectTodoItems, selectLoading, selectSelectedTodoItem, selectErrorList } from './store/todo/todo.reducer';
import { TodoListViewComponent } from "./components/todo-list-view/todo-list-view.component";

@Component({
  selector: 'app-todo-list',
  imports: [UpsertTodoItemComponent, TodoItemComponent, LoadingSpinnerComponent, TodoListViewComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  private store = inject(Store);

  private todoItems = this.store.selectSignal(selectTodoItems);

  protected todoItemsLoading = this.store.selectSignal(selectLoading);
  protected todoItemsError = this.store.selectSignal(selectErrorList);
  protected todoItemsNotCompleted = computed(() => this.todoItems().filter(item => !item.isCompleted));
  protected todoItemsCompleted = computed(() => this.todoItems().filter(item => item.isCompleted));
  protected selectedTodoItem = signal<TodoItem | null>(null);

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.store.dispatch(TodoPageActions.loadTodoItems());
  }

  selectTodoItem(todoItem: TodoItem) {
    this.selectedTodoItem.set(todoItem);
  }

  clearSelectedTodoItem() {
    this.selectedTodoItem.set(null);
  }

  deleteTodoItem(id: string) {
    this.store.dispatch(TodoPageActions.deleteTodoItem({ id }));
  }

  toggleTodoItem(todoItem: TodoItem) {
    this.store.dispatch(TodoPageActions.toggleTodoItem({ id: todoItem.id, isCompleted: !todoItem.isCompleted }));
  }
}
