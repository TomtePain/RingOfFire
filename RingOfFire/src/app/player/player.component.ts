import { Component, Input } from '@angular/core';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent extends Game{

  @Input() name: any;
  @Input() playerActive:boolean = false;

}
