import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { ComoTeSientesComponent } from './pages/como-te-sientes/como-te-sientes.component';
import { CuentaAtrasComponent } from './pages/cuenta-atras/cuenta-atras.component';
import { NecesitoMotivacionComponent } from './pages/necesito-motivacion/necesito-motivacion.component';
import { AbrazoEmergenciaComponent } from './pages/abrazo-emergencia/abrazo-emergencia.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'modo-estudio', component: PomodoroComponent },
  { path: 'como-te-sientes', component: ComoTeSientesComponent },
  { path: 'cuenta-atras', component: CuentaAtrasComponent },
  { path: 'necesito-motivacion', component: NecesitoMotivacionComponent },
  { path: 'abrazo-emergencia', component: AbrazoEmergenciaComponent },
  { path: '**', redirectTo: '' }
];