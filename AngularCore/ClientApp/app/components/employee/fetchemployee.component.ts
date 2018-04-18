import { Component, Inject, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/empservice.service';

@Component({
    templateUrl: './fetchemployee.component.html'
})

export class FetchEmployeeComponent {
    
    employeeForm: FormGroup;
    title: string = "新建";
    employeeId: number;
    errorMessage: any;
    cityList: Array<any> = [];
    public empList: EmployeeData[];

    constructor(public http: Http, private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _element: ElementRef,private _router: Router, private _employeeService: EmployeeService) {
        
        
    }

    ngOnInit() {

        debugger;
        this.InitEmployee();
        //获取员工信息
        this.getEmployees();
        //获取城市信息
        this._employeeService.getCityList().subscribe(data => this.cityList = data);

        //获取员工ID
        if (this._avRoute.snapshot.params["id"]) {
            this.employeeId = this._avRoute.snapshot.params["id"];
        }
    }

    InitEmployee() {
        this.employeeForm = this._fb.group({
            employeeId: 0,
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required]],
            city: ['', [Validators.required]]
        });
    }

    getEmployees() {
        this._employeeService.getEmployees().subscribe(
            data => this.empList = data
        )
    }

    save() {
        if (!this.employeeForm.valid) {
            return;
        }

        if (this.title == "新建") {
            this._employeeService.saveEmployee(this.employeeForm.value)
                .subscribe((data) => {

                    alert("保存成功！");
                    this.getEmployees();
                    this.InitEmployee();
                    this._element.nativeElement.querySelector('.close').click();

                    //this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error);
        }
        else if (this.title == "编辑") {
            this._employeeService.updateEmployee(this.employeeForm.value)
                .subscribe((data) => {

                    alert("编辑成功!");
                    this.getEmployees();
                    this.InitEmployee();
                    this._element.nativeElement.querySelector('.close').click();

                    //this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error);
        }
        else if (this.title == "删除") {
            this._employeeService.deleteEmployee(this.employeeId).subscribe((data) => {
                this.getEmployees();
            }, error => console.error(error));
        }
    }

    edit(employeeID) {
        if (employeeID > 0) {
            this.title = "编辑";
            this.employeeId = employeeID;
            this._employeeService.getEmployeeById(this.employeeId)
                .subscribe(resp => this.employeeForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    delete(employeeID) {
        if (employeeID > 0) {
            this.title = "删除";
            this.employeeId = employeeID;
        }
    }

    get name() { return this.employeeForm.get('name'); }
    get gender() { return this.employeeForm.get('gender'); }
    get department() { return this.employeeForm.get('department'); }
    get city() { return this.employeeForm.get('city'); } 
}

interface EmployeeData {
    employeeId: number;
    name: string;
    gender: string;
    city: string;
    department: string;

}  