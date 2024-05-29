import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  getEmployeesByDepartment(departmentName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/by-department?departmentName=${departmentName}`);
  }

  // getEmployeesBySalary(salary: number, salaryToggle:boolean): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.baseUrl}/by-salary?salary=${salary}&checkGreater=${salaryToggle}`);
  // }

    getEmployeesBySalary(salary: number, salaryToggle:boolean): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/by-salary?salary=${salary}&isGreaterThan=${salaryToggle}`)
    .pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        // Handle 404 error (no employees found)
        console.error('No employees found for the given salary');
        return throwError('No employees found for the given salary');
      } else {
        // Forward other errors
        return throwError('Error fetching employees by salary');
      }
    }));
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, employee, { responseType: 'text' });
  }
}
