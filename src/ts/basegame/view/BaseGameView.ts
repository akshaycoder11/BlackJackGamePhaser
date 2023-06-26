import { MyGame } from "../../lib/core/GlobalConstants";
import { BaseView } from "../../lib/view/BaseView";
import { BaseGameController } from "../controller/BaseGameController";
import { BaseGameModel } from "../model/BaseGameModel";

export class BaseGameView extends BaseView {
    constructor() {
        super("BaseGameView");
    }

    protected preload() {
        //    let obj = this.cache.json.entries.get("loading").BaseGame;
        // for (let propt in obj) {
        //     this.load.image(`${propt}`,`${obj[propt]}`);
        // }
        this.load.image("gameBG", "./res/images/GameBg.png");
        this.load.image("ChipsBG", "./res/images/ChipsBG.png");
        this.load.image("MtrBlurBg", "./res/images/MtrBlurBg.png");
        this.load.image("DealButtonHover", "./res/images/DealButtonHover.png");
        this.load.image("DealButtonNormal", "./res/images/DealButtonNormal.png");
        this.load.image("cardFront", "./res/images/cardFront.png");
        this.load.image("HitHover", "./res/images/HitHover.png");
        this.load.image("HitNormal", "./res/images/HitNormal.png");
        this.load.image("Bust", "./res/images/Bust.png");
        this.load.image("DealerWin", "./res/images/DealerWin.png");
        this.load.image("PlayerWin", "./res/images/PlayerWin.png");
        this.load.image("Shuffle", "./res/images/shuffle.png");
        this.load.image("DeckSize", "./res/images/DeckSize.png");
        this.load.image("StandHover", "./res/images/StandHover.png");
        this.load.image("StandNormal", "./res/images/StandNormal.png");
        this.load.image("blank", "./res/images/blank.png");
        this.load.image("PlayerMtrBG", "./res/images/PlayerMtrBG.png");
        this.load.image("DealerMtrBG", "./res/images/DealerMtrBG.png");
        this.load.atlas('cards-data_0', './res/images/cards-0.png','./res/images/cards-0.json');
        this.load.atlas('cards-data_1', './res/images/cards-1.png','./res/images/cards-1.json');
        this.load.atlas('cards-data_2', './res/images/cards-2.png','./res/images/cards-2.json');
        this.load.atlas('cards-data_3', './res/images/cards-3.png','./res/images/cards-3.json');
        this.load.atlas('cards-data_4', './res/images/cards-4.png','./res/images/cards-4.json');
        this.load.atlas('cards-data_5', './res/images/cards-5.png','./res/images/cards-5.json');
        this.load.atlas('cards-data_6', './res/images/cards-6.png','./res/images/cards-6.json');
        this.load.atlas('cards-data_7', './res/images/cards-7.png','./res/images/cards-7.json');
        this.load.atlas('cards-data_8', './res/images/cards-8.png','./res/images/cards-8.json');
        this.load.atlas('tableLayout', './res/images/table.png', './res/images/table.json');
    }
    protected create() {
        this.setView(this.cache.json.entries.get("loading").BaseGame)
        super.create();
        const model = MyGame.baseGameModel = new BaseGameModel();
        new BaseGameController(this, model);
    }
}