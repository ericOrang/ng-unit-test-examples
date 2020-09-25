import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable, from, EMPTY, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;
  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todo property with the items returned from the server', () => {
    let todos = [
      { id: 1, title: 'a' },
      { id: 2, title: 'a' },
      { id: 3, title: 'a' },
    ];
    /**
     * spyOn can make a fake api call
     */
    spyOn(service, 'getTodos').and.callFake(() => {
      return from([todos]);
    });
    component.ngOnInit();
    expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake((t) => {
      return EMPTY;
    });

    component.add();
    expect(spy).toHaveBeenCalled();
  });

  it('should add a new todo returned from the server', () => {
    let todo = { id: 1 };
    // #1 way
    // let spy = spyOn(service, 'add').and.callFake((t) => {
    //   return from([todo]);
    // });

    // #2 way
    let spy = spyOn(service, 'add').and.returnValue(from([todo]));

    component.add();
    expect(component.todos.includes(todo)).toBeTruthy();
  });

  it('should set the message property if server returns an error when adding a new todo', () => {
    let error = 'error from the server';

    // #2 way
    let spy = spyOn(service, 'add').and.returnValue(throwError(error));

    component.add();
    expect(component.message).toBe(error);
  });

  it('should delete a todo item from the server if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);
    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should Not delete a todo item from the server if the user cancel', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);
    component.delete(1);
    expect(spy).not.toHaveBeenCalled();
  });
});
