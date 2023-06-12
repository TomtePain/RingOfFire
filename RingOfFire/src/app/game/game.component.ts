import { Component, OnInit } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, doc, deleteDoc, addDoc, getFirestore, updateDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  game: Game = new Game;
  test: Array<any> | any;
  gameID: string | any;
  gameOver = false;

  firestore: Firestore = inject(Firestore);
  items$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { } 
  ngOnInit() {
    this.newGame();


    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameID = params['id'];

      const aCollection = collection(this.firestore, 'games');
      const gameDocRef = doc(aCollection, this.gameID);

      docData(gameDocRef).subscribe((newGame: any) => {
        this.game.currentPlayer = newGame.currentPlayer;
        this.game.playedCards = newGame.playedCards;
        this.game.players = newGame.players;
        this.game.stack = newGame.stack;
        this.game.pickCardAnimation = newGame.pickCardAnimation;
        this.game.currentCard = newGame.currentCard;
      });
    })
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(this.game.stack.length == 0 ) {
      this.gameOver = true;
    }else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard!);
        this.game.pickCardAnimation = false;
        this.showActivePlayer();
        this.saveGame();
      }, 1200);
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      };
    });
  }


  async saveGame() {
    const aCollection = doc(this.firestore, 'games', this.gameID);
    let newGameJSON = this.game.toJSON();
    await updateDoc(aCollection, newGameJSON);
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


