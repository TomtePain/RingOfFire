import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit{
  name: string = '';

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddPlayerComponent>,) {}
  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
