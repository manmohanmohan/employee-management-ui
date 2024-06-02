import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from './employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEmployeesByDepartment(departmentName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/departments/${departmentName}/employees`);
  }

  getEmployeesBySalary(salary: number, isGreaterThan: boolean): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/employees/salary?salary=${salary}&isGreaterThan=${isGreaterThan}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching employees by salary', error);
          return [];
        }),
        map((employees: Employee[]) => {
          // Check if the response is an empty array
          if (Array.isArray(employees) && employees.length === 0) {
            console.log('No employees found for the given salary');
            // You can return a message or handle this scenario as per your requirement
          }
          return employees;
        })
      );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseUrl}/employees`);
  }

  saveEmployee(employee: Employee): Observable<any> {
    console.log('API URL:', this.apiBaseUrl);
    return this.http.post(`${this.apiBaseUrl}/employees`, employee, { responseType: 'text' });
  }
}
