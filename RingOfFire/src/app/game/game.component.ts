import { Component } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game = new Game;
  test: Array<any> | undefined;

  firestore: Firestore = inject(Firestore);
  items$: Observable<any> | undefined;

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.newGame();
    const aCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(aCollection);
    this.items$.subscribe((newTests) => {
      this.test = newTests;
    });
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
      if(name && name.length > 0) { this.game.players.push(name) };
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


