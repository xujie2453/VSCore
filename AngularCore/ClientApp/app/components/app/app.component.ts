import { Component, Inject, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public http: Http, private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _element: ElementRef, private _router: Router) {

        
    }

    

}
