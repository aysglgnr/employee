import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{

  isFormVisiable = signal<boolean>(false);
  masterSrv= inject(MasterService);
  parentDpetList = signal<IParentDept[]>([]);
  employeeList: Employee[] = [];
  childDpetList = signal<IChildDept[]>([]);
  parentDeptId: number = 0;
  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getParentDept();
    this.getEmployees();
  }

  getParentDept() {
    this.masterSrv.getAllDept().subscribe((res:IApiResponse)=>{
    this.parentDpetList.set(res.data);
    })
  }

  getEmployees() {
    this.masterSrv.getAllEmp().subscribe((res:Employee[])=>{
      debugger;
      this.employeeList = res;
    })
  }

  onParentDeptChange() {
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((Res:IApiResponse)=>{
    this.childDpetList.set(Res.data);
    })
  }

  onSave() {
    debugger;
    this.masterSrv.saveEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
      debugger;
      alert("Employee Created")
      this.getEmployees();
      this.employeeObj = new Employee();
  },error=>{
      alert('API Error')
    })
  }
  onEdit(data : Employee) {
    this.employeeObj = data;
    this.isFormVisiable.set(true);

  }

  onUpdate(){
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
      debugger;
      alert("Employee Updated")
      this.getEmployees();
      this.employeeObj = new Employee();
    },error=>{
      alert('API Error')
    })

  }
  onDelete(id: number) {
    const isDelete = confirm("Are you sure want to Delete")
    if(isDelete){
      this.masterSrv.deleteEmpById(id).subscribe((res:IApiResponse)=>{
        debugger;
        alert("Employee Deleted")
        this.getEmployees();
      },error=>{
        alert('API Error')
    })
    
    }
  }  
  
  

}
