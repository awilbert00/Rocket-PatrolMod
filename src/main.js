/*
Alexa Wilbert
Rocket Patrol Mod: Dragon Patrol
4/19/2021
~16 hours

Points Breakdown: 
Redesign theme/aesthetic - 60 (done)
Create new spaceship type - 20 (done)  
Display the time remaining - 10 (done)
Background music - 5 (done)

Sources:
Ethan Rafael - how to set up timer 
Kristopher Yu - how to loop background music

Sound Effects:
Fireball Sound: https://freesound.org/people/CTCollab/sounds/223615/ 
                - link to the license: https://creativecommons.org/licenses/by/3.0/legalcode
Select Sound: https://freesound.org/people/kneekoo/sounds/548497/
              - link to the license: https://creativecommons.org/licenses/by-nc/3.0/legalcode
Explosion: https://freesound.org/people/misosound/sounds/251759/
           - link to the license: https://creativecommons.org/publicdomain/zero/1.0/

Art Assets:
I made all of the art. 

*/


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
