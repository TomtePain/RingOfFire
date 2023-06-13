import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {

  @Input() avatar: string = '';

 
  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<PlayerEditComponent>) { }

  images = ['Avatar_3.svg','AvatarBird01.svg','Female-Avatar-2.svg','Female-Avatar-3.svg','Female-Avatar-4.svg','Female-Avatar-5.svg','Male-Avatar-2.svg','Male-Avatar-3.svg','raphie_green_lanthern_smiley.svg'];

  ngOnInit(): void {
    
  }

  onNoClick() {
    this.dialogRef.close();
  }

  

}
