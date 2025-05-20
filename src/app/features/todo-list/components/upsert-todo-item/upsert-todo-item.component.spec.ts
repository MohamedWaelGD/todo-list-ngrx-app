import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTodoItemComponent } from './upsert-todo-item.component';

describe('UpsertTodoItemComponent', () => {
  let component: UpsertTodoItemComponent;
  let fixture: ComponentFixture<UpsertTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertTodoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
