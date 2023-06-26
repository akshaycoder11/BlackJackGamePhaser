import { GameObjects, Scene } from "phaser";
import { GameConstants } from "../../lib/GameConstants";
import { MyGame } from "../../lib/core/GlobalConstants";
import { EventSystem } from "../../lib/eventSystem/EventSystem";
import { BaseGameModel } from "../model/BaseGameModel";
import { BaseGameView } from "../view/BaseGameView";
import { ChipsController } from "../../chips/ChipsController";
import { CardsController } from "../../cards/CardsController";

export class BaseGameController {
    protected view: BaseGameView;
    protected model: BaseGameModel;
    protected chipBankContainer!: GameObjects.Container;
    protected placingBetConatiner!: GameObjects.Container;
    protected winpresentaionContainer!: GameObjects.Container;
    protected betMtrContainer!: GameObjects.Container;
    protected betMtr!: GameObjects.Text;
    protected showChipbankforBet: boolean = true;
    protected dealBtn!: GameObjects.Image;
    protected cardController!: CardsController;
    protected playerWon!: GameObjects.Image;
    protected dealerWon!: GameObjects.Image;
    protected playerBust!: GameObjects.Image;
    protected dealerBust!: GameObjects.Image;
    protected shuffleCards!: GameObjects.Image;
    protected replacingBetBtn!:GameObjects.Image;
    protected deckSizeMtr!: GameObjects.Text;
    private movingSpeed: number = 10;
    constructor(view: BaseGameView, model: BaseGameModel) {
        this.view = view;
        this.model = model;
        this.initialize();
        this.initializeChipsController();
        this.initializeCardsController();           /* this class is used for controlling other classes  */
        this.showAndHideChipBank();
        this.updateDealBtnVisibilty();
    }
    protected initializeChipsController() {
        new ChipsController(this.view, this.model);
    }
    protected initializeCardsController() {
        this.cardController = new CardsController(this.view, this.model);
    }
    protected initialize() {
        this.chipBankContainer = this.view.getComponentByID("chipBankContainer") as GameObjects.Container;
        this.placingBetConatiner = this.view.getComponentByID("placingBetContainer") as GameObjects.Container;
        this.betMtrContainer = this.view.getComponentByID("betMtrContainer") as GameObjects.Container;
        this.winpresentaionContainer = this.view.getComponentByID("winPresentaionContainer") as GameObjects.Container;
        this.playerBust = this.view.getComponentByID("playerBust") as GameObjects.Image;
        this.dealerBust = this.view.getComponentByID("dealerBust") as GameObjects.Image;
        this.playerWon = this.view.getComponentByID("playerWin") as GameObjects.Image;
        this.dealerWon = this.view.getComponentByID("dealerWin") as GameObjects.Image;
        this.shuffleCards = this.view.getComponentByID("shuffle") as GameObjects.Image
        this.betMtr = this.view.getComponentByID("totalBetMeter") as GameObjects.Text;
        this.deckSizeMtr = this.view.getComponentByID("deckSizeMeter")
        this.dealBtn = this.view.getComponentByID("PlaceDealBtn") as GameObjects.Image;
        this.replacingBetBtn=this.view.getComponentByID("replacingBetButton") as GameObjects.Image;
        // this.placingBetConatiner.on('pointerdown', this.rePlacingBet, this);
        // this.placingBetConatiner.setInteractive({ useHandCursor: true, });
        this.dealBtn.on('pointerdown', this.onDealBtnPressup, this);
        this.replacingBetBtn.on('pointerdown', this.rePlacingBet, this);
        EventSystem.addEventListener(GameConstants.UPDATE_DEAL_BTN_VISIBILITY, this.updateDealBtnVisibilty, this)
        EventSystem.addEventListener(GameConstants.SHOW_AND_HIDE_CHIP_BANK, this.showAndHideChipBank, this);
        EventSystem.addEventListener(GameConstants.SHOW_WIN_PRESENTAION, this.showWinPresentaion, this);
        EventSystem.addEventListener(GameConstants.UPDATE_DECK_SIZE_MTR, this.updateDeckSizeMtr, this);
    }
    protected showWinPresentaion() {
        this.cardController.cardsManager.hitAndStandBtnContainer.visible = false;
        this.winpresentaionContainer.visible = true;
        if (this.cardController.cardsManager.isPlayerBust) {
            this.playerBust.visible = true;
            this.dealerWon.visible = true;
        } else if (this.cardController.cardsManager.isDealerBust) {
            this.dealerBust.visible = true;
            this.playerWon.visible = true;
        } else if (MyGame.baseGameModel.getIsPlayerWon()) {
            this.playerWon.visible = true;                        // this function is used for showing win at last //
        } else {
            this.dealerWon.visible = true;
        }
        if (this.cardController.cardFactory.getDeckSize() <= 10) {
            window.setTimeout(() => {
                this.playerWon.visible = false;
                this.dealerWon.visible = false;
                this.playerBust.visible = false;
                this.dealerBust.visible = false;
                this.shuffleCards.visible = true;
                this.cardController.cardFactory.shuffleAllCards();
                this.updateDeckSizeMtr();
            }, 1500);
            window.setTimeout(() => {
                this.winpresentaionContainer.visible = false;
                this.playerWon.visible = false;
                this.dealerWon.visible = false;
                this.playerBust.visible = false;
                this.dealerBust.visible = false;
                this.shuffleCards.visible = false;
            }, 2500)
        } else {
            window.setTimeout(() => {
                this.winpresentaionContainer.visible = false;
                this.playerWon.visible = false;
                this.dealerWon.visible = false;
                this.playerBust.visible = false;
                this.dealerBust.visible = false;
            }, 2000)
        }

    }
    protected updateDeckSizeMtr() {
        this.deckSizeMtr.text = String(this.cardController.cardFactory.getDeckSize());
    }
    public updateDealBtnVisibilty() {
        if (this.model.getBetAmount()) {
            this.dealBtn.visible = true;
            this.betMtrContainer.visible = true;
            this.betMtr.text = String(`$${this.model.getBetAmount()}`);
        } else {
            this.dealBtn.visible = false;
            this.betMtrContainer.visible = false;
        }
    }
    protected onDealBtnPressup() {
        this.dealBtn.visible = false;
        this.showAndHideChipBank();
        EventSystem.dispatch(GameConstants.ON_DEAL_CLICKED);
    }
    protected rePlacingBet() {
        EventSystem.dispatch(GameConstants.REPLACE_BET_CLICKED);
    }
    protected showAndHideChipBank() {
        var tween: any;
        if (this.showChipbankforBet) {
            tween = this.view.add.tween({
                targets: this.chipBankContainer,
                y: 121,
                duration: 500,
                ease: "Linear.In",
            })
            this.showChipbankforBet = false;
            // this.placingBetConatiner.setInteractive({ useHandCursor: true });               // this function is used for chip bank movement
        } else {
            this.showChipbankforBet = true;
            // this.placingBetConatiner.setInteractive({ useHandCursor: true });
            tween = this.view.add.tween({
                targets: this.chipBankContainer,
                y: 400,
                duration: 500,
                ease: "Linear.In",
            })
        }
    }
}