import { GameObjects } from "phaser";


export class Chip extends GameObjects.Image {
    protected id: string;
    protected value: number = 0;
    public movingspeed:number=30;
    public movingforplacingbet:boolean=true;
    public bank_chip_x!:number;
    public bank_chip_y!:number;
    constructor(scene:Phaser.Scene,x:number,y:number,texture: string, frame: string,id:string) {
        super(scene,x,y,texture,frame);
        this.id = id;
        this.setScale(0.2,0.2);
        this.identifyValue();
    }
    protected identifyValue(): void {
        this.value = Number(this.id)
    }

    // above function is used for storing chip value
    
    public kill(): void {
        // this.parent.removeChild(this);
        this.destroy();
    }
}