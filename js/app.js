// Enemies our player must avoid
function Enemy(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

function Gems(x,y) {
  this.x = x;
  this.y = y;
  this.sprite  = 'images/Gem Blue.png';
};

Gems.prototype.update = function(dt) {
  var distance = this.speed * dt;
  x = this.x + distance;
};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,100,140);
};


var gems = new Gems(101,210);

function Lives(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Heart.png';
};

Lives.prototype.update = function(dt) {
  var distance = this.speed * dt;
  x = this.x + distance;
};

Lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,50,100);
};

var lives = new Lives(100,250);




    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
var allEnemies = [];
Enemy.prototype.update = function(dt) {
  var distance = this.speed * dt;
   this.x = this.x + distance;
   if (this.x > 505) {
      var i = allEnemies.indexOf(this);
      if (i != -1) {
        allEnemies.splice(i,1);
      }
  }
 };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player(x,y,lives,score) {
  this.x = x;
  this.y = y;
  this.lives = 3;
  this.score = 0;
  this.sprite = 'images/char-cat-girl.png';
};

var player  = new Player(200, 400,);

Player.prototype.update = function (dt) {
  var distance = this.speed * dt;
  x = this.x + distance;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
   this.x = 200;
   this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


Player.prototype.handleInput = function(direction) {

    if (direction === 'up' && this.y >50) {
        this.y -= 83;
    }

    if (direction === 'down' && this.y <400) {
        this.y += 83;
    }

    if (direction === 'right' && this.x <400) {
        this.x += 101;
    }

    if (direction === 'left' && this.x > 50) {
        this.x -= 101;
    }

};

function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if ((Math.abs(player.x - enemy.x) < 40) && (Math.abs(player.y - enemy.y) < 40)) {
      player.reset();

    }
  });
};

function collectLives() {
  // if ((Math.abs(player.x - lives.x) < 40) && (Math.abs(player.y - lives.y) < 20)) {
  //         this.lives = this.lives + 1;
  //     }
};

function collectScore() {
  // if ((Math.abs(player.x - gems.x) < 40) && (Math.abs(player.y - gems.y) < 20)) {
  //   this.score = this.score + 1;
  // }
};

  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
        };

    player.handleInput(allowedKeys[e.keyCode]);
  });
