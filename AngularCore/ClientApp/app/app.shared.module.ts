//����·�ɺ͵����˵�
import { NgModule } from '@angular/core';
import { EmployeeService } from './services/empservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchEmployeeComponent } from './components/employee/fetchemployee.component';
import { UserListComponent } from './components/portals/userManager/userList.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchEmployeeComponent,
        UserListComponent,
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
            { path: 'fetchEmployee', component: FetchEmployeeComponent },
            { path: 'userList', component: UserListComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [EmployeeService]
})
export class AppModuleShared {
}
