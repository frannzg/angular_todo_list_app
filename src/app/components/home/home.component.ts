import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'home-component',
  standalone: true,
  imports: [CommonModule, CreateTaskModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasksPending: any[] = [];
  tasksDone: any[] = [];
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let status = "Pending";
    
    this.http.get<any>('http://127.0.0.1:8080/api/v1/tasks/all/status', {
      params: { status: status }
    }).subscribe({
      next: (data) => {
        this.tasksPending = data;
      },
      error: (err) => {
        console.error('Error al hacer la petición:', err);
      }
    });

    status = "Done";

    this.http.get<any>('http://127.0.0.1:8080/api/v1/tasks/all/status', {
      params: { status: status }
    }).subscribe({
      next: (data) => {
        this.tasksDone = data;
      },
      error: (err) => {
        console.error('Error al hacer la petición:', err);
      }
    });

  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onTaskCreated(task: any) {
    if (task) {
      console.log('Tarea creada:', task);
    }
    this.toggleModal(); 
  }

  updateTask(task: any) {
    const updatedTask = { 
      task: task.task,
      description: task.description,
      status: task.status === 'Pending' ? 'Done' : 'Pending'
    };
  
    this.http.put<any>(`http://127.0.0.1:8080/api/v1/tasks/update/${task.id}`, updatedTask).subscribe({
      next: (data) => {
        console.log('Tarea actualizada:', data);
        const updatedTaskIndex = this.tasksPending.findIndex(t => t.id === task.id);
        if (updatedTaskIndex !== -1) {
          this.tasksPending[updatedTaskIndex] = data;
        }
      },
      error: (err) => {
        console.error('Error al guardar la tarea:', err);
      }
    });

    location.reload();
  }

  deleteTask(task: any) {
    this.http.delete<any>(`http://127.0.0.1:8080/api/v1/tasks/delete/${task.id}`).subscribe({
      next: (data) => {
        console.log('Tarea eliminada:', data);
        // Elimina la tarea del array de tareas pendientes
        this.tasksPending = this.tasksPending.filter(t => t.id !== task.id);
      },
      error: (err) => {
        console.error('Error al eliminar la tarea:', err);
      }
    });
      location.reload();
  }
  
}
