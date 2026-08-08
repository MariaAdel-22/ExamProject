import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

type TimerMode = 'focus' | 'break';

interface FocusDuration {
  label: string;
  minutes: number;
}

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PomodoroComponent implements OnDestroy {
  private readonly breakMinutes = 5;
  private timerId?: ReturnType<typeof setInterval>;

  protected readonly durations: FocusDuration[] = [
    { label: '25 min', minutes: 25 },
    { label: '45 min', minutes: 45 },
    { label: '60 min', minutes: 60 }
  ];

  protected readonly mode = signal<TimerMode>('focus');
  protected readonly focusMinutes = signal(25);
  protected readonly secondsLeft = signal(25 * 60);
  protected readonly isRunning = signal(false);
  protected readonly sessionsCompleted = signal(0);
  protected readonly statusMessage = signal('Elige un tiempo y empieza cuando estés lista.');

  protected readonly formattedTime = computed(() => {
    const totalSeconds = this.secondsLeft();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  });

  protected readonly modeLabel = computed(() =>
    this.mode() === 'focus' ? 'Momento de concentración' : 'Momento de respirar'
  );

  protected readonly totalSeconds = computed(() =>
    (this.mode() === 'focus' ? this.focusMinutes() : this.breakMinutes) * 60
  );

  protected readonly progress = computed(() => {
    const total = this.totalSeconds();

    if (total <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, ((total - this.secondsLeft()) / total) * 100));
  });

  protected selectDuration(minutes: number): void {
    this.pauseTimer();
    this.focusMinutes.set(minutes);
    this.mode.set('focus');
    this.secondsLeft.set(minutes * 60);
    this.statusMessage.set(`Preparada para ${minutes} minutos. Sin prisas 💜`);
  }

  protected setMode(mode: TimerMode): void {
    this.pauseTimer();
    this.mode.set(mode);
    this.secondsLeft.set(this.durationFor(mode) * 60);
    this.statusMessage.set(
      mode === 'focus'
        ? 'Una cosa cada vez. Tú puedes.'
        : 'Cinco minutos para descansar de verdad.'
    );
  }

  protected toggleTimer(): void {
    if (this.isRunning()) {
      this.pauseTimer();
      this.statusMessage.set('Pausado. Vuelve cuando estés preparada.');
      return;
    }

    this.startTimer();
  }

  protected resetTimer(): void {
    this.pauseTimer();
    this.secondsLeft.set(this.durationFor(this.mode()) * 60);
    this.statusMessage.set('Reiniciado. No pasa nada por volver a empezar.');
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startTimer(): void {
    if (this.secondsLeft() <= 0) {
      this.secondsLeft.set(this.durationFor(this.mode()) * 60);
    }

    this.clearTimer();
    this.isRunning.set(true);
    this.statusMessage.set(
      this.mode() === 'focus'
        ? 'Estoy aquí contigo mientras avanzas.'
        : 'Descansa un poquito. Te lo has ganado.'
    );

    this.timerId = setInterval(() => {
      const nextValue = this.secondsLeft() - 1;

      if (nextValue <= 0) {
        this.secondsLeft.set(0);
        this.completeCurrentBlock();
        return;
      }

      this.secondsLeft.set(nextValue);
    }, 1000);
  }

  private pauseTimer(): void {
    this.clearTimer();
    this.isRunning.set(false);
  }

  private completeCurrentBlock(): void {
    const completedMode = this.mode();
    this.pauseTimer();

    if (completedMode === 'focus') {
      this.sessionsCompleted.update(value => value + 1);
      this.mode.set('break');
      this.secondsLeft.set(this.breakMinutes * 60);
      this.statusMessage.set('¡Bloque terminado! Ahora toca un descanso de 5 minutos ✨');
      return;
    }

    this.mode.set('focus');
    this.secondsLeft.set(this.focusMinutes() * 60);
    this.statusMessage.set('Descanso terminado. Cuando quieras, seguimos juntas 💜');
  }

  private durationFor(mode: TimerMode): number {
    return mode === 'focus' ? this.focusMinutes() : this.breakMinutes;
  }

  private clearTimer(): void {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}
