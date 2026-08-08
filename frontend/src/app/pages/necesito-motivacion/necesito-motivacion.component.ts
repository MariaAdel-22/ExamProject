import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

type MotivationTone = 'purple' | 'pink' | 'peach' | 'sage';

interface MotivationMessage {
  text: string;
  littleNote: string;
  tone: MotivationTone;
}

@Component({
  selector: 'app-necesito-motivacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './necesito-motivacion.component.html',
  styleUrl: './necesito-motivacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NecesitoMotivacionComponent {
  private readonly messages: readonly MotivationMessage[] = [
    {
      text: '¿Recuerdas cuando fuiste personalmente a TIA después de hacer el pasaporte?',
      littleNote: 'Te viste tan genial que mi corazón se aceleró cuando me contaste, eres tan feroz con lo que te importa.',
      tone: 'purple'
    },
    {
      text: 'Amo la capacidad de concentración que tienes, cuando estás enfocada en algo todo tu alrededor desaparece.',
      littleNote: 'Me dan ganas de querer morderte la mejilla en un abrazote bien grande.',
      tone: 'sage'
    },
    {
      text: 'No te agobies mi amor, confío en tus capacidades. Una de las cosas que más me llamó la atención desde que te conocí fue lo inteligente que eres.',
      littleNote: 'Siempre lo demuestras, eres tan consciente de tu entorno aunque quieras aparentar que no.',
      tone: 'pink'
    },
    {
      text: 'Confía en ti mi amor, nadie más que tu puede arrasar en tus metas.',
      littleNote: 'Te presto un poquito de mi confianza hasta que vuelva la tuya.',
      tone: 'purple'
    },
    {
      text: '¿Recuerdas cuando éramos compañeras admins y estuviste debatiendo sobre la moral del hombre en la sociedad actual?',
      littleNote: 'Desde ese entonces llamaste mi atención, me sorprendió cuando me dijiste tu edad porque no pensé que alguien joven podía pensar así.',
      tone: 'sage'
    },
    {
      text: 'Así que mi mujer necesita reponer sus ánimos, ¿eh?. Entonces déjame recordarte que cuando termines los exámenes vas a comer un buen platote de sushi.',
      littleNote: 'Así que no te desanimes que quiero disfrutarlo contigo.',
      tone: 'peach'
    },
    {
      text: 'Si hoy vas más despacio no te preocupes mi amor.',
      littleNote: 'Sin prisa pero sin pausa.',
      tone: 'sage'
    },
    {
      text: 'No estás sola delante de esos apuntes.',
      littleNote: 'Desde aquí sigo haciéndote compañía, mi pichoncita.',
      tone: 'pink'
    },
    {
      text: '¿Recuerdas el día que estuviste asistiendo el parto de la chancha? Estabas cansada pero podía ver el orgullo de poder asistir bien al animalito en tus ojos.',
      littleNote: 'No quiero que olvides ese fuego que prende dentro de tu pecho.',
      tone: 'purple'
    },
    {
      text: 'Eres como la diosa de la justicia, todos se acercan a ti implorando que hagas un dictamen con la verdad.',
      littleNote: 'Y si no lo crees, deberías recordar todas las personas que acuden a ti.',
      tone: 'peach'
    },
    {
      text: 'Cada cosa que repasas ahora es una cosa menos que tendrás que cargar después mi amor.',
      littleNote: 'Mira lo que vas dejando atrás y no solo lo que queda delante.',
      tone: 'sage'
    },
    {
      text: 'Sé lo mucho que te estás esforzando incluso cuando el resultado todavía no se ve.',
      littleNote: 'Yo sí veo ese esfuerzo.',
      tone: 'pink'
    },
    {
      text: 'Respira y tómate unos minutos mi amor, a veces se necesita la mente fría para comprender los problemas.',
      littleNote: 'Primero tú y ya después lo siguiente.',
      tone: 'purple'
    },
    {
      text: 'Si un tema se atasca no te rindas mi amor, sé que es frustante pero también sé que eres capaz de dominarlo en cuanto lo entiendas.',
      littleNote: 'Domíname después del examen por favor y gracias.',
      tone: 'peach'
    },
    {
      text: 'Me siento orgullosa de ti antes de saber qué nota vas a sacar.',
      littleNote: 'Porque estoy mirando tu esfuerzo y no solamente el resultado.',
      tone: 'pink'
    },
    {
      text: 'Si te sientes cansada mi amor toma un poquito de chocolate, lo recomiendan.',
      littleNote: 'Esto último quizá no suene muy científico, pero suena bastante convincente.',
      tone: 'peach'
    }
  ];

  protected readonly currentMessage = signal<MotivationMessage | null>(null);
  protected readonly messagesSeen = signal(0);

  protected readonly counterText = computed(() => {
    const count = this.messagesSeen();

    if (count === 0) {
      return 'Tu primer mensajito está esperando';
    }

    if (count === 1) {
      return '1 mensajito recibido';
    }

    return `${count} mensajitos recibidos`;
  });

  private lastIndex = -1;

  protected giveMeMotivation(): void {
    let nextIndex = 0;

    if (this.messages.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * this.messages.length);
      } while (nextIndex === this.lastIndex);
    }

    this.lastIndex = nextIndex;
    this.currentMessage.set(this.messages[nextIndex]);
    this.messagesSeen.update((count) => count + 1);
  }
}
