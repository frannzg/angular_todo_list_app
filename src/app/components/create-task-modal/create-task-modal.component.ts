import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task-modal',
  imports: [FormsModule],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.css'
})
export class CreateTaskModalComponent {
  @Output() taskCreated = new EventEmitter<any>();

  taskName: string = '';
  taskDescription: string = '';

  newTask = { task: this.taskName, description: this.taskDescription, status: 'Pending' };
  
  constructor(private http: HttpClient) {}

  save(){
    this.newTask = { task: this.taskName, description: this.taskDescription, status: 'Pending' };
    this.http.post<any>('http://127.0.0.1:8080/api/v1/tasks/save', this.newTask).subscribe({
      next: (data) => {
        console.log('Tarea guardada:', data);
        this.taskCreated.emit(data); 
      },
      error: (err) => {
        console.error('Error al guardar la tarea:', err);
      }
    });    
    location.reload();
  }

  cancel() {
    this.taskCreated.emit(null);
  }
}
