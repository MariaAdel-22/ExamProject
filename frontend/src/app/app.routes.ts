import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { ComoTeSientesComponent } from './pages/como-te-sientes/como-te-sientes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modo-estudio', component: PomodoroComponent },
  { path: 'como-te-sientes', component: ComoTeSientesComponent },
  { path: '**', redirectTo: '' }
];
