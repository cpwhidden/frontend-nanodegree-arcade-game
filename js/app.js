// Determine size of grid
var numRows = 6;
var numCols = 5;
var rowHeight = 101;
var colWidth = 83;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.loc = {x: x, y: y};  // x and y are in terms of number of blocks across the screen
    this.speed = speed;
    this.imageAdjust = -22; // Adjust image to fit in blocks better
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.loc.x += this.speed * dt;
    if (this.loc.x > numCols + 1) {
        this.loc.x = randomX();
        this.loc.y = randomY();
        this.speed = randomSpeed();
    }

    if (!((this.loc.x + 1) <= player.loc.x ||
         this.loc.x >= (player.loc.x + 1) ||
         (this.loc.y + 1) <= player.loc.y ||
         this.loc.y >= (player.loc.y + 1))) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), rowHeight * (this.loc.x - 1), colWidth * (this.loc.y - 1) + this.imageAdjust);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    Enemy.call(this, x, y, speed);
    this.sprite = 'images/char-boy.png';
    this.imageAdjust = -11;
    this.keyDown = '';
};
Player.prototype = Object.create(Enemy.prototype);
Player.constructor = Player;

Player.prototype.update = function(dt) {
    if (this.loc.x > numCols) {
        this.loc.x = numCols;  // Disallow player from moving rightward offscreen
    }
    if (this.loc.x < 1) {
        this.loc.x = 1;
    }
    if (this.loc.y > numRows) {
        this.loc.y = numRows;
    }
    if (this.loc.y <= 1) {
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.loc.x = 3;
    this.loc.y = 6;
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.loc.x -= 1;
    } else if (key == 'right') {
        this.loc.x += 1;
    } else if (key == 'up') {
        this.loc.y -= 1;
    } else if (key == 'down') {
        this.loc.y += 1;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Make enemies randomly placed with random speeds
var makeRandomEnemy = function() {
    return new Enemy(randomX(), randomY(), randomSpeed());
};

var randomX = function() {
    return Math.floor(Math.random() * -0.5) - 1;
};

var randomY = function() {
    return Math.floor(Math.random() * 3) + 2;
};

var randomSpeed = function() {
    return Math.random() * 2 + 1;
};

var allEnemies = [makeRandomEnemy(), makeRandomEnemy(), makeRandomEnemy(), makeRandomEnemy()];
var player = new Player(3,6,0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
