import { Component, Input } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayerEditComponent } from '../player-edit/player-edit.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent extends Game {

  @Input() name: any;
  @Input() image: any;
  @Input() playerActive: boolean = false;
  
  


  constructor(public dialog: MatDialog) {
    super();
  } 

}


