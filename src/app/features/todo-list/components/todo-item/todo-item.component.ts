import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TodoItem } from '../../../../core/models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  imports: [
    NgClass
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  public todoItem = input.required<TodoItem>();

  public delete = output<string>();
  public select = output<TodoItem>();
  public toggle = output<TodoItem>();

  onDelete() {
    this.delete.emit(this.todoItem().id);
  }
  onSelect() {
    this.select.emit(this.todoItem());
  }
  onToggle() {
    this.toggle.emit(this.todoItem());
  }
}
