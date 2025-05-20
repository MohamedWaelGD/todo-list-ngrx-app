import { Component, computed, input, output } from '@angular/core';
import { TodoItem } from '../../../../core/models/todo-item.model';
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: 'app-todo-list-view',
  imports: [TodoItemComponent],
  templateUrl: './todo-list-view.component.html',
  styleUrl: './todo-list-view.component.scss'
})
export class TodoListViewComponent {

  public title = input.required<string>();
  public todoItems = input.required<TodoItem[]>();
  public delete = output<string>();
  public toggle = output<TodoItem>();
  public select = output<TodoItem>();

  protected todoItemsCount = computed(() => this.todoItems().length);
}
