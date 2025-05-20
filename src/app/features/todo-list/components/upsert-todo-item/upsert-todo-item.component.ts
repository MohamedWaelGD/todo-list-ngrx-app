import { Component, inject, Input, input, OnInit, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoItem } from '../../../../core/models/todo-item.model';
import { Store } from '@ngrx/store';
import { TodoApiActions, TodoPageActions } from '../../store/todo/todo.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../core/classes/base-component';

@Component({
  selector: 'app-upsert-todo-item',
  imports: [ReactiveFormsModule],
  templateUrl: './upsert-todo-item.component.html',
  styleUrl: './upsert-todo-item.component.scss',
})
export class UpsertTodoItemComponent extends BaseComponent {
  private store = inject(Store);
  private actions$ = inject(Actions);

  @Input() set upsertTodoItem(todoItem: TodoItem | null) {
    if (todoItem) {
      this.formGroup.patchValue(todoItem);
    }
  }
  protected errorMessage = signal('');
  public clearSelectedTodoItem = output();
  protected formGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    title: new FormControl<string>('', [Validators.required]),
  });

  get isSelectedTodoItem() {
    return !!this.formGroup.value.id;
  }

  constructor() {
    super();
    this.actions$
      .pipe(
        ofType(
          TodoApiActions.insertTodoItemSuccess,
          TodoApiActions.updateTodoItemSuccess
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.reset();
      });
    this.actions$
      .pipe(
        ofType(
          TodoApiActions.insertTodoItemFailure,
          TodoApiActions.updateTodoItemFailure
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.errorMessage.set('Something went wrong, Please try again later.');
      });
  }

  reset() {
    this.errorMessage.set('');
    this.formGroup.reset();
  }

  onClearSelectedTodoItem() {
    this.clearSelectedTodoItem.emit();
    this.reset();
  }

  onSubmit() {
    this.errorMessage.set('');
    if (this.formGroup.invalid) return;

    if (this.formGroup.value.id) {
      this.store.dispatch(
        TodoPageActions.updateTodoItem({
          id: this.formGroup.value.id,
          title: this.formGroup.value.title!,
        })
      );
    } else {
      this.store.dispatch(
        TodoPageActions.insertTodoItem({ title: this.formGroup.value.title! })
      );
    }
  }
}
