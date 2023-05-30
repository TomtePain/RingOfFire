import { Component } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game = new Game;

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard!);
        this.pickCardAnimation = false;
        this.showActivePlayer();
      }, 1200);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name);
    });
  }

  currentPlayer() {
    return this.game.currentPlayer
  }

  SumofPlayers() {
    return this.game.players.length
  }

  showActivePlayer() {
    this.game.currentPlayer++;
    if (this.currentPlayer() >= this.SumofPlayers()) { this.game.currentPlayer = 0; } 
  }
}


