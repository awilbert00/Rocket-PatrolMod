class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('mountains', 'assets/mountainBackground.png');
        this.load.image('dragon', 'assets/dragon.png');
        this.load.audio('sfx_select', 'assets/kneekooMagic.ogg');
        this.load.audio('sfx_explosion', 'assets/misosoundExplosion.wav');
        this.load.audio('sfx_fireball', 'assets/ctcollabFireball.wav');

   }
    create() {
        this.mountains= this.add.tileSprite(
            0,0,640,480, 'mountains'
        ).setOrigin(0,0);

        this.dragon01 = this.add.tileSprite(
            50,90,55,40, 'dragon'
        ).setOrigin(0,0);

        this.dragon02 = this.add.tileSprite(
            150,300,55,40, 'dragon'
        ).setOrigin(0,0);

        this.dragon03 = this.add.tileSprite(
            500,100,55,40, 'dragon'
        ).setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#fff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding, 
            'DRAGON PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2,
            'Use <- -> arrows to move and (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.color = "#fff";
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                dragonSpeed: 3,
                fastDragonSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                dragonSpeed: 4,
                fastDragonSpeed: 5,
                gameTimer: 15000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        
    }
}