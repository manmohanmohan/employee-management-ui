import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { SaveEmployeeComponent } from './save-employee/save-employee.component';

const routes: Routes = [
  { path: 'save-employee', component: SaveEmployeeComponent },
  { path: 'employees', component: ListEmployeeComponent },
{ path: '', redirectTo: '/employees', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
