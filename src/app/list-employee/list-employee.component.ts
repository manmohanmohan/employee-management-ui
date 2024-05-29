import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit,OnChanges, DoCheck {

  departmentName: string = '';
  salaryToggle: boolean = false;
  salary: number  = 10000;
  employeesByDepartment: Employee[] = [];
  employeesBySalary: Employee[] = [];
  isDepartmentNameEmpty:boolean=true;
  showValidationMessage:boolean=false;
  showEmployeeSearchResult=false;

  constructor(private employeeService: EmployeeService) { }


  ngOnInit(): void {
    console.log('ngOnInit: EmployeeComponent');
    this.fetchEmployeesBySalary();
  }

  ngOnChanges(): void {
    console.log('ngOnChanges: EmployeeComponent');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck: EmployeeComponent');
  }


  fetchEmployeesByDepartment(): void {
    this.showValidationMessage = true;
    this.showEmployeeSearchResult = true;
    if (!this.departmentName) {
      this.isDepartmentNameEmpty = true;
      return;
    }
    this.isDepartmentNameEmpty = false;
    this.employeesByDepartment=[];
    this.employeeService.getEmployeesByDepartment(this.departmentName).subscribe({
      next:(data) => this.employeesByDepartment = data,
      error: (error) => console.error('Error fetching employees by department', error)
  });
  }

  fetchEmployeesBySalary(): void {

    this.employeesBySalary = [];
    this.employeeService.getEmployeesBySalary(this.salary, this.salaryToggle).subscribe({
      next:data => this.employeesBySalary = data,
      error:error => console.error('Error fetching employees by salary', error)
    }
    );
  }


  onDepartmentNameChange() {
    this.isDepartmentNameEmpty = false;
    this.showValidationMessage = false;
    this.showEmployeeSearchResult = false;
    this.employeesByDepartment = [];
  }
}
