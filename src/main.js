const config = {
    type: Phaser.AUTO, //Phaser.AUTO,      // WebGL if possible
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, // set to true to see collision box + direction of movement
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1200,
    height: 700,
    backgroundColor: "#1a1a2e",
    scene: [TitleScene, Load, Platformer, CreditsScene, ControlsScene, WinScene] // first scene in the list starts
};

const game = new Phaser.Game(config);