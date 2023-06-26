
import { EventSystem } from "../lib/eventSystem/EventSystem";
import { GameConstants } from "../lib/GameConstants";
import { Card } from "./Card";
import { CardFactory } from "./CardFactory";
import { MyGame } from "../lib/core/GlobalConstants";
import { BaseGameView } from "../basegame/view/BaseGameView";
import { GameObjects, Tweens } from "phaser";

export class CardsManager {
    protected view: BaseGameView;
    protected cardFactory: CardFactory;
    protected playerCards: Card[] = [];
    protected dealerCards: Card[] = [];
    protected playerLastCardX!: number;
    protected dealerLastCardX!: number;
    protected cardgap!: number;
    protected cardsContainer!: GameObjects.Container;
    public hitAndStandBtnContainer!: GameObjects.Container;
    public isPlayerDone: boolean = false;
    public isPlayerBust: boolean = false;
    public isDealerDone: boolean = false;
    public isDealerBust: boolean = false;
    public DEALER_STOP_VALUE = 17;
    protected playerScore: number = 0;
    protected dealerScore: number = 0;
    protected flipCard!: GameObjects.Image;
    constructor(view: BaseGameView, cardFactory: CardFactory) {
        this.view = view;
        this.cardFactory = cardFactory;
        this.initialize();
    }
    protected initialize() {
        this.cardsContainer = this.view.getComponentByID("cardsContainer") as GameObjects.Container;
        this.hitAndStandBtnContainer = this.view.getComponentByID("hitAndStandBtnContainer") as GameObjects.Container
    }
    public drawFirstTwoCards(): void {
        this.cardsContainer.visible = true;
        this.playerCards = [], this.dealerCards = [];
        this.isPlayerDone = false;
        this.isPlayerBust = false;
        this.isDealerBust = false
        this.isDealerDone = false;
        this.dealerScore = 0;
        this.playerScore = 0;
        this.playerLastCardX = 600;
        this.dealerLastCardX = 600;
        this.cardgap = 40
        let i = 0;
        while (i < 3) {
            if (i < 2) {
                this.drawCardForPlayer(400 * i);
            } else {
                this.drawFirstTwoDealerCard();
            }
            i++;
        }
    }
    protected drawFirstTwoDealerCard() {
        // this.flipCard = new Sprite(Assets.get("cardFront"));
        this.flipCard = this.view.add.image(-150, -150, "cardFront");
        this.flipCard.setScale(0.22, 0.22);
        this.flipCard.x = -150;
        this.flipCard.y = -150;
        this.cardsContainer.add(this.flipCard);
        var flipcardTween;
        const tweenData_flipcard = {
            targets: this.flipCard,
            x: this.dealerLastCardX,
            y: 160,
            duration: 500,
            delay: 800,
            ease: "Quadratic.In",
        };
        flipcardTween = this.view.add.tween(tweenData_flipcard);
        MyGame.baseGameModel.fakeCardShownToUser = 1;
        this.dealerLastCardX -= this.cardgap;
        const card_b: Card = this.cardFactory.getRandomCard();
        this.dealerCards.push(card_b);
        this.cardsContainer.add(card_b);
        var tween_b: Tweens.Tween;
        const tweenData_b = {
            targets: card_b,
            x: this.dealerLastCardX,
            y: 160,
            duration: 500,
            delay: 1200,
            ease: "Quadratic.In",
            onComplete: () => {
                this.hitAndStandBtnContainer.visible = true;
            }

        };
        tween_b = this.view.add.tween(tweenData_b);
        this.updateDealerScore(card_b);
        EventSystem.dispatch(GameConstants.UPDATE_PLAYER_DEALER_MTR);
        this.dealerLastCardX -= this.cardgap;
    }
    public flipDealerFirstCard() {
        var flipcardTween: Tweens.Tween;
        MyGame.baseGameModel.fakeCardShownToUser = 0;
        const tweenData_flipcard = {
            targets: this.flipCard,
            x: this.dealerLastCardX + this.cardgap,
            y: 160,
            duration: 300,
            delay: 0,
            ease: "Quadratic.In",
            onComplete: () => {
                this.cardsContainer.remove(this.flipCard);
                this.view.children.remove(this.flipCard);
            }
        };
        flipcardTween = this.view.add.tween(tweenData_flipcard);

        const card_b: Card = this.cardFactory.getRandomCard();
        this.dealerCards.push(card_b);
        card_b.x = this.dealerLastCardX + this.cardgap;
        card_b.y = 160;
        this.cardsContainer.addAt(card_b, 0);
        var tween_b: Tweens.Tween;
        const tweenData_b = {
            targets: card_b,
            x: card_b.x + this.cardgap,
            y: 160,
            duration: 300,
            delay: 300,
            ease: "Quadratic.In",
            onComplete: () => {
                window.setTimeout(() => {
                    if (this.isPlayerDone && this.isDealerDone)
                        return;
                    this.checkForWin();
                }, 1000,)
            }
        };
        tween_b = this.view.add.tween(tweenData_b);
        window.setTimeout(() => {
            this.updateDealerScore(card_b);
            EventSystem.dispatch(GameConstants.UPDATE_PLAYER_DEALER_MTR);
        }, 500)

    }
    public drawCardForDealer(delay: number) {
        if (this.DEALER_STOP_VALUE > this.getDealerScore()) {
            const card_b: Card = this.cardFactory.getRandomCard();
            this.dealerCards.push(card_b);
            this.cardsContainer.add(card_b);
            var tween_b: Tweens.Tween;
            const tweenData_b = {
                targets: card_b,
                x: this.dealerLastCardX,
                y: 160,
                duration: 500,
                delay: delay,
                ease: "Quadratic.In",
                onComplete: () => {
                    window.setTimeout(() => {
                        this.checkForWin();
                    }, 1000)
                }
            };
            tween_b = this.view.add.tween(tweenData_b);
            window.setTimeout(() => {
                this.updateDealerScore(card_b);
                EventSystem.dispatch(GameConstants.UPDATE_PLAYER_DEALER_MTR)
            }, 400 + delay)
                ;
            this.dealerLastCardX -= this.cardgap;
        } else {
            this.isDealerDone = true;
            this.checkForWin();
        }
    }
    public drawCardForPlayer(delay: number) {
        const card_p: Card = this.cardFactory.getRandomCard();
        this.playerCards.push(card_p);
        this.cardsContainer.add(card_p);

        var tween_p: Tweens.Tween;

        const tweenData_p = {
            targets: card_p,
            x: this.playerLastCardX,
            y: 540,
            duration: 500,
            delay: delay,
            ease: "Quadratic.In",
            onComplete: () => {
                this.checkForWin();
            }
        };
        tween_p = this.view.add.tween(tweenData_p);
        window.setTimeout(() => {
            this.updatePlayerScore(card_p);
            EventSystem.dispatch(GameConstants.UPDATE_PLAYER_DEALER_MTR);
        }, 400 + delay);

        this.playerLastCardX -= this.cardgap;
    }
    public getPlayerScore(): number {
        return this.playerScore;
    }
    public getDealerScore(): number {
        return this.dealerScore;
    }
    public updatePlayerScore(card: Card) {
        if (card.getFaceValue() == 11) {
            if (this.playerScore + card.getFaceValue() > 21) {
                this.playerScore += (card.getFaceValue() % 10)
            } else {
                this.playerScore += card.getFaceValue();
            }
        } else {
            this.playerScore += card.getFaceValue();
        }
    }
    public updateDealerScore(card: Card) {
        if (card.getFaceValue() == 11) {
            if (this.dealerScore + card.getFaceValue() > 21) {
                this.dealerScore += (card.getFaceValue() % 10)
            } else {
                this.dealerScore += card.getFaceValue();
            }
        } else {
            this.dealerScore += card.getFaceValue();
        }
    }
    public checkForWin() {
        if (this.getPlayerScore() >= 21) {
            if (this.getPlayerScore() > 21) {
                this.isPlayerBust = true;
                MyGame.baseGameModel.setIsPlayerWon(false);
            } else {
                this.isPlayerBust = false;
                MyGame.baseGameModel.setIsPlayerWon(true);
            }
            this.flipDealerFirstCard();
            this.isPlayerDone = true;
            this.isDealerDone = true;
            EventSystem.dispatch(GameConstants.SHOW_WIN_PRESENTAION);
            window.setTimeout(() => {
                this.reset();
            }, 2200)
        } else if (this.getDealerScore() >= 21) {
            if (this.getDealerScore() > 21) {
                this.isDealerBust = true;
                MyGame.baseGameModel.setIsPlayerWon(true);
            } else {
                this.isDealerBust = false;
                MyGame.baseGameModel.setIsPlayerWon(false);
            }
            this.isDealerDone = true;
            this.isPlayerDone = true;
            EventSystem.dispatch(GameConstants.SHOW_WIN_PRESENTAION);
            window.setTimeout(() => {
                this.reset();
            }, 2200)
        } else if (this.isDealerDone) {
            if (this.getDealerScore() > this.getPlayerScore()) {
                MyGame.baseGameModel.setIsPlayerWon(false);
            } else {
                MyGame.baseGameModel.setIsPlayerWon(true);
            }
            EventSystem.dispatch(GameConstants.SHOW_WIN_PRESENTAION);
            window.setTimeout(() => {
                this.reset();
            }, 2200)
        } else if (this.isPlayerDone && !this.isDealerDone) {
            this.drawCardForDealer(300);
        }
    }

