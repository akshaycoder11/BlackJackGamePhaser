import { PostIntroView } from "../view/PostIntroView";
import { BaseView } from "../../lib/view/BaseView";

export class PostIntroController {
    protected view: PostIntroView;
    protected button: any;
    constructor(view: PostIntroView) {
        this.view = view;
        this.initialize();
    }
    protected initialize() {
        this.button = this.view.getComponentByID("PostIntroButton");
        this.button && this.button.on('pointerdown', this.startBaseGame, this);
    }
    protected startBaseGame() {
        this.view.scene.start("BaseGameView");
        this.view.scene.remove("PostIntroView")
        console.log("pressed");
    }
}