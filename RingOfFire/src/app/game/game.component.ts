import { Component, OnInit } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, doc, deleteDoc, addDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
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

  firestore: Firestore = inject(Firestore);
  items$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }  //private firestore: Firestore

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameID = params['id'];


      const aCollection = collection(this.firestore, 'games');
      this.items$ = collectionData(aCollection, this.gameID);
      this.items$.subscribe((newGame: any) => {
        this.test = newGame;
        console.log('this is newgame:', newGame)
        for (let i = 0; i < newGame.length; i++) {
          this.game.currentPlayer = newGame[i].currentPlayer;
          this.game.playedCards = newGame[i].playedCards;
          this.game.players = newGame[i].players;
          this.game.stack = newGame[i].stack;
          this.game.pickCardAnimation = newGame[i].pickCardAnimation;
          this.game.currentCard = newGame[i].currentCard;
        }
        // this.game.currentPlayer = newGame[i].currentPlayer;  
        // this.game.playedCards = newGame[i].playedCards;
        // this.game.players = newGame[i].players;
        // this.game.stack = newGame[i].stack;
        // this.game.pickCardAnimation = newGame[i].pickCardAnimation;
        // this.game.currentCard = newGame[i].currentCard;
      });

    })

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
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


