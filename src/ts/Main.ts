
import { Game } from 'phaser'
import { Constants } from "./lib/Constants";
import { MyGame } from "./lib/core/GlobalConstants";
import { PostIntroView } from './posIntro/view/PostIntroView';
import { BaseGameView } from './basegame/view/BaseGameView';
export class MainGame  {
    private game!: Game;
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 1280,
            height: 768,
            backgroundColour:0x000FF,
            scene: [PostIntroView,BaseGameView]
        }
       MyGame.game =this.game= new Game(config);
        //@ts-expect-error
        globalThis.__PHASER_GAME__ = this.game  //this is used for phaser tool;
    }
}
new MainGame();