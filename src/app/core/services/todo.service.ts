import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AddTodoItem,
  TodoItem,
  UpdateTodoItem,
} from '../models/todo-item.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _http = inject(HttpClient);
  private _baseController = environment.API + '/todo';

  getAll(): Observable<TodoItem[]> {
    return this._http.get<TodoItem[]>(`${this._baseController}`);
  }
  getById(id: string): Observable<TodoItem> {
    return this._http.get<TodoItem>(`${this._baseController}/${id}`);
  }
  create(item: AddTodoItem): Observable<TodoItem> {
    return this._http.post<TodoItem>(`${this._baseController}`, item);
  }
  update(id: string, item: UpdateTodoItem): Observable<TodoItem> {
    return this._http.put<TodoItem>(`${this._baseController}/${id}`, item);
  }
  delete(id: string): Observable<void> {
    return this._http.delete<void>(`${this._baseController}/${id}`);
  }
  toggle(id: string, isCompleted: boolean): Observable<TodoItem> {
    return this._http.put<TodoItem>(`${this._baseController}/${id}`, {
      isCompleted,
    });
  }
}
