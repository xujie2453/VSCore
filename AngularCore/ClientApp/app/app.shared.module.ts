//定义路由和导航菜单
import { NgModule } from '@angular/core';
import { EmployeeService } from './services/empservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
//import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchEmployeeComponent } from './components/employee/fetchemployee.component';
import { Createemployee } from './components/employee/AddEmployee.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchEmployeeComponent,
        Createemployee,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-employee', component: FetchEmployeeComponent },
            { path: 'register-employee', component: Createemployee },
            { path: 'employee/edit/:id', component: Createemployee },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [EmployeeService]
})
export class AppModuleShared {
}
