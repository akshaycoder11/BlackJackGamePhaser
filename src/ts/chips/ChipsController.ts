
import { IEvent } from "../lib/eventSystem/IEvent";
import { ChipsFactory } from "./ChipsFactory";
import { Chip } from "./Chip";
import { MyGame } from "../lib/core/GlobalConstants";
import { EventSystem } from "../lib/eventSystem/EventSystem";
import { GameConstants } from "../lib/GameConstants";
import { BaseGameView } from "../basegame/view/BaseGameView";
import { BaseGameModel } from "../basegame/model/BaseGameModel";
import { GameObjects, Tweens } from "phaser";

export class ChipsController {
    protected view: BaseGameView;
    protected model: BaseGameModel;
    protected bankBalnceMtr!: GameObjects.Text;
    protected placingBetConatiner!: GameObjects.Container;
    protected chipFactory!: ChipsFactory;
    protected movingTweensContainer: Chip[] = [];
    protected chipsBtnArray: GameObjects.Image[] = [];
    private chipBtnValues: number[] = [1, 2, 5, 10, 25]
    constructor(view: BaseGameView, model: BaseGameModel) {
        this.view = view;
        this.model = model;
        this.initialize();
        this.initializeChipFactory();
    }
    protected initialize() {
        this.bankBalnceMtr = this.view.getComponentByID("totalBankBalanceMeter") as GameObjects.Text;
        this.placingBetConatiner = this.view.getComponentByID("placingBetContainer") as GameObjects.Container;
        for (let i = 0; i < this.chipBtnValues.length; i++) {
            this.chipsBtnArray.push(this.view.getComponentByID(`ChipBtn_${this.chipBtnValues[i]}`) as GameObjects.Image);
        }
        this.chipsBtnArray[0].on('pointerdown', this.onChip1Selected, this);
        this.chipsBtnArray[1].on('pointerdown', this.onChip2Selected, this);
        this.chipsBtnArray[2].on('pointerdown', this.onChip5Selected, this);
        this.chipsBtnArray[3].on('pointerdown', this.onChip10Selected, this);
        this.chipsBtnArray[4].on('pointerdown', this.onChip25Selected, this);
        EventSystem.addEventListener(GameConstants.REPLACE_BET_CLICKED, this.rePlacingBet, this);
        EventSystem.addEventListener(GameConstants.RESET_ALL, this.reset, this);
        this.updateChips();
    }
    protected initializeChipFactory() {
        this.chipFactory = new ChipsFactory(this.view.cache.json.entries.get("loading").chips, this.view);
    }
    protected onChip1Selected() {
        const tempChip: Chip = this.chipFactory.getChipByValue("ChipBtn_1", this.view);
        this.model.setBankBalance(this.model.getBankBalance() - Number(1));
        this.model.setBetAmount(this.model.getBetAmount() + Number(1));
        tempChip.movingforplacingbet = true;
        tempChip.x = tempChip.bank_chip_x = 65;
        tempChip.y = tempChip.bank_chip_y = 690;
        this.updateChips();
        this.placingBet(tempChip);
        EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
    }
    protected onChip2Selected() {
        const tempChip: Chip = this.chipFactory.getChipByValue("ChipBtn_2", this.view);
        this.model.setBankBalance(this.model.getBankBalance() - Number(2));
        this.model.setBetAmount(this.model.getBetAmount() + Number(2));
        tempChip.movingforplacingbet = true;
        tempChip.x = tempChip.bank_chip_x = 205;
        tempChip.y = tempChip.bank_chip_y = 690;
        this.updateChips();
        this.placingBet(tempChip);
        EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
    }
    protected onChip5Selected() {
        const tempChip: Chip = this.chipFactory.getChipByValue("ChipBtn_5", this.view);
        this.model.setBankBalance(this.model.getBankBalance() - Number(5));
        this.model.setBetAmount(this.model.getBetAmount() + Number(5));
        tempChip.movingforplacingbet = true;
        tempChip.x = tempChip.bank_chip_x = 345;
        tempChip.y = tempChip.bank_chip_y = 690;
        this.updateChips();
        this.placingBet(tempChip);
        EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
    }
    protected onChip10Selected() {
        const tempChip: Chip = this.chipFactory.getChipByValue("ChipBtn_10", this.view);
        this.model.setBankBalance(this.model.getBankBalance() - Number(10));
        this.model.setBetAmount(this.model.getBetAmount() + Number(10));
        tempChip.movingforplacingbet = true;
        tempChip.x = tempChip.bank_chip_x = 475;
        tempChip.y = tempChip.bank_chip_y = 690;
        this.updateChips();
        this.placingBet(tempChip);
        EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
    }
    protected onChip25Selected() {
        const tempChip: Chip = this.chipFactory.getChipByValue("ChipBtn_25", this.view);
        this.model.setBankBalance(this.model.getBankBalance() - Number(25));
        this.model.setBetAmount(this.model.getBetAmount() + Number(25));
        tempChip.movingforplacingbet = true;
        tempChip.x = tempChip.bank_chip_x = 615;
        tempChip.y = tempChip.bank_chip_y = 690;
        this.updateChips();
        this.placingBet(tempChip);
        EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
    }
    // above function is for selecting chips from chip bank for placing bet

