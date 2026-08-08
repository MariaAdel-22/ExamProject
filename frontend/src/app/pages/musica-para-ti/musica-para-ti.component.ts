import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

@Component({
  selector: 'app-musica-para-ti',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './musica-para-ti.component.html',
  styleUrl: './musica-para-ti.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicaParaTiComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /*
   * PEGA AQUÍ EL ID DE TU PLAYLIST DE YOUTUBE.
   *
   * Ejemplo:
   * https://www.youtube.com/playlist?list=PL123456789ABCDEFG
   *
   * El ID es únicamente lo que viene después de:
   * list=
   *
   * En ese ejemplo sería:
   * PL123456789ABCDEFG
   */
  private readonly playlistId: string = 'PLHKLrn1h9UxI';

  protected readonly playlistTitle = 'Una playlist hecha para acompañarte';
  protected readonly dedication =
    'La hice pensando en ti, para que tengas un pedacito de mí sonando de fondo.';

  protected readonly hasPlaylist =
    this.playlistId !== 'PEGA_AQUI_EL_ID_DE_TU_PLAYLIST' &&
    this.playlistId.trim().length > 0;

  protected readonly playlistEmbedUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(this.playlistId)}&rel=0`
    );

  protected readonly playlistPublicUrl =
    `https://www.youtube.com/playlist?list=${encodeURIComponent(this.playlistId)}`;
}
