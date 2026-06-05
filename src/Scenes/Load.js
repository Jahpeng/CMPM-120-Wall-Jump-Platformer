class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    // NOTE: Basic structure copied from Professor's lecture examples

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        // this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");
        this.load.image("walk1", "alienGreen_walk1.png");
        this.load.image("walk2", "alienGreen_walk2.png");
        this.load.image("stand", "alienGreen_stand.png");
        this.load.image("jump1", "alienGreen_jump.png");
        this.load.image("duck1", "alienGreen_duck.png");

        // Load tilemap information
        this.load.image("tilemap_tiles_platformer", "tilemap_packed.png");                         // Packed tilemap
        this.load.image("tilemap_tiles_construction", "tilemap_packed2.png");
        this.load.image("tilemap_tiles_backgrounds", "tilemap-backgrounds_packed.png"); 
        this.load.tilemapTiledJSON("platformer_wall_jump_level", "platformer_wall_jump_level.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet_platformer", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.spritesheet("tilemap_sheet_construction", "tilemap_packed2.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.spritesheet("tilemap_background_sheet", "tilemap-backgrounds_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: [
                {key: "walk1"},
                {key: "walk2"},
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [
                {key: "stand" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'duck',
            frames: [
                {key: "duck1" }
            ],
        });

        this.anims.create({
            key: 'jump',
            frames: [
                {key: "jump1" }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("platformerScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}