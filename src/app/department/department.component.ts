import { Component } from '@angular/core';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent {
  departmentName: string = '';
  employees: any[] = [];
  salaryToggle: string = '>10K';

  constructor(private departmentService: DepartmentService) {}

  getEmployees() {
    this.departmentService.getEmployeesByDepartment(this.departmentName)
      .subscribe(data => this.employees = data);
  }

  toggleSalary() {
    const salary = this.salaryToggle === '>10K' ? 10000 : -1;
    this.departmentService.getEmployeesBySalary(salary)
      .subscribe(data => this.employees = data);
  }
}
