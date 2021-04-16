class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
         this.load.image('mountains', 'assets/mountainBackground.png');
         this.load.image('fireball', 'assets/fireball.png');
         this.load.image('dragon', 'assets/dragon.png');
         this.load.image('dragonFast', 'assets/fastDragon.png');
         this.load.spritesheet('explosion', 'assets/explosion.png',
         {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

         this.load.audio('sfx_select', 'assets/kneekooMagic.ogg');
         this.load.audio('sfx_explosion', 'assets/misosoundExplosion.wav');
         this.load.audio('sfx_fireball', 'assets/ctcollabFireball.wav');

    }


    create() {
        this.mountains= this.add.tileSprite(
            0,0,640,480, 'mountains'
        ).setOrigin(0,0);

        //add fireball
        this.p1Fireball = new Fireball(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'fireball');

        //add dragons
        this.dragon1 = new Dragon(
            this,
            100,
            200,
            'dragon',
            0,
            10
        );

        this.dragon2 = new Dragon(
            this,
            300,
            240,
            'dragon',
            0,
            10
        );

        this.dragon3 = new Dragon(
            this,
            380,
            300,
            'dragon',
            0,
            10
        );

        this.dragonFast = new DragonFast(
            this,
            200,
            230,
            'dragonFast',
            0,
            20
        );

        //green UI background
        this.add.rectangle(
            0, borderUISize + borderPadding, 
            game.config.width, borderUISize*2,
            0xFFFFFF
            ).setOrigin(0,0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.anims.create( {
            key: 'explode',
            frames: this.anims.generateFrameNumbers(
                'explosion', 
                {start: 0,
                 end: 9,
                 first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(
            borderUISize + borderPadding, 
            borderUISize + borderPadding*2,
            this.p1Score,
            scoreConfig);

        this.gameOver = false
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2,
                'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+64,
                'Press (R) to restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);


    }

    update() {
        this.mountains.tilePositionX -= 2;
        if (!this.gameOver) {
            this.p1Fireball.update();
            this.dragon1.update();
            this.dragon2.update();
            this.dragon3.update();
            this.dragonFast.update();
        }

        this.checkCollision(this.p1Fireball, this.dragon1);
        this.checkCollision(this.p1Fireball, this.dragon2);
        this.checkCollision(this.p1Fireball, this.dragon3);
        this.checkCollision(this.p1Fireball, this.dragonFast);

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

    }

    checkCollision(fireball, dragon) {
        if (fireball.x + fireball.width > dragon.x && 
            fireball.x < (dragon.x + dragon.width) && 
            fireball.y + fireball.height > dragon.y && 
            fireball.y < (dragon.y + dragon.height) ) {
                dragon.alpha = 0;
                fireball.reset();
                this.dragonExplode(dragon);
                dragon.reset();
                
                
            }
    }

    dragonExplode(dragon) {
        dragon.alpha = 0;
        let boom = this.add.sprite(dragon.x, dragon.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            dragon.reset();
            dragon.alpha = 1;
            boom.destroy();
        });
        this.sound.play('sfx_explosion');
        this.p1Score += dragon.points;
        this.scoreLeft.text = this.p1Score;
    }
}