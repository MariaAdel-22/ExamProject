import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

type LetterTone = 'purple' | 'pink' | 'peach' | 'sage';

interface OpenWhenLetter {
  id: number;
  eyebrow: string;
  title: string;
  preview: string;
  tone: LetterTone;
  stamp: string;
  greeting: string;
  paragraphs: readonly string[];
  closing: string;
}

@Component({
  selector: 'app-abrir-cuando',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './abrir-cuando.component.html',
  styleUrl: './abrir-cuando.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbrirCuandoComponent {
  protected readonly selectedLetter = signal<OpenWhenLetter | null>(null);

  protected readonly letters: readonly OpenWhenLetter[] = [
    {
      id: 1,
      eyebrow: 'Abrir cuando...',
      title: 'estés a punto de entrar a un examen',
      preview: 'Para ese momento en el que ya no sirve estudiar nada más.',
      tone: 'purple',
      stamp: '✦',
      greeting: 'Mi tesorito,',
      paragraphs: [
        'Si estás leyendo esto, probablemente tengas los apuntes cerrados y la cabeza todavía repasando cosas por su cuenta. Así que no voy a decirte que estudies un poquito más porque ya hiciste lo que podías hacer antes de llegar hasta esa puerta.',
        'Ahora solo quiero que entres con confianza sin necesidad de recordar cada palabra exactamente como estaba escrita. Has llegado hasta aquí después de dedicarle horas y sé que va a salir bien.',
        'Si aparece una pregunta que no esperabas, no dejes que una sola pregunta decida cómo vas a sentirte durante todo el examen. Empieza por lo que sí reconoces y dale tiempo a tu cabeza a las preguntas con las que dudas, muchas veces sabes más de lo que parece después de los primeros segundos.'
      ],
      closing: 'Cuando salgas, sea como sea, aquí voy a estar. Te amo mucho mi pichoncita hermosa.'
    },
    {
      id: 2,
      eyebrow: 'Abrir cuando...',
      title: 'creas que no recuerdas nada',
      preview: 'Para cuando los apuntes empiecen a parecer escritos en otro idioma.',
      tone: 'sage',
      stamp: '♡',
      greeting: 'Bexabé, mi amor,',
      paragraphs: [
        'Hay un momento muy cruel cuando llevas muchas horas estudiando: miras algo que ayer entendías y de repente parece que jamás lo habías visto. Quiero que sepas que ese momento no te abrume.',
        'Tu cabeza también se cansa y sé que cuando estás saturada, acceder a lo que sabes se vuelve más difícil. Así que antes de castigarte por no recordar algo al instante, cambia de postura, bebe agua, mira un punto fijo y date unos minutos de silencio.',
        'La mente necesita su momento para poder conectar con lo que recuerdas.'
      ],
      closing: 'No confundas cansancio con incapacidad, mi amor. Son cosas muy distintas. 💜'
    },
    {
      id: 3,
      eyebrow: 'Abrir cuando...',
      title: 'un examen no haya salido como querías',
      preview: 'Esta no intenta convencerte de que “da igual”, porque sé que no da igual.',
      tone: 'pink',
      stamp: '♥',
      greeting: 'Mi tesorito,',
      paragraphs: [
        'No voy a decirte “seguro que salió mejor de lo que piensas” porque quizá ahora mismo eso no sea lo que necesitas escuchar. Si has salido decepcionada, enfadada o con ganas de llorar, voy a estar aquí contigo para soltar toda la frustración que tienes dentro.',
        'También quiero recordarte que una nota mala no pueden deducir la capacidad de la mujer que yo conozco.',
        'Y si después toca aprender de lo que pasó, ya habrá tiempo. Pero hoy primero toca volver a la casa de tu tía abuela Elisa y comer algo delicioso antes de descansar. Hablar si quieres hablar o quedarte callada si no quieres hacerlo.'
      ],
      closing: 'No tienes que traerme una buena nota para que yo esté orgullosa de ti. Eso ya venía de antes.'
    },
    {
      id: 4,
      eyebrow: 'Abrir cuando...',
      title: 'me extrañes demasiado',
      preview: 'Para uno de esos días en los que el día se hace más largo que de costumbre.',
      tone: 'peach',
      stamp: '☾',
      greeting: 'Bexabé,',
      paragraphs: [
        'Hay días en los que la distancia se porta bien: hablamos, nos reímos y casi parece pequeña. Y luego hay otros en los que de pronto pesa todo lo que no podemos hacer por una pantalla. Si hoy es uno de esos días, no quiero intentar hacerte creer que no pasa nada.',
        'Yo también deseo estar en la misma habitación y poder alcanzarte con la mano. Verte estudiar mientras yo hago cualquier otra cosa o compartir silencios de esos que no necesitan conexión a internet.',
        'Pero hay algo bonito dentro de todo esto: cada día que seguimos eligiéndonos es un día en el que nuestra historia existe a pesar de los kilómetros. Y porque ya va quedando menos para cumplir nuestras metas, dentro de poquito ya me tienes ahí con un anillo en tu mano.'
      ],
      closing: 'Hasta que pueda acercarme en unas semanas: imagina que te doy un besito en la frente. Te amo, mi tesorito.'
    },
    {
      id: 5,
      eyebrow: 'Abrir cuando...',
      title: 'sean las tantas y sigas despierta',
      preview: 'Una carta cortita, para leer casi con los ojos cerrados.',
      tone: 'purple',
      stamp: '☁',
      greeting: 'Mi pichoncita nocturna,',
      paragraphs: [
        'A estas horas tu cerebro seguramente quiera resolver mañana, pasado mañana y media vida antes de dejarte dormir. No le hagas demasiado caso porque las preocupaciones de madrugada tienen una habilidad especial para volver todo muy engorroso.',
        'Nada de lo que tengas que solucionar mañana necesita que lo soluciones ahora desde la almohada. Puedes dejar pensamientos sin terminar y puedes no llegar a ninguna conclusión esta noche.',
        'Afloja la mandíbula, baja los hombros y deja que la cama sostenga todo el peso que tú llevas sosteniendo durante el día. No tienes más que dejarte llevar por el silencio calmado de la noche.'
      ],
      closing: 'Si pudiera, apagaría yo la luz y te diría “duerme, mi amor”. Así que imagina que acabo de hacerlo.'
    },
    {
      id: 6,
      eyebrow: 'Abrir cuando...',
      title: 'dudes de si eres suficiente',
      preview: 'Esta va sobre ti.',
      tone: 'sage',
      stamp: '✿',
      greeting: 'Mi Bexabé,',
      paragraphs: [
        'Hay algo que quiero dejar escrito porque a veces las inseguridades hablan más fuerte que las personas que te quieren: yo no estoy esperando una versión corregida de ti.',
        'No necesito que desaparezcan tus dudas o que siempre tengas confianza, que nunca te equivoques o te pases de brusca. Te amo con tus días seguros y con aquellos en los que necesitas que te recuerden lo que tú no consigues ver.',
        'Y cuando tú mires algo de ti con demasiada dureza, probablemente yo siga viendo a la misma mujer que ama y protege a su gente con una fuerza preciosa, que se indigna ante las injusticias, que piensa muchísimo las cosas y que ha conseguido enseñarme a mirar de otra manera historias que yo antes juzgaba demasiado rápido.'
      ],
      closing: 'Eres lo más valioso que tengo en mi vida'
    },
    {
      id: 7,
      eyebrow: 'Abrir cuando...',
      title: 'necesites reírte un poquito',
      preview: 'Esta carta tiene un poco de tontería.',
      tone: 'peach',
      stamp: '☆',
      greeting: 'Atención, mi sapiña:',
      paragraphs: [
        'Se ha emitido una alerta importante desde España: una estudiante de Psicología extremadamente adorable ha sido detectada estudiando demasiado tiempo seguido.',
        'Las autoridades competentes (o sea yo, porque me acabo de inventar este organismo) recomiendan una intervención inmediata: mover las piernas, buscar algo rico, mirar un vídeo del youtuber gringo con una capucha y barba y decir en voz alta “mi mujer tenía razón”, aunque esta última medida todavía está siendo revisada por falta de objetividad científica.',
        'Si después de leer esto no te has reído, tienes derecho a presentar una reclamación. Será atendida por el mismo departamento que emitió la alerta y probablemente responderá con un beso.'
      ],
      closing: 'Gracias por utilizar el Servicio Internacional de Mimos España. Vuelva pronto. ♥'
    },
    {
      id: 8,
      eyebrow: 'Abrir cuando...',
      title: 'termines el último examen',
      preview: 'La última carta para cerrar la semana.',
      tone: 'pink',
      stamp: '✦',
      greeting: 'Mi vida, ya está.',
      paragraphs: [
        'Ya está porque llegaste al final de estos días que antes parecían enormes desde lejos.',
        'Quiero que mires hacia atrás un momento y cuentes todas las veces que te sentaste aunque no te apetecía, estudiando temas que parecían interminables y ahora ya están detrás. Las noches en las que estabas cansada o con nervios antes de entrar. Todo eso ya ocurrió y tú atravesaste cada parte.',
        'Ahora me gustaría que cuando llegues a casa nos pongamos a viciar a Crime Simulator y el nuevo juego que parece Rust pero que no es.'
      ],
      closing: 'Estoy orgullosa de ti, mi adorable Bexabé. Tu mujer te quiere muchísimo. 💜'
    }
  ];

  protected readonly openedLetterIds = signal<readonly number[]>([]);

  protected readonly openedCount = computed(
    () => this.openedLetterIds().length
  );

  protected openLetter(letter: OpenWhenLetter): void {
    if (!this.openedLetterIds().includes(letter.id)) {
      this.openedLetterIds.update((ids) => [...ids, letter.id]);
    }

    this.selectedLetter.set(letter);

    requestAnimationFrame(() => {
      document
        .querySelector('.opened-letter')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  protected closeLetter(): void {
    this.selectedLetter.set(null);
  }

  protected isOpened(id: number): boolean {
    return this.openedLetterIds().includes(id);
  }
}
