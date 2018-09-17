import { Component, Inject, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/empservice.service';

@Component({
    selector: 'fetch-employee',
    templateUrl: './fetchemployee.component.html'
})

export class FetchEmployeeComponent {
    
    employeeForm: FormGroup;
    employeeSearch: FormGroup;
    title: string = "Add";
    sname: string;
    checkAllflag: boolean;
    checkItemflag: boolean;
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
            name: ['', [Validators.required, Validators.maxLength(4000)]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required, Validators.maxLength(4000)]],
            city: ['', [Validators.required]]
        });

        this.employeeSearch = new FormGroup({
            employeeId: new FormControl(),
            name: new FormControl(),
            gender: new FormControl(),
            department: new FormControl(),
            city: new FormControl()
        });
    }

    //全选
    clickAll(e) {
        const checkbox = e.target;
        this.checkItemflag = this.checkAllflag = checkbox.checked;
    }
    checkitem(e, item) {
        this.checkAllflag = false;
    }
    

    getEmployees() {
        this._employeeService.getEmployees().subscribe(
            data => this.empList = data
        )
    }
    getEmployeeDate() {
        this._employeeService.searchEmployee(this.employeeSearch.value)
            .subscribe(data => this.empList = data
        )
    }

    save() {
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
                name: ['', [Validators.required, Validators.maxLength(4000)]],
                gender: '--请选择--',
                department: ['', [Validators.required, Validators.maxLength(4000)]],
                city: '--请选择--'
            });
            //this.InitEmployee();
        }
       
    }

    //检查表单控件的有效性
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