
import { BaseView } from "../../lib/view/BaseView";
import { IObject } from "../../lib/core/IObject";
import { PostIntroController } from "../controller/PostIntroController";

export class PostIntroView extends BaseView {
    constructor() {
        super("PostIntroView");
    }
    protected preload() {
        this.load.json("mainmanifest", './res/manifest/mainManifest.json');
        this.load.json("loading", './res/viewManifest/combine.json');
        this.load.image("BlackJackIntro", "./res/images/BlackJackIntro.png");
        this.load.image("PlayButtonHover", "./res/images/PlayButtonHover.png");
        this.load.image("PlayButtonNormal", "./res/images/PlayButtonNormal.png");
        
    }
    protected create() {
        this.setView(this.cache.json.entries.get("loading").PostIntro)
        super.create();
        // let obj = this.cache.json.entries.get("loading").loading;
        // for (let propt in obj) {
        //     this.load.image(`${propt}`,`${obj[propt]}`);
        //     // console.log(propt + ': ' + obj[propt]);
        // }
        // let postintrobg = this.add.image(640, 383, 'BlackJackIntro');
        // postintrobg.setScale(1.1);
        // // postintrobg.setOrigin(0,0);
        // this.add.text(200, 200, "HI AKSHAY LOADING");
        new PostIntroController(this);
    }
}