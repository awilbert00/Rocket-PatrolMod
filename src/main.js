//redesign theme/aesthetic - 60 (basically done)
//create new spaceship type - 20 (done)  or add background music and speed increase after thirty seconds
//display the time remaining - 10 (done)
//implement scoring mechanism that
//adds time for successful hits - 20 

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;
