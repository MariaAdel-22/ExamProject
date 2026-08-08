import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface HugMessage {
  title: string;
  text: string;
  note: string;
}

@Component({
  selector: 'app-abrazo-emergencia',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './abrazo-emergencia.component.html',
  styleUrl: './abrazo-emergencia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbrazoEmergenciaComponent implements OnDestroy {
  private readonly messages: readonly HugMessage[] = [
    {
      title: 'Ven aquí, pichoncita 💜',
      text: 'Cierra los ojos un segundo e imagina que te aprieto muy fuerte contra mí.',
      note: 'Duración estimada: hasta que podamos dárnoslo de verdad dentro de poco.'
    },
    {
      title: 'Ven aquí, pichoncita hermosa',
      text: 'No tienes que explicarme nada ahora. Este abrazo es solamente para que descanses un ratito.',
      note: 'Puedes quedarte aquí todo el tiempo que necesites.'
    },
    {
      title: 'Ven aquí, pichoncita 💜',
      text: 'Dejame darte uno de esos abrazos que no solucionan todo el estrés que tienes, pero hacen que pesen un poquito menos.',
      note: 'Y sí, este incluye caricias en la cabecita.'
    },
    {
      title: 'Abrazo de emergencia activado💜',
      text: 'Quiero que recuerdes que estoy orgullosa de ti.',
      note: 'No hace falta estar bien siempre, debes decirme cómo estás.'
    },
    {
      title: 'Te tengo 💜',
      text: 'Por unos segundos no pienses en exámenes, fechas ni notas. Solo imagina que estás aquí conmigo.',
      note: 'Lo demás puede esperar un momentito.'
    }
  ];

  protected readonly isHugging = signal(false);
  protected readonly currentMessage = signal<HugMessage | null>(null);
  protected readonly hugsReceived = signal(0);

  private lastMessageIndex = -1;
  private hugTimer?: ReturnType<typeof setTimeout>;

  protected sendHug(): void {
    if (this.isHugging()) {
      return;
    }

    let nextIndex = 0;

    if (this.messages.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * this.messages.length);
      } while (nextIndex === this.lastMessageIndex);
    }

    this.lastMessageIndex = nextIndex;
    this.currentMessage.set(this.messages[nextIndex]);
    this.hugsReceived.update((count) => count + 1);
    this.isHugging.set(true);

    if (this.hugTimer) {
      clearTimeout(this.hugTimer);
    }

    this.hugTimer = setTimeout(() => {
      this.isHugging.set(false);
    }, 2800);
  }

  protected hugCounterText(): string {
    const count = this.hugsReceived();

    if (count === 0) {
      return 'Tu primer abrazo está esperando';
    }

    if (count === 1) {
      return '1 abrazo recibido';
    }

    return `${count} abrazos recibidos`;
  }

  ngOnDestroy(): void {
    if (this.hugTimer) {
      clearTimeout(this.hugTimer);
    }
  }
}
