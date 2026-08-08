import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

type MoodId = 'feliz' | 'tranquila' | 'cansada' | 'agobiada' | 'triste';

interface MoodOption {
  id: MoodId;
  label: string;
  hint: string;
  message: string;
  reminder: string;
}

@Component({
  selector: 'app-como-te-sientes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './como-te-sientes.component.html',
  styleUrl: './como-te-sientes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComoTeSientesComponent {
  protected readonly selectedMood = signal<MoodOption | null>(null);

  protected readonly moods: readonly MoodOption[] = [
    {
      id: 'feliz',
      label: 'Muy bien',
      hint: 'Hoy tengo energía',
      message: 'Me encanta saber que hoy te sientes así. Disfruta también de jugar aunque sea a ratos.',
      reminder: 'Guarda un poquito de esa energía para ti pichoncita.'
    },
    {
      id: 'tranquila',
      label: 'Tranquila',
      hint: 'Voy poquito a poco',
      message: 'Avanza sin prisas, sé que lo tienes controlado.',
      reminder: 'Una cosa cada vez, sin exigirte más de la cuenta.'
    },
    {
      id: 'cansada',
      label: 'Cansada',
      hint: 'Necesito bajar el ritmo',
      message: 'Tu cabeza también necesita descansar para poder seguir aprendiendo.',
      reminder: 'Come algo, toma agua y acuéstate un ratito si lo necesitas.'
    },
    {
      id: 'agobiada',
      label: 'Agobiada',
      hint: 'Tengo demasiadas cosas',
      message: 'Mira solamente el examen que tienes delante y deja el resto esperando un ratito.',
      reminder: 'Respira, que yo sigo aquí contigo.'
    },
    {
      id: 'triste',
      label: 'Triste',
      hint: 'Hoy se me hace cuesta arriba',
      message: 'Hoy no tienes que fingir conmigo que todo está bien. Dímelo que me encargaré de hacerte sentir mejor.',
      reminder: 'Ojalá pudiera darte un abrazo ahora. Mientras tanto, quédate un ratito en el nidito conmigo.'
    }
  ];

  protected chooseMood(mood: MoodOption): void {
    this.selectedMood.set(mood);
  }

  protected clearMood(): void {
    this.selectedMood.set(null);
  }
}
