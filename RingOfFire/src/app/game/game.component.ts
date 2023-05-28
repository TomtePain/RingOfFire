import { Component } from '@angular/core';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game = new Game;


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
      this.game.playedCards.push(this.currentCard!);
      console.log('this is the playedCard', this.currentCard )
      console.log(this.game.playedCards)

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
