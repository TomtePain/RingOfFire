import { Component, OnInit } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, doc, deleteDoc, addDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  game: Game = new Game;
  test: Array<any> | undefined;
  gameID: string | any;

  firestore: Firestore = inject(Firestore);
  items$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,) { }  //private firestore: Firestore

  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameID = params['id'];


      const aCollection = collection(this.firestore, 'games');
      this.items$ = collectionData(aCollection, this.gameID);
      this.items$.subscribe((newGame: any) => {
        this.test = newGame;
        this.game.currentPlayer = this.test![0].currentPlayer;
        this.game.playedCards = this.test![0].playedCards;
        this.game.players = this.test![0].players;
        this.game.stack = this.test![0].stack;
        this.game.pickCardAnimation = this.test![0].pickCardAnimation;
        this.game.currentCard = this.test![0].currentCard;
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
    await updateDoc( aCollection, newGameJSON );
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


