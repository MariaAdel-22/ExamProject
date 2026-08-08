import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

type CountdownStatus = 'before' | 'during' | 'finished';

@Component({
  selector: 'app-cuenta-atras',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cuenta-atras.component.html',
  styleUrl: './cuenta-atras.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuentaAtrasComponent implements OnInit, OnDestroy {
  /*
   * Fechas de la semana de exámenes.
   *
   * Meses en JavaScript:
   * enero = 0, febrero = 1, ..., agosto = 7.
   *
   * Si cambian las fechas, solo tienes que modificar estas dos líneas.
   */
  private readonly examStart = new Date(2026, 7, 7, 0, 0, 0);
  private readonly examEnd = new Date(2026, 7, 20, 23, 59, 59);

  private timerId?: ReturnType<typeof setInterval>;

  protected readonly now = signal(new Date());

  protected readonly remainingMilliseconds = computed(() =>
    Math.max(0, this.examEnd.getTime() - this.now().getTime())
  );

  protected readonly days = computed(() =>
    Math.floor(this.remainingMilliseconds() / 86_400_000)
  );

  protected readonly hours = computed(() =>
    Math.floor((this.remainingMilliseconds() % 86_400_000) / 3_600_000)
  );

  protected readonly minutes = computed(() =>
    Math.floor((this.remainingMilliseconds() % 3_600_000) / 60_000)
  );

  protected readonly seconds = computed(() =>
    Math.floor((this.remainingMilliseconds() % 60_000) / 1_000)
  );

  protected readonly status = computed<CountdownStatus>(() => {
    const current = this.now().getTime();

    if (current < this.examStart.getTime()) {
      return 'before';
    }

    if (current >= this.examEnd.getTime()) {
      return 'finished';
    }

    return 'during';
  });

  protected readonly progressPercentage = computed(() => {
    const start = this.examStart.getTime();
    const end = this.examEnd.getTime();
    const current = this.now().getTime();

    if (current <= start) {
      return 0;
    }

    if (current >= end) {
      return 100;
    }

    return ((current - start) / (end - start)) * 100;
  });

  protected readonly progressLabel = computed(() =>
    `${Math.round(this.progressPercentage())}%`
  );

  protected readonly targetDateLabel = this.formatLongDate(this.examEnd);

  protected readonly statusTitle = computed(() => {
    switch (this.status()) {
      case 'before':
        return 'Todavía no ha empezado, pero ya estás más cerca.';
      case 'during':
        return 'Mira todo lo que ya has avanzado.';
      case 'finished':
        return 'La cuenta atrás terminó. Lo hiciste genial mi amor.';
    }
  });

  protected readonly statusMessage = computed(() => {
    switch (this.status()) {
      case 'before':
        return 'Vamos a ir avanzando día a día no te preocupes.';
      case 'during':
        return 'Cada hora que pasa es una hora menos. Sigue a tu ritmo y acuérdate también de descansar.';
      case 'finished':
        return 'Ahora toca dejar los apuntes un ratito, respirar y reconocer todo el esfuerzo que has hecho.';
    }
  });

  ngOnInit(): void {
    this.updateNow();

    this.timerId = setInterval(() => {
      this.updateNow();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  protected pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private updateNow(): void {
    this.now.set(new Date());
  }

  private formatLongDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  }
}
