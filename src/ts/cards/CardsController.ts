import { CardFactory } from "./CardFactory";
import { CardsManager } from "./CardsManager";
import { EventSystem } from "../lib/eventSystem/EventSystem";
import { GameConstants } from "../lib/GameConstants";
import { BaseGameView } from "../basegame/view/BaseGameView";
import { BaseGameModel } from "../basegame/model/BaseGameModel";
import { GameObjects } from "phaser";

export class CardsController {
    public cardFactory!: CardFactory;
    public cardsManager!: CardsManager;
    protected dealerMtr!: GameObjects.Text;
    protected playerMtr!: GameObjects.Text;
    protected hitBtn!: GameObjects.Image;
    protected standBtn!: GameObjects.Image;
    protected playerAndDealerMtrContainer!: GameObjects.Container;
    protected view: BaseGameView;
    protected model: BaseGameModel;
    constructor(view: BaseGameView, model: BaseGameModel) {
        this.view = view;
        this.model = model;
        this.initialize();
        this.initializeCardFactory()
        this.initializeCardManager();
        this.updatePlayerDealerMtr();
        EventSystem.addEventListener(GameConstants.ON_DEAL_CLICKED, this.onDealClicked, this);
        EventSystem.addEventListener(GameConstants.UPDATE_PLAYER_DEALER_MTR, this.updatePlayerDealerMtr, this);
        EventSystem.addEventListener(GameConstants.RESET_ALL, this.reset, this)
    }
    protected initialize() {
        this.playerMtr = this.view.getComponentByID("playerMeter") as GameObjects.Text;
        this.dealerMtr = this.view.getComponentByID("dealerMeter") as GameObjects.Text;
        this.playerAndDealerMtrContainer = this.view.getComponentByID("playerAndDealerMtrContainer") as GameObjects.Container;
        this.hitBtn = this.view.getComponentByID("hitButton") as GameObjects.Image;
        this.standBtn = this.view.getComponentByID("standButton") as GameObjects.Image;
        this.hitBtn.on('pointerdown', this.onHitBtnPressup,this);
        this.standBtn.on('pointerdown', this.onStandBtnPressup,this);
    }
    protected initializeCardFactory() {
        this.cardFactory = new CardFactory(this.view.cache.json.entries.get("loading").cards,this.view)
    }
    protected initializeCardManager() {
        this.cardsManager = new CardsManager(this.view, this.cardFactory);
    }
    protected onDealClicked() {
        this.cardsManager.drawFirstTwoCards();
        this.playerAndDealerMtrContainer.visible = true;
    }
    protected updatePlayerDealerMtr() {
        this.playerMtr.text = String(this.cardsManager.getPlayerScore());
        this.dealerMtr.text = String(this.cardsManager.getDealerScore());
    }
    protected onHitBtnPressup() {
        this.cardsManager.drawCardForPlayer(0);
    }
    protected onStandBtnPressup() {
        this.cardsManager.isPlayerDone = true;
          this.cardsManager.hitAndStandBtnContainer.visible = false;
        this.cardsManager.flipDealerFirstCard();

    }
    protected reset() {
        this.playerAndDealerMtrContainer.visible = false;
        this.cardsManager.hitAndStandBtnContainer.visible = false;
    }
}
