

import { BaseGameView } from "../basegame/view/BaseGameView";
import { GameConstants } from "../lib/GameConstants";
import { MyGame } from "../lib/core/GlobalConstants";
import { IObject } from "../lib/core/IObject";
import { EventSystem } from "../lib/eventSystem/EventSystem";
import { Card } from "./Card";

export class CardFactory {
    private deck: string[] = [];
    private cardData: IObject;
    protected view: BaseGameView;
    protected cardTexture: Map<string, string> = new Map<string, string>();
    constructor(cardData: IObject, view: BaseGameView) {
        this.cardData = cardData;
        this.view = view;
        this.initializeDeck();
        this.setCardTextures();
    }
    protected initializeDeck(): void {
        this.deck = ["A_OF_Clubs", "2_OF_Clubs", "3_OF_Clubs", "4_OF_Clubs", "5_OF_Clubs", "6_OF_Clubs", "7_OF_Clubs", "8_OF_Clubs", "9_OF_Clubs", "10_OF_Clubs", "J_OF_Clubs", "Q_OF_Clubs", "K_OF_Clubs",
            "A_OF_Diamonds", "2_OF_Diamonds", "3_OF_Diamonds", "4_OF_Diamonds", "5_OF_Diamonds", "6_OF_Diamonds", "7_OF_Diamonds", "8_OF_Diamonds", "9_OF_Diamonds", "10_OF_Diamonds", "J_OF_Diamonds", "Q_OF_Diamonds", "K_OF_Diamonds",
            "A_OF_Hearts", "2_OF_Hearts", "3_OF_Hearts", "4_OF_Hearts", "5_OF_Hearts", "6_OF_Hearts", "7_OF_Hearts", "8_OF_Hearts", "9_OF_Hearts", "10_OF_Hearts", "J_OF_Hearts", "Q_OF_Hearts", "K_OF_Hearts",
            "A_OF_Spades", "2_OF_Spades", "3_OF_Spades", "4_OF_Spades", "5_OF_Spades", "6_OF_Spades", "7_OF_Spades", "8_OF_Spades", "9_OF_Spades", "10_OF_Spades", "J_OF_Spades", "Q_OF_Spades", "K_OF_Spades"];
    }
    protected setCardTextures() {
        this.cardTexture.set("2_OF_Clubs", "cards-data_0");
        this.cardTexture.set("2_OF_Diamonds", "cards-data_0");
        this.cardTexture.set("2_OF_Hearts", "cards-data_0");
        this.cardTexture.set("2_OF_Spades", "cards-data_0");
        this.cardTexture.set("3_OF_Spades", "cards-data_0");
        this.cardTexture.set("3_OF_Hearts", "cards-data_0");
        this.cardTexture.set("3_OF_Diamonds", "cards-data_0");
        this.cardTexture.set("3_OF_Clubs", "cards-data_0");
        this.cardTexture.set("4_OF_Clubs", "cards-data_1");
        this.cardTexture.set("4_OF_Diamonds", "cards-data_1");
        this.cardTexture.set("4_OF_Hearts", "cards-data_1");
        this.cardTexture.set("4_OF_Spades", "cards-data_1");
        this.cardTexture.set("5_OF_Clubs", "cards-data_1");
        this.cardTexture.set("5_OF_Diamonds", "cards-data_1");
        this.cardTexture.set("5_OF_Hearts", "cards-data_1");
        this.cardTexture.set("5_OF_Spades", "cards-data_1");
        this.cardTexture.set("6_OF_Clubs", "cards-data_2");
        this.cardTexture.set("6_OF_Diamonds", "cards-data_2");
         this.cardTexture.set("6_OF_Hearts", "cards-data_2");
        this.cardTexture.set("6_OF_Spades", "cards-data_2");
        this.cardTexture.set("7_OF_Clubs", "cards-data_2");
        this.cardTexture.set("7_OF_Diamonds", "cards-data_2");
        this.cardTexture.set("7_OF_Hearts", "cards-data_2");
        this.cardTexture.set("7_OF_Spades", "cards-data_2");
        this.cardTexture.set("8_OF_Clubs", "cards-data_3");
        this.cardTexture.set("8_OF_Diamonds", "cards-data_3");
        this.cardTexture.set("8_OF_Hearts", "cards-data_3");
        this.cardTexture.set("8_OF_Spades", "cards-data_3");
        this.cardTexture.set("9_OF_Clubs", "cards-data_3");
        this.cardTexture.set("9_OF_Diamonds", "cards-data_3");
        this.cardTexture.set("9_OF_Hearts", "cards-data_3");
        this.cardTexture.set("9_OF_Spades", "cards-data_3");
        this.cardTexture.set("10_OF_Clubs", "cards-data_4");
        this.cardTexture.set("10_OF_Diamonds", "cards-data_4");
        this.cardTexture.set("10_OF_Hearts", "cards-data_4");
        this.cardTexture.set("10_OF_Spades", "cards-data_4");
        this.cardTexture.set("A_OF_Clubs", "cards-data_4");
        this.cardTexture.set("A_OF_Diamonds", "cards-data_4");
        this.cardTexture.set("A_OF_Hearts", "cards-data_4");
        this.cardTexture.set("A_OF_Spades", "cards-data_4");
        this.cardTexture.set("J_OF_Clubs", "cards-data_5");
        this.cardTexture.set("J_OF_Diamonds", "cards-data_5");
        this.cardTexture.set("J_OF_Hearts", "cards-data_5");
        this.cardTexture.set("J_OF_Spades", "cards-data_6");
        this.cardTexture.set("K_OF_Clubs", "cards-data_6");
        this.cardTexture.set("K_OF_Diamonds", "cards-data_6");
        this.cardTexture.set("K_OF_Hearts", "cards-data_6");
        this.cardTexture.set("K_OF_Spades", "cards-data_7");
        this.cardTexture.set("Q_OF_Clubs", "cards-data_7");
        this.cardTexture.set("Q_OF_Diamonds", "cards-data_7");
        this.cardTexture.set("Q_OF_Hearts", "cards-data_7");
        this.cardTexture.set("Q_OF_Spades", "cards-data_8");
    }
    public shuffleAllCards() {
        this.initializeDeck()               // currently we are not shuffling the cards
    }
    public getDeckSize() {
        return this.deck.length - MyGame.baseGameModel.fakeCardShownToUser;
    }
    public getRandomCard(): Card {
        const index: number = Math.floor(Math.random() * this.deck.length);
        const card: Card = new Card(this.view, 0, 0, this.cardTexture.get(this.deck[index] as string) as string, (this.cardData[this.deck[index]]), this.deck[index]); // using this function for drawing random card from deck
        this.deck.splice(index, 1);
        EventSystem.dispatch(GameConstants.UPDATE_DECK_SIZE_MTR);
        return card;
    }
}