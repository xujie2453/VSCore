import { Component, Inject, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/empservice.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
    selector: 'user-List',
    templateUrl: './userList.component.html'
})

export class UserListComponent {

}