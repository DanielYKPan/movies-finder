import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { HomeComponent } from "./home";

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movies', loadChildren: './+movie#MovieModule'},
    {path: 'actors', loadChildren: './+actor#ActorModule'},
    {path: '**', component: NoContentComponent},
];
