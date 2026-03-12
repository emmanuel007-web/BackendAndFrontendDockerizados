import { Routes } from '@angular/router';
import { FormRegister } from './components/form-register/form-register';
import { Login } from './components/login/login';
import { Home } from './components/home/home';

export const routes: Routes = [

    {path: '', component: Home},
    {path: 'register', component: FormRegister},
    {path: 'login', component: Login},
];
