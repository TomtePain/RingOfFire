import { Component, Input } from '@angular/core';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent extends Game {

  @Input() name: any;
  @Input() image: any;
  @Input() playerActive: boolean = false;

}
