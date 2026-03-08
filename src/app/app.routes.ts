import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Participate } from './features/participate/participate';
import { ParticipantsList } from './features/participants-list/participants-list';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
     {
        path:'participate',
        component:Participate
    },
    {
        path:'list',
        component:ParticipantsList
    },
    {
        path:'previous',
        component:Home
    }
];
