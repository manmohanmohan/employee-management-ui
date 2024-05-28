import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,OnChanges, DoCheck {

  departmentName: string = '';
  salaryFilter: number = 10000;
  employeesByDepartment: Employee[] = [];
  employeesBySalary: Employee[] = [];
  isDepartmentNameEmpty:boolean=true;
  showValidationMessage:boolean=false;
  showEmployeeSearchResult=false;

  constructor(private employeeService: EmployeeService) { }


  ngOnInit(): void {
    console.log('ngOnInit: EmployeeComponent');
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
    this.employeeService.getEmployeesByDepartment(this.departmentName).subscribe(
      data => this.employeesByDepartment = data,
      error => console.error('Error fetching employees by department', error)
    );
  }

  fetchEmployeesBySalary(): void {
    let salary: number;
    let salaryToggle: boolean;
    if (this.salaryFilter === 10000) {
      salary = 10000;
      salaryToggle=false
    } else {
      // Assuming the other option is for salary greater than 10000
      salary = 10001;
      salaryToggle=true;
    }
    this.employeesBySalary = [];
    this.employeeService.getEmployeesBySalary(salary, salaryToggle).subscribe(
      data => this.employeesBySalary = data,
      error => console.error('Error fetching employees by salary', error)
    );
  }

  onDepartmentNameChange() {
    this.isDepartmentNameEmpty = false;
    this.showValidationMessage = false;
    this.showEmployeeSearchResult = false;
    this.employeesByDepartment = [];
  }
}
