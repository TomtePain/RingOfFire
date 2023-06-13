export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string | undefined;
    public profil_images: string[] = ['Avatar_3.svg','AvatarBird01.svg','Female-Avatar-2.svg','Female-Avatar-3.svg','Female-Avatar-4.svg','Female-Avatar-5.svg','Male-Avatar-2.svg','Male-Avatar-3.svg','raphie_green_lanthern_smiley.svg'];
    public player_images: string[] = [];

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }
    public toJSON() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard || null,
            profil_images: this.profil_images,
            player_images: this.player_images
        };
    }

}

function shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
