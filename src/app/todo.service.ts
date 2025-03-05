import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly http: HttpClient = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://127.0.0.1:8080/api/v1/tasks/all');
  }
}
