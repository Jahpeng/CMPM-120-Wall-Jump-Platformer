class WinScene extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    init(){}

    preload(){}

    create(){
        this.add.text(600, 180, "LEVEL COMPLETE!", {
            fontSize: "64px",
            color: "#00ff80"
        }).setOrigin(0.5);

        let restart = this.add.text(600, 420, "BACK TO TITLE", {
            fontSize: "40px",
            color: "#00ff00",
            backgroundColor: "#222",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        restart.setInteractive({ useHandCursor: true });

        restart.on("pointerover", () => {
            restart.setStyle({ color: "#ffff00" });
        });

        restart.on("pointerout", () => {
            restart.setStyle({ color: "#00ff00" });
        });

        restart.on("pointerdown", () => {
            this.scene.stop("sewage_zone");
            this.scene.start("titleScene");
        });

    }

    update(){}

}