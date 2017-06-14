// Enemies our player must avoid
function Enemy(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

var allEnemies = [];

Enemy.prototype.update = function(dt) {
  var distance = this.speed * dt;
   this.x = this.x + distance;
   if (this.x > 606) {
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

function Player(x,y,lives,score) {
  this.x = x;
  this.y = y;
  this.lives = 3;
  this.score = 0;
  this.key = 0;
  this.sprite = 'images/char-cat-girl.png';
};

var player = new Player(200, 400);

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

Player.prototype.handleInput = function(direction) {

    if (direction === 'up' && this.y > 0) {
        this.y -= 83;
    }

    if (direction === 'down' && this.y < 483) {
        this.y += 83;
    }

    if (direction === 'right' && this.x < 503) {
        this.x += 101;
    }

    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }

};


function Gems(x,y) {
  this.x = x;
  this.y = y;
  this.sprite  = 'images/Gem Blue.png';
};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allGems = [new Gems(300,150), new Gems(5,50)];



function Lives(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Heart.png';
};

Lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allLives = [new Lives(400,80), new Lives(100, 160)];


function Rock(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allRock = [new Rock(300,220), new Rock(300,310), new Rock(400,310),
  new Rock(500,310), new Rock(500,220),];

function Key(x,y) {
  this.x = x;
  this.y = y;
  this.visibility = true;
  this.sprite = 'images/key.png';
};

Key.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var key = new Key(400,235);

function Lock(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/lock.jpg';
};

Lock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var lock = new Lock(120,470);
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.



function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if ((Math.abs(player.x - enemy.x) < 40) &&
        (Math.abs(player.y - enemy.y) < 40)) {
      player.reset();
      if (player.lives > 1) {
        player.lives--;
      } else {
        player.lives=3; // Add game-over clause later.
      }
    }
  });
};

function collectLives() {
  allLives.forEach(function(lives) {
    if ((Math.abs(player.x - lives.x) < 40) &&
        (Math.abs(player.y - lives.y) < 20)) {
            player.lives = player.lives + 1;
            var j = allLives.indexOf(lives);
            if (j != -1) {
              allLives.splice(j,1);
            }
    }
  });
};

function collectGems() {
  allGems.forEach(function(gems) {
  if ((Math.abs(player.x - gems.x) < 40) &&
      (Math.abs(player.y - gems.y) < 20)) {
        player.score = player.score + 100;
          var k = allGems.indexOf(gems);
          if(k != -1) {
            allGems.splice(k,1);
          }
    }
  });
};

function collectKey() {
  if ((Math.abs(player.x - key.x) < 40) &&
      (Math.abs(player.y - key.y) < 20)) {
        player.key = player.key + 1;

  }
};
var allRockLength = allRock.length;

function rockColllide() {
  allRock.forEach(function(Rock) {
    if ((Math.abs(player.x - Rock.x) < 40) &&
      (Math.abs(player.y - Rock.y) < 20)) {
        
    }
  });
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
