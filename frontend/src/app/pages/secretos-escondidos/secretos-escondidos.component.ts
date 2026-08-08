import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface HiddenSecret {
  id: number;
  symbol: '✦' | '♥' | '♡';
  left: number;
  top: number;
  title: string;
  text: string;
}

interface DecoySpark {
  id: number;
  symbol: '✦' | '♥' | '♡' | '·' | '✧';
  left: number;
  top: number;
  size: 'sm' | 'md' | 'lg';
  tone: 'purple' | 'pink' | 'peach';
  delay: number;
}

@Component({
  selector: 'app-secretos-escondidos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './secretos-escondidos.component.html',
  styleUrl: './secretos-escondidos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecretosEscondidosComponent implements OnInit {
  private readonly storageKey = 'nidito-secretos-encontrados';
  private readonly finalStorageKey = 'nidito-secreto-final';

  protected readonly secrets: readonly HiddenSecret[] = [
    {
      id: 1,
      symbol: '✦',
      left: 12,
      top: 18,
      title: 'Besito secreto encontrado',
      text: 'Has encontrado un beso que llevaba escondido aquí desde que hice esta página. Muack 💜'
    },
    {
      id: 2,
      symbol: '♡',
      left: 69,
      top: 16,
      title: 'Vale misterioso',
      text: 'Vale por una película o serie juntas elegida por ti, sin que yo proteste demasiado por la elección.'
    },
    {
      id: 3,
      symbol: '♥',
      left: 59,
      top: 41,
      title: 'Confesión pequeñita',
      text: 'Cada vez que me miras siento tanto amor desbordando que no puedo evitar querer morderte.'
    },
    {
      id: 4,
      symbol: '✦',
      left: 24,
      top: 68,
      title: 'Premio inesperado',
      text: 'Has desbloqueado cinco minutos de mimos sin límite de “te quiero”.'
    },
    {
      id: 5,
      symbol: '♡',
      left: 46,
      top: 25,
      title: 'Mini recordatorio',
      text: 'A veces solo necesito recordarte que eres muy valiente, incluso cuando tú no te des cuenta.'
    },
    {
      id: 6,
      symbol: '♥',
      left: 79,
      top: 56,
      title: 'Secreto pequeñito',
      text: 'Si pudiera, ahora mismo te daría un abrazo, un beso en la frente y te dejaría estudiar apoyadita en mí.'
    }
  ];

  protected readonly decoySparks: readonly DecoySpark[] = [
    { id: 101, symbol: '·', left: 8, top: 12, size: 'sm', tone: 'purple', delay: 0.0 },
    { id: 102, symbol: '✧', left: 18, top: 31, size: 'md', tone: 'peach', delay: 0.5 },
    { id: 103, symbol: '♡', left: 27, top: 13, size: 'sm', tone: 'pink', delay: 1.0 },
    { id: 104, symbol: '·', left: 35, top: 20, size: 'sm', tone: 'purple', delay: 1.5 },
    { id: 105, symbol: '✦', left: 43, top: 12, size: 'sm', tone: 'peach', delay: 2.0 },
    { id: 106, symbol: '✧', left: 52, top: 17, size: 'sm', tone: 'purple', delay: 2.5 },
    { id: 107, symbol: '·', left: 61, top: 11, size: 'sm', tone: 'pink', delay: 0.3 },
    { id: 108, symbol: '♡', left: 76, top: 10, size: 'sm', tone: 'purple', delay: 0.8 },
    { id: 109, symbol: '·', left: 85, top: 18, size: 'sm', tone: 'peach', delay: 1.3 },
    { id: 110, symbol: '✧', left: 16, top: 49, size: 'sm', tone: 'purple', delay: 1.8 },
    { id: 111, symbol: '·', left: 30, top: 43, size: 'sm', tone: 'pink', delay: 2.3 },
    { id: 112, symbol: '✦', left: 39, top: 55, size: 'sm', tone: 'peach', delay: 2.8 },
    { id: 113, symbol: '♡', left: 49, top: 49, size: 'sm', tone: 'purple', delay: 0.2 },
    { id: 114, symbol: '·', left: 67, top: 45, size: 'sm', tone: 'pink', delay: 0.7 },
    { id: 115, symbol: '✧', left: 84, top: 42, size: 'md', tone: 'purple', delay: 1.2 },
    { id: 116, symbol: '·', left: 10, top: 77, size: 'sm', tone: 'peach', delay: 1.7 },
    { id: 117, symbol: '♡', left: 34, top: 80, size: 'sm', tone: 'pink', delay: 2.2 },
    { id: 118, symbol: '·', left: 46, top: 73, size: 'sm', tone: 'purple', delay: 2.7 },
    { id: 119, symbol: '✧', left: 58, top: 83, size: 'sm', tone: 'peach', delay: 0.4 },
    { id: 120, symbol: '·', left: 70, top: 76, size: 'sm', tone: 'purple', delay: 0.9 },
    { id: 121, symbol: '♡', left: 88, top: 72, size: 'sm', tone: 'pink', delay: 1.4 },
    { id: 122, symbol: '✦', left: 24, top: 57, size: 'sm', tone: 'peach', delay: 1.9 },
    { id: 123, symbol: '·', left: 55, top: 33, size: 'sm', tone: 'purple', delay: 2.4 },
    { id: 124, symbol: '✧', left: 87, top: 28, size: 'sm', tone: 'pink', delay: 2.9 }
  ];

  protected readonly foundSecretIds = signal<readonly number[]>([]);
  protected readonly activeSecret = signal<HiddenSecret | null>(null);
  protected readonly finalSecretOpened = signal(false);

  protected readonly foundCount = computed(() => this.foundSecretIds().length);
  protected readonly requiredForFinal = 4;

  protected readonly finalUnlocked = computed(
    () => this.foundCount() >= this.requiredForFinal
  );

  protected readonly progressPercentage = computed(
    () => Math.min(100, (this.foundCount() / this.requiredForFinal) * 100)
  );

  protected readonly progressText = computed(() => {
    if (this.finalUnlocked()) {
      return '¡La cajita secreta está desbloqueada!';
    }

    const remaining = this.requiredForFinal - this.foundCount();

    return remaining === 1
      ? 'Te falta 1 secreto para abrir la cajita'
      : `Te faltan ${remaining} secretos para abrir la cajita`;
  });

  ngOnInit(): void {
    this.restoreProgress();
  }

  protected isFound(id: number): boolean {
    return this.foundSecretIds().includes(id);
  }

  protected discover(secret: HiddenSecret): void {
    if (!this.isFound(secret.id)) {
      const next = [...this.foundSecretIds(), secret.id];
      this.foundSecretIds.set(next);
      this.persistProgress(next);
    }

    this.activeSecret.set(secret);
  }

  protected closeSecret(): void {
    this.activeSecret.set(null);
  }

  protected openFinalSecret(): void {
    if (!this.finalUnlocked()) {
      return;
    }

    this.finalSecretOpened.set(true);

    try {
      localStorage.setItem(this.finalStorageKey, 'true');
    } catch {
      // La experiencia sigue funcionando aunque el navegador bloquee storage.
    }
  }

  protected resetGame(): void {
    this.foundSecretIds.set([]);
    this.activeSecret.set(null);
    this.finalSecretOpened.set(false);

    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.finalStorageKey);
    } catch {
      // No pasa nada si el navegador bloquea storage.
    }
  }

  private restoreProgress(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          const validIds = parsed.filter(
            (id): id is number =>
              typeof id === 'number' &&
              this.secrets.some((secret) => secret.id === id)
          );

          this.foundSecretIds.set([...new Set(validIds)]);
        }
      }

      this.finalSecretOpened.set(
        localStorage.getItem(this.finalStorageKey) === 'true'
      );
    } catch {
      // Si el storage no está disponible, simplemente empieza desde cero.
    }
  }

  private persistProgress(ids: readonly number[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(ids));
    } catch {
      // El juego sigue funcionando durante la sesión.
    }
  }
}
