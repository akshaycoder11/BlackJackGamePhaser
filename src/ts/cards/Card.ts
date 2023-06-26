import { GameObjects } from "phaser";


export class Card extends GameObjects.Image {
    protected id: string;
    protected value: number = 0;
    constructor(scene:Phaser.Scene,x:number,y:number,texture: string, frame: string,id:string) {
        super(scene,x,y,texture,frame);
        this.id = id;
        this.identifyValue();
        this.setScale(0.3,0.3);
        this.x=-150;
        this.y=-150;
    }
    protected identifyValue(): void {
        const face: string = this.id.split("_")[0];
        if (["10", "J", "Q", "K"].indexOf(face) != -1) {
            this.value = 10;
        } else if (face == "A") {
            this.value = 11;
        } else {
            this.value = Number(face)
        }
    }
    public getFaceValue(): number {
        return this.value;
    }
    public getId(): string {
        return this.id;
    }
    public kill(): void {
        // this.parent.removeChild(this);
        this.destroy();
    }
}