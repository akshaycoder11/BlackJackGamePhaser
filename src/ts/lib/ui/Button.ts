import { GameObjects, Scene } from "phaser";
import { IObject } from "../core/IObject";

export class Button {
    protected json: IObject;
    protected isdown: boolean = false;
    protected isOver: boolean = false;
    public button;
    constructor(componentData: IObject, scene: Scene) {
        this.json = componentData;
        this.button = scene.add.image(componentData.x, componentData.y, componentData.texture, componentData.frames.up);
        this.button.setOrigin(0.5);
        this.button.name = componentData.id;
        this.button.visible = componentData.visible;
        this.button.scaleX = componentData.scaleX || 1;
        this.button.scaleY = componentData.scaleY || 1;
        this.button.alpha = componentData.alpha || 1;
        this.button.setAlpha(componentData.alpha || 1)
        this.button.setInteractive({ useHandCursor: true });
        this.button.on('pointerdown', this.onButtonDown, this);
        this.button.on('pointerover', this.onButtonOver, this)
        this.button.on('pointerout', this.onButtonOut, this);
        this.button.on('pointerupoutside', this.onButtonUp, this)
    }
    protected onButtonDown(): void {
        this.isdown = true;
        this.button.setTexture(this.json.texture, this.json.frames.down);
    }
    protected onButtonUp(): void {
        this.isdown = false;
        if (this.isOver) {
            this.button.setTexture(this.json.texture, this.json.frames.over);
        } else {
            this.button.setTexture(this.json.texture, this.json.frames.up);
        }
        this.button.setTexture(this.json.texture, this.json.frames.up);
    }
    protected onButtonOver(): void {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.button.setTexture(this.json.texture, this.json.frames.over);

    }
    protected onButtonOut(): void {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.button.setTexture(this.json.texture, this.json.frames.out);
    }
    public disableButton(): void {
        this.button.setInteractive(false)
    }
    public enableButton(): void {
        this.button.setInteractive(true)
    }

}