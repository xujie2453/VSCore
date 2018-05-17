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
    title: string = "Add";
    sname: string;
    employeeId: number;
    errorMessage: any;
    cityList: Array<any> = [];
    public empList: EmployeeData[];

    constructor(public http: Http, private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _element: ElementRef,private _router: Router, private _employeeService: EmployeeService) {
        
        this.InitEmployee();
    }

    ngOnInit() {

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
        debugger;
        if (!this.employeeForm.valid && this.title != "Delete") {
            return;
        }

        if (this.title == "Add") {
            this._employeeService.saveEmployee(this.employeeForm.value)
                .subscribe((data) => {

                    alert("保存成功！");
                    this.getEmployees();

                    //this.InitEmployee();
                    this._element.nativeElement.querySelector('.close').click();

                    //this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error);
        }
        else if (this.title == "Edit") {
            this._employeeService.updateEmployee(this.employeeForm.value)
                .subscribe((data) => {

                    alert("编辑成功!");
                    this.getEmployees();
                    //this.InitEmployee();
                    this._element.nativeElement.querySelector('.close').click();

                    //this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error);
        }
        else if (this.title == "Delete") {
            this._employeeService.deleteEmployee(this.employeeId).subscribe((data) => {
                this.getEmployees();
                this._element.nativeElement.querySelector('.close1').click();
            }, error => console.error(error));
        }
    }
    
    EmployeeEdit(title, employeeID) {
        this.title = title;
        this.employeeId = employeeID;
        if (title == "Edit") {
            this._employeeService.getEmployeeById(this.employeeId)
                .subscribe(resp => this.employeeForm.setValue(resp)
                , error => this.errorMessage = error);
        }
        else if (title == "Add") {
            this.employeeForm.reset({
                employeeId: 0,
                name: '',
                gender: '--请选择--',
                department: '',
                city: '--请选择--'
            });
            //this.InitEmployee();
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