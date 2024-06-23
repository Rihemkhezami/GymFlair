import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { accessLogin, guestGuard, validRole } from './services/auth-guard.service';
import { UpdateEquipmentComponent } from './equipments/update-equipment/update-equipment.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { CoachsComponent } from './coachs/coachs.component';
import { UpdateCoachComponent } from './coachs/update-coach/update-coach.component';
import { AddCoachComponent } from './coachs/add-coach/add-coach.component';
import { CourComponent } from './cour/cour.component';
import { UpdateCourComponent } from './cour/update-cour/update-cour.component';
import { AddCourComponent } from './cour/add-cour/add-cour.component';
import { EventComponent } from './event/event.component';
import { UpdateEventComponent } from './event/update-event/update-event.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PresentComponent } from './present/present.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [accessLogin] },
    { path: 'equipments', component: EquipmentsComponent, canActivate: [guestGuard] },
    { path: 'equipments/update/:id', component: UpdateEquipmentComponent, canActivate: [guestGuard] },
    { path: 'equipments/add', component: AddEquipmentComponent, canActivate: [guestGuard] },
    { path: 'coachs', component: CoachsComponent, canActivate: [guestGuard] },
    { path: 'coach/update/:id', component: UpdateCoachComponent, canActivate: [guestGuard] },
    { path: 'coach/add', component: AddCoachComponent, canActivate: [guestGuard] },
    { path: 'cours', component: CourComponent, canActivate: [guestGuard] },
    { path: 'cour/update/:id', component: UpdateCourComponent, canActivate: [guestGuard] },
    { path: 'cour/add', component: AddCourComponent, canActivate: [guestGuard] },
    { path: 'events', component: EventComponent, canActivate: [guestGuard] },
    { path: '', component: DashboardComponent, canActivate: [guestGuard] },
    { path: 'event/update/:id', component: UpdateEventComponent, canActivate: [guestGuard] },
    { path: 'event/add', component: AddEventComponent, canActivate: [guestGuard] },
    { path: 'users', component: UserComponent, canActivate: [guestGuard, validRole] },
    { path: 'user/update/:id', component: UpdateUserComponent, canActivate: [guestGuard, validRole] },
    { path: 'user/add', component: AddUserComponent, canActivate: [guestGuard, validRole] },
    { path: '**', component: PageNotFoundComponent },
];
