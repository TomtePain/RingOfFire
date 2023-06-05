import { Component } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc } from 'firebase/firestore';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router, private firestore: Firestore) { }

  newGame() {
    let game = new Game();
    
    const aCollection = collection(this.firestore, 'games');
    const newGame = game.toJSON();
    addDoc(aCollection, {newgame: newGame}).then((gameInfo:any) => {
  
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })

    
  }
}
