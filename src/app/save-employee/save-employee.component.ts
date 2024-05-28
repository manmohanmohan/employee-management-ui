import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EmployeeDTO {
  name: string;
  department: string;
  salary: number;
}

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent {
  employee: EmployeeDTO = {
    name: '',
    department: '',
    salary: 0
  };

  message: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:8080/employee/save', this.employee, { responseType: 'text' })
      .subscribe(response => {
        this.message = response;
      }, error => {
        console.error('Error saving employee', error);
        this.message = 'Error saving employee';
      });
  }
}
