class ControlsScene extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    init(){}

    preload(){}

    create(){
        this.add.text(600, 80, "CONTROLS:", {
            fontSize: "64px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        this.add.text(600, 180, "A: MOVE TO THE LEFT (+ LEFT WALL SLIDE)", {
            fontSize: "32px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        this.add.text(600, 280, "D: MOVE TO THE RIGHT (+ RIGHT WALL SLIDE)", {
            fontSize: "32px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        this.add.text(600, 380, "S: CROUCH DOWN", {
            fontSize: "32px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        this.add.text(600, 480, "<SPACE BAR>: JUMP  (+ DOUBLE JUMP) (+ WALL JUMP)", {
            fontSize: "32px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        let back = this.add.text(600, 580, "BACK TO TITLE", {
            fontSize: "40px",
            color: "#00ff00",
            backgroundColor: "#222",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        back.setInteractive({ useHandCursor: true });

        back.on("pointerover", () => {
            back.setStyle({ color: "#ffff00" });
        });

        back.on("pointerout", () => {
            back.setStyle({ color: "#00ff00" });
        });

        back.on("pointerdown", () => {
            // this.scene.stop("GameScene");
            this.scene.start("titleScene");
        });

    }

    update(){}

}