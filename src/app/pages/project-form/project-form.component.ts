import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Employee } from '../../model/class/Employee';
import { Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {

  projectForm : FormGroup = new FormGroup({});

  emplList$: Observable<Employee[]> = new Observable<[]>;
  masterSrv = inject(MasterService);

  constructor() {
    this.emplList$ = this.masterSrv.getAllEmp();
    this.initializeForm();
  }

  initializeForm() {
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(''),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl('')

    })

  }

}
