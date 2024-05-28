import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getEmployeesByDepartment(departmentName: string) {
    return this.http.get<any[]>(`http://localhost:8080/api/employees/department?departmentName=${departmentName}`);
  }

  getEmployeesBySalary(salary: number) {
    return this.http.get<any[]>(`http://localhost:8080/api/employees/salary?salary=${salary}`);
  }
}
