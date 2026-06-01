class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
        this.my = {sprite: {}, vfx: {}};
    }

    init(){
        // Basic Structure Copied From Professor's Lecture Examples
        // variables and settings
        this.ACCELERATION = 500; //500;
        this.DRAG = 900;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1200;//1200
        this.JUMP_VELOCITY = -400;//-400
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("player_character", "alienGreen_stand.png");
    }

    create(){
        let my = this.my;

        // Addding MAP (Using same structure as platformer section assignment)
        this.map = this.add.tilemap("platformer_wall_jump_level", 18, 18, 100, 30);

        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels); // suggested by chatgpt to fix invisible wall bug
        // Adding tileset to map
        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles_platformer");
        this.tileset2 = this.map.addTilesetImage("tilemap_packed2", "tilemap_tiles_construction");

        // Making ground layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });


        // PLAYER SPRITE SETUP
        my.sprite.player = this.physics.add.sprite(40, 40, "player_character").setScale(0.2);
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setMaxVelocity(200, 1000); // makes sure player doesnt become a speed demon

        // PLAYER MOVEMENT SETUP
        this.akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // PLAYER COLLISION
        this.physics.add.collider(my.sprite.player, this.groundLayer);


        //PARTICLES
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['star_01.png', 'star_04.png'],
            random: true,
            scale: {start: 0.03, end: 0.1},
            maxAliveParticles: 12,
            lifespan: 350,
            gravityY: -200,
            alpha: {start: 1, end: 0.1}, 
            frequency: 100,
            tint: 0xC4A484,
            blendMode: 'NORMAL',
        });
        my.vfx.walking.stop();

        my.vfx.jump = this.add.particles(0, 0, "kenny-particles", {
            frame: "dirt_02.png",
            lifespan: 350,
            // scale: { start: 0.2, end: 0 },
            quantity: 1,
            // // maxAliveParticles: 8,
            // alpha: {start: 1, end: 0.1},
            speed: { min: 20, max: 80 },
            scale: { start: 0.1, end: 0 },
            alpha: { start: 1, end: 0 },
        })
        my.vfx.jump.stop();

        // NOTE: Base Camera Code Copied From Professor's Platformer Example 
        // Simple camera to follow player
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(2);
    }

    update(){
        let my = this.my;



        // this coruching section was suggested by chatgpt to fix crouching visual bug
        this.crouching = this.skey.isDown && my.sprite.player.body.blocked.down;
        if (this.crouching) {
            my.sprite.player.body.setOffset(0, -20);
        }
        else {
            my.sprite.player.body.setOffset(0, 0);
        }

         // PLAYER MOVEMENT (base structure from platformer section assignment)
        if (this.akey.isDown){
            my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
            // my.sprite.player.resetFlip();
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // my.sprite.player.body.setOffset(0, 0);

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2, false);
            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }
        }
        else if (this.dkey.isDown){
            my.sprite.player.body.setAccelerationX(this.ACCELERATION);
            // my.sprite.player.setFlip(true, false);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            // my.sprite.player.body.setOffset(0, 0);

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2, false);
            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }
        }
        else if (this.skey.isDown){
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG);
            //my.sprite.player.resetFlip();
            my.sprite.player.anims.play('duck', true);
            my.vfx.walking.stop();
            my.sprite.player.body.setOffset(0, -20);
        }
        else{
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
            // my.sprite.player.body.setOffset(0, 0);
        }

        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            my.vfx.walking.stop();
        }
        // Reset NUmber of Jumps When On Ground
        if(my.sprite.player.body.blocked.down) {
            this.jumps = 0;
        }

        if(!my.sprite.player.body.blocked.down && this.jumps == 0) {
            this.jumps = 1;
        }

        // wall jump code suggested by chatgpt
        this.walljump = ((my.sprite.player.body.blocked.left || my.sprite.player.body.blocked.right) && !my.sprite.player.body.blocked.down);
        
        if (Phaser.Input.Keyboard.JustDown(this.spacekey)){
            if (!this.walljump && this.jumps < 2){
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
                this.jumps += 1;
                my.vfx.jump.startFollow(my.sprite.player, my.sprite.player.displayWidth/2, my.sprite.player.displayHeight/2, false);
                
                my.vfx.jump.explode(2, my.sprite.player.displayWidth/2, my.sprite.player.displayHeight/2);
                // this.jump_sound.play();
            }
            else if (this.walljump){
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);

                if (my.sprite.player.body.blocked.left){
                    my.sprite.player.body.setVelocityX(400);
                }
                else if (my.sprite.player.body.blocked.right){
                    my.sprite.player.body.setVelocityX(-400);
                }
                this.jumps = 1;
                my.vfx.jump.startFollow(my.sprite.player, my.sprite.player.displayWidth/2, my.sprite.player.displayHeight/2, false);
                
                my.vfx.jump.explode(2, my.sprite.player.displayWidth/2, my.sprite.player.displayHeight/2);
                // this.jump_sound.play();
            }
        }
    }


}