    public reset(): void {
        this.clearAll();
        this.playerScore = 0;
        this.dealerScore = 0;
        EventSystem.dispatch(GameConstants.RESET_ALL);
        window.setTimeout(() => {
            EventSystem.dispatch(GameConstants.SHOW_AND_HIDE_CHIP_BANK);
            EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
        }, 800)
    }
    protected clearAll(): void {
        let i = 0, j = 0;
        this.dealerCards.forEach((card: Card) => {
            var removetween_d: Tweens.Tween;
            const tweenData_d = {
                targets: card,
                x: 1100,
                y: -400,
                duration: 300,
                delay: i * 300,
                ease: "Quadratic.In",
                onComplete: () => {
                    card.kill();
                }
            };
            removetween_d = this.view.add.tween(tweenData_d);
            i++;
        });

        this.playerCards.forEach((card: Card) => {
            var removetween_p: Tweens.Tween;
            const tweenData_p = {
                targets: card,
                x: 1100,
                y: -400,
                duration: 300,
                delay: i * 100 + j * 300,
                ease: "Quadratic.In",
                onComplete: () => {
                    card.kill();
                }
            };
            removetween_p = this.view.add.tween(tweenData_p);
            j++;
        });

        // this.playerCards = [];
        // this.dealerCards = [];
    }
}