    protected placingBet(chip: Chip) {
        // MyGame.game?.stage.addChild(chip);
        // this.view.physics.add.existing(chip);
        this.view.children.add(chip);
        var tween: Tweens.Tween;
        const tweenData = {
            targets: chip,
            x: 500,
            y: 350,
            duration: 500,
            ease: "Quadratic.In",
            onComplete: () => {
                chip.movingforplacingbet = false;
                chip.x = 0;
                chip.y = 0;
                this.placingBetConatiner.add(chip);
            }
        };
        tween = this.view.add.tween(tweenData);
    }

    // above function is for placing chips for bet on table

    protected rePlacingBet() {
        if (!this.placingBetConatiner.list.length)
            return;
        const removeChild: any = this.placingBetConatiner.list.pop();
        // this.view.physics.add.existing(removeChild);
        this.view.children.add(removeChild);
        // MyGame.game?.stage.addChild(removeChild);
        this.model.setBankBalance(this.model.getBankBalance() + Number(removeChild.value));
        this.model.setBetAmount(this.model.getBetAmount() - removeChild.value);
        removeChild.x = 500;
        removeChild.y = 350;
        var tween: Tweens.Tween;
        const tweenData = {
            targets: removeChild,
            x: removeChild.bank_chip_x,
            y: removeChild.bank_chip_y,
            duration: 500,
            ease: "Quadratic.In",
            onComplete: () => {
                this.chipFactory.removeChild(removeChild);
                removeChild.kill();
            }
        };
        tween = this.view.add.tween(tweenData);
        this.updateChips();
        EventSystem.dispatch(GameConstants.UPDATE_DEAL_BTN_VISIBILITY);
    }

    // above function is for replace/change chips before dealing

    protected updateChips() {
        for (let i = 0; i < this.chipsBtnArray.length; i++) {
            this.chipsBtnArray[i].visible = false;
        }
        var chipsvisible: number = 0;
        var bankBalance: number = this.model.getBankBalance();
        this.bankBalnceMtr.text = String(`$${bankBalance}`);
        if (bankBalance >= 25) {
            chipsvisible = 5;
        } else if (bankBalance >= 10) {
            chipsvisible = 4;
        } else if (bankBalance >= 5) {
            chipsvisible = 3;
        } else if (bankBalance >= 2) {
            chipsvisible = 2;
        } else if (bankBalance >= 1) {
            chipsvisible = 1;
        }
        for (let i = 0; i < chipsvisible; i++) {
            this.chipsBtnArray[i].visible = true;
        }
    }

    //above function is used for updating chips bank as per your balance

    protected reset() {
        let tempx, tempy;
        if (this.model.getIsPlayerWon()) {
            this.model.setBankBalance(this.model.getBankBalance() + 2 * this.model.getBetAmount());
            this.updateChips();
            tempx = -5;
            tempy = 700;
        } else {
            tempx = -5;
            tempy = -200;
        }
        this.model.setBetAmount(0);
        this.model.setIsPlayerWon(false);
        let i = 0;
        while (this.placingBetConatiner.list.length) {
            const removeChild: any = this.placingBetConatiner.list.pop();
            // MyGame.game?.stage.addChild(removeChild);
            this.view.children.add(removeChild);
            // this.view.physics.add.existing(removeChild);
            removeChild.x = 500;
            removeChild.y = 350;
            var tween: Tweens.Tween;
            const tweenData = {
                targets: removeChild,
                x: tempx,
                y: tempy,
                duration: 500,
                delay: 100 * i,
                ease: "Quadratic.In",
                onComplete: () => {
                    this.chipFactory.removeChild(removeChild);
                    removeChild.kill();
                }
            };
            i++;
            tween = this.view.add.tween(tweenData);
        }
    }

    //above function is called for reset when that gameplay finished
}