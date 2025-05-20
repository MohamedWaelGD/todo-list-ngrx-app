import { Component } from '@angular/core';
import { TodoListComponent } from './features/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list-ngrx-app';
}
