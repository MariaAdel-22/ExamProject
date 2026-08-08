import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  accent: 'purple' | 'pink' | 'peach' | 'sage';
  route?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @ViewChild('idleVideo') private idleVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('greetingVideo') private greetingVideo?: ElementRef<HTMLVideoElement>;

  protected isGreeting = false;

  protected readonly features: FeatureCard[] = [
    { icon: '💌', title: 'Abrir cuando...', description: 'Cartas para cada momento de esta semana.', accent: 'purple' },
    { icon: '🧠', title: 'Modo estudio', description: 'Un temporizador para concentrarte sin olvidarte de descansar.', accent: 'sage', route: '/modo-estudio' },
    { icon: '✨', title: 'Necesito motivación', description: 'Un poquito de ánimo justo cuando lo necesites.', accent: 'peach', route: '/necesito-motivacion' },
    { icon: '🫂', title: 'Abrazo de emergencia', description: 'Porque la distancia no debería impedir un abrazo.', accent: 'pink', route: '/abrazo-emergencia' },
    { icon: '🎧', title: 'Música para ti', description: 'Un rincón para estudiar, respirar y desconectar.', accent: 'purple' },
    { icon: '🌡️', title: '¿Cómo te sientes?', description: 'Cuéntame cómo va el día y encuentra algo para ti.', accent: 'pink', route: '/como-te-sientes' },
    { icon: '📅', title: 'Cuenta atrás', description: 'Cada día es uno menos para terminar esta locura.', accent: 'sage', route: '/cuenta-atras' },
    { icon: '🥚', title: 'Secretos escondidos', description: 'Puede que haya alguna sorpresa esperando por aquí.', accent: 'peach' }
  ];

  protected playGreeting(): void {
    if (this.isGreeting) {
      return;
    }

    const idle = this.idleVideo?.nativeElement;
    const greeting = this.greetingVideo?.nativeElement;

    if (!greeting) {
      return;
    }

    this.isGreeting = true;
    idle?.pause();

    greeting.pause();
    greeting.currentTime = 0;

    void greeting.play().catch(() => {
      this.finishGreeting();
    });
  }

  protected finishGreeting(): void {
    const idle = this.idleVideo?.nativeElement;
    const greeting = this.greetingVideo?.nativeElement;

    greeting?.pause();
    if (greeting) {
      greeting.currentTime = 0;
    }

    this.isGreeting = false;

    if (idle) {
      idle.currentTime = 0;
      void idle.play().catch(() => {
        // Si el navegador bloquease autoplay, el siguiente toque del usuario
        // permitirá reproducirlo. Al estar muted normalmente no ocurre.
      });
    }
  }
}
