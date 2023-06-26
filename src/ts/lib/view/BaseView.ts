

import { Scene } from "phaser";
import { IObject } from "../core/IObject";
import { Button } from "../ui/Button";
export abstract class BaseView extends Scene {
   
    protected viewJson!: IObject;
    protected config!:string;
    protected allComponents: Map<string, any> = new Map<string, any>();
    constructor( config?: string) {
        super(config)
    }
    public setView(viewjson:IObject){
        this.viewJson=viewjson;
    }
    protected create() {
        this.createDisplayHeirachy();
    }
    protected createDisplayHeirachy(): void {
        for (const index in this.viewJson) {
            if (this.viewJson.hasOwnProperty(index)) {
                const obj = this.viewJson[index];
                if (!obj.type) {
                    continue;
                }
                this.createComponents(obj);
            }
        }
    }
    protected createComponents(componentData: IObject): void {
        switch (componentData.type.toLowerCase()) {
            case "container":
                this.createContainer(componentData);
                break;
            case "image":
                this.createImage(componentData);
                break;
            case "button":
                this.createButton(componentData);
                break;
            case "text":
                this.createText(componentData);
                break;
        }
    }
    protected createText(componentData: IObject) {
        const text = this.add.text(componentData.x, componentData.y, componentData.text,componentData.style)
        text.name = componentData.id;
        text.height=componentData.h;
        text.width=componentData.w;
        text.visible = componentData.visible;
        text.scaleX = componentData.scaleX || 1;
        text.scaleY = componentData.scaleY || 1;
        this.allComponents.set(componentData.id, text);
        if (componentData.parent && componentData.parent != "") {
            if (this.getComponentByID(componentData.parent)) {
                (this.getComponentByID(componentData.parent)).add(text);
            } else {
                throw new Error(`Parent not defined - ${componentData.parent}`);
            }
        }
        return text;

    }
    protected createButton(componentData: IObject) {
        const button: Button = new Button(componentData, this);
        this.allComponents.set(componentData.id, button.button);
        if (componentData.parent && componentData.parent != "") {
            if (this.getComponentByID(componentData.parent)) {
                (this.getComponentByID(componentData.parent)).add(button.button);
            } else {
                throw new Error(`Parent not defined - ${componentData.parent}`);
            }
        }
        return button.button;
    }
    protected createImage(componentData: IObject) {
        let image = this.add.image(componentData.x, componentData.y, componentData.texture);
        image.name = componentData.id;
        image.visible = componentData.visible;
        image.scaleX = componentData.scaleX || 1;
        image.scaleY = componentData.scaleY || 1;
        this.allComponents.set(componentData.id, image);
        if (componentData.parent && componentData.parent != "") {
            if (this.getComponentByID(componentData.parent)) {
                (this.getComponentByID(componentData.parent)).add(image);
            } else {
                throw new Error(`Parent not defined - ${componentData.parent}`);
            }
        }
        return image;
    }
    protected createContainer(componentData: IObject) {
        let container
        container = this.add.container(componentData.x, componentData.y);
        container.name = componentData.id;
        this.allComponents.set(componentData.id, container);
        if (componentData.parent && componentData.parent != "") {
            if (this.getComponentByID(componentData.parent)) {
                (this.getComponentByID(componentData.parent)).add(container);
            } else {
                throw new Error(`Parent not defined - ${componentData.parent}`);
            }
        }
        container.visible = componentData.visible;
        return container;
    }
    public getComponentByID(id: string): any | undefined {
        return this.allComponents.get(id);
    }
}