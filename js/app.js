/*
 * Enemy definition area:
 *	- Enemy(x, y, speed) = constructor function for enemy
 *	- Enemy.update(dt) = updates enemy's informations (position & speed)
 *	- Enemy.render() = draws enemy sprite on the canvas
 *	- Enemy.checkCollision() = verifies that the enemy is hitting the player
 */

const Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';		// Enemy's sprite location
	this.x = x;				// Enemy's x position
	this.y = y;				// Enemy's y position
	this.speed = speed;		// Enemy's speed
};

let speedFactor = 25;		// Starting enemy's speedFactor;

Enemy.prototype.update = function(dt) {
	this.horizontalCanvasBound = 505;		// Bound for enemy's movements
	this.startingPos = -100;		// Starting enemy's position

	this.x = this.x + this.speed * dt;		// Enemy's speed

	if(this.x >= this.horizontalCanvasBound) {		// Reset enemy's position and set a new speed
		this.x = this.startingPos;
		this.speed = speedFactor * Math.floor(Math.random() * 10 + 1);
	}

	this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);		// Draws enemy's sprite
};

Enemy.prototype.checkCollision = function() {
    const playerPosition = {
		x: player.x,
		y: player.y,
		width: 50,
		height: 40
	};

    const enemyPosition = {
		x: this.x,
		y: this.y,
		width: 60,
		height: 70
	};

    if (playerPosition.x < enemyPosition.x + enemyPosition.width && playerPosition.x + playerPosition.width > enemyPosition.x &&
        playerPosition.y < enemyPosition.y + enemyPosition.height && playerPosition.height + playerPosition.y > enemyPosition.y) {		// Verifies position collision
			player.lifes -= 1;		// Removes a life
			player.positionReset();	// Resets player's position
	}
};

/*
 * Player definition area:
 *	- Player() = constructor function for player
 *	- Player.update() = updates player's informations
 *	- Player.render() = draws player's sprite on the canvas
 *	- Player.positionReset() = resets player's position
 *	- Player.playerReset() = resets player's informations
 *	- Player.complete() = function for completed game's events
 *	- Player.handleInput() = handles allowed inputs
 */

const Player = function() {
	this.sprite = 'images/char-boy.png';		// Player's sprite
	this.x = 200;		// Starting x player's position
	this.y = 400;		// Starting y player's position
	this.lifes = 3;		// Player's lifes
	this.gameScore = 0;	// Player's game score
}

Player.prototype.update = function() {
	if(this.lifes === 0) {		// Verifies lifes number
		alert(`Sorry, you lose...\n\nGame score: ${this.gameScore}`);
		this.playerReset();
		speedFactor = 25; 	// Resets the enemy's speed
	}
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);		// Draws player's sprite
};

Player.prototype.positionReset = function() {
	this.x = 200;
	this.y = 400;
}

Player.prototype.playerReset = function() {
	this.positionReset();
	this.lifes = 3;
	this.gameScore = 0;
}

Player.prototype.complete = function() {
	let points = speedFactor / 5;
	this.gameScore += points;
	this.positionReset();
	alert(`Congratulations! You win a match!\n\nPoints: +${points}`);
	speedFactor += 5; 		// Increases the enemy's speed factor
}

Player.prototype.handleInput = function(allowedKeys) {
	switch(allowedKeys) {
		case 'up':
			if(this.y < 0) {
				this.complete();
			} else {
				this.y -= 83;
			}
		break;

		case 'down':
			if(this.y < 400) {
				this.y += 83;
			}
		break;

		case 'left':
			if(this.x > 0) {
				this.x -= 101;
			}
		break;

		case 'right':
			if(this.x < 402) {
				this.x += 101;
			}
		break;
	}
}

/*
 * Instances:
 *	- allEnemis[] = array that contains all the game's enemies
 *	- player() = instances a new player 
 */

let allEnemies =  [];

for(let i = 0; i < 3; i++) {
	let startingSpeed = 25 * Math.floor(Math.random() * 10 + 1);		// Sets a starting enemy's speed
	allEnemies.push(new Enemy(-100, 60 + (85 * i), startingSpeed));		// Creates the enemy's array
}

let player = new Player();		// Creates player's instance

/*
 * Add key listner for player's movements
 */

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
