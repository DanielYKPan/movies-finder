import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',     redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', loadChildren: './+movie#MovieModule'},
  { path: '**',    component: NoContentComponent },
];
