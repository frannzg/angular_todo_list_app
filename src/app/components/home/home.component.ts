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
  tasks: any[] = [];
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:8080/api/v1/tasks/all').subscribe({
      next: (data) => {
        this.tasks = data;
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
}
