import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

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

  constructor(private employeeService: EmployeeService) { }

  onSubmit() {
    this.employeeService.saveEmployee(this.employee)
      .subscribe({
        next: (response) => {
          this.message = response;
          this.clear();
        },
        error: (e) => {
          console.error('Error saving employee', e);
          this.message = 'Error saving employee';
        }
      });
  }
  clear() {
    this.employee = {
      name: '',
      department: '',
      salary: 0
    };
  }
}
