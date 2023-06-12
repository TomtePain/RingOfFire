import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<PlayerEditComponent>,) {}
  ngOnInit(): void {
    
  }


  onNoClick() {
    this.dialogRef.close();
  }

}
