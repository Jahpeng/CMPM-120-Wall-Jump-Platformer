class CreditsScene extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    init(){}

    preload(){}

    create(){
        this.add.text(600, 180, "CREDITS:", {
            fontSize: "64px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        this.add.text(600, 280, "SPRITES:", {
            fontSize: "32px",
            color: "#ff7b00"
        }).setOrigin(0.5);
        this.add.text(600, 320, "KENNEY PLATFORMER ART EXTENDED ENEMIES", {
            fontSize: "20px",
            color: "#00ff88"
        }).setOrigin(0.5);
        this.add.text(600, 350, "KENNEY PARTICLES PACK", {
            fontSize: "20px",
            color: "#00ff88"
        }).setOrigin(0.5);
        this.add.text(600, 380, "KENNEY PIXEL PLATFORMER", {
            fontSize: "20px",
            color: "#00ff88"
        }).setOrigin(0.5);
        // this.add.text(600, 410, "KENNEY PIXEL PLATFORMER FOOD EXPANSION", {
        //     fontSize: "20px",
        //     color: "#00ff88"
        // }).setOrigin(0.5);

        this.add.text(600, 450, "AUDIO:", {
            fontSize: "32px",
            color: "#ff7b00"
        }).setOrigin(0.5);

        this.add.text(600, 490, "KENNEY DIGITAL AUDIO", {
            fontSize: "20px",
            color: "#00ff88"
        }).setOrigin(0.5);
        this.add.text(600, 520, "KENNEY IMPACT SOUNDS", {
            fontSize: "20px",
            color: "#00ff88"
        }).setOrigin(0.5);

        let back = this.add.text(600, 610, "BACK TO TITLE", {
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