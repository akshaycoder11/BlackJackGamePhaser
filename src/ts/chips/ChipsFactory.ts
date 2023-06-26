
import { BaseGameView } from "../basegame/view/BaseGameView";
import { IObject } from "../lib/core/IObject";
import { Chip } from "./Chip";

export class ChipsFactory {
    protected allChips: Chip[] = [];
    protected view:BaseGameView;
    protected chipData: IObject;
    constructor(chipData: IObject,view:BaseGameView) {
        this.chipData = chipData;
        this.view=view;
    }
    public getChipByValue(value: string,view:BaseGameView): Chip {
        const chip: Chip = new Chip(this.view,0,0,"tableLayout",`${value.split("_")[1]}_casino-chip.png`,`${value.split("_")[1]}`);
        this.allChips.push(chip);
        return chip;
    }
    public clearAll(): void {
        this.allChips.forEach((chip: Chip)=>{
            chip.kill();
        });
        this.allChips = [];
    }
    public removeChild(value:Chip){
        for(let i=0;i<this.allChips.length;i++){
            if(this.allChips[i]==value){
                this.allChips.splice(i,1);
            }
        }
        
    }
}