// Enemies our player must avoid
function Enemy(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

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

function Player(x,y,lives,key,gems,star) {
  this.x = x;
  this.y = y;
  this.lives = 3;
  this.key = 0;
  this.gems = 0;
  this.star = 0;
  this.getXBlock = function () {return Math.floor(this.x/101);}
  this.getYBlock = function () {return Math.floor((this.y + 30)/83);}
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function (dt) {
  var distance = this.speed * dt;
  x = this.x + distance;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 385;
};

Player.prototype.handleInput = function(direction) {

  if (direction === 'up' && this.y > 0 && !rockColllide(this.x, this.y-83)) {
    this.y -= 83;
  }

  if (direction === 'down' && this.y < 468 && !rockColllide(this.x, this.y+83)) {
    this.y += 83;
  }

  if (direction === 'right' && this.x < 505 && !rockColllide(this.x + 101, this.y)) {
    this.x += 101;
  }

  if (direction === 'left' && this.x > 0 && !rockColllide(this.x - 101, this.y)) {
    this.x -= 101;
  }

};

function Gems(x,y) {
  this.x = x;
  this.y = y;
  this.getXBlock = function () {return Math.floor(this.x/101)}
  this.getYBlock = function () {return Math.floor(this.y/83)}
  this.sprite  = 'images/Gem_Blue.png';
};

Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 80);
};

function Lives(x,y) {
  this.x = x;
  this.y = y;
  this.getXBlock = function () {return Math.floor(this.x/101)};
  this.getYBlock = function () {return Math.floor(this.y/83)};
  this.sprite = 'images/Heart.png';
};

Lives.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y,50,100);
};

function Rock(x,y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function Key(x,y) {
  this.x = x;
  this.y = y;
  this.getXBlock = function () {return Math.floor(this.x/101)};
  this.getYBlock = function () {return Math.floor(this.y/83)};
  this.sprite = 'images/key.png';
};

Key.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y,75,100);
};


function Star(x,y) {
  this.x = x;
  this.y = y;
  this.getXBlock = function () {return Math.floor(this.x/101)};
  this.getYBlock = function () {return Math.floor(this.y/83)};
  this.sprite = 'images/Star.png'
};

Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y,75,100);
};


function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if ((Math.abs(player.x - enemy.x) < 40) &&
        (Math.abs(player.y - enemy.y) < 40)) {
      player.reset();
      if (player.lives > 1) {
        player.lives--;
        alert("You have " + player.lives +  " live(s) left");
      } else {
        alert ("Game Over");
        gameReset();
      }
    }
  });
};


function collectLives() {
  allLives.forEach(function(lives) {
    if((player.getXBlock() == lives.getXBlock()) && (player.getYBlock() == lives.getYBlock())) {
      var j = allLives.indexOf(lives);
      if (j != -1) {
        allLives.splice(j,1);
      }
    }
  });
};


function collectGems() {
  allGems.forEach(function(gems) {
    if((player.getXBlock() == gems.getXBlock()) && (player.getYBlock() == gems.getYBlock())) {
      player.gems++;
      var k = allGems.indexOf(gems);
      if(k != -1) {
        allGems.splice(k,1);
      }
    }
  });
};


function collectKey() {
  allKey.forEach(function(key) {
    if((player.getXBlock() == key.getXBlock()) && (player.getYBlock() == key.getYBlock())){
      player.key = player.key + 1;
      var m = allKey.indexOf(key);
      if(m != -1) {
        allKey.splice(m,1)
      }
    }
  });
};


function collectStar() {
  allStar.forEach(function(Star) {
    if((player.getXBlock() == Star.getXBlock()) && (player.getYBlock() == Star.getYBlock())) {
      player.star++;
      var n = allStar.indexOf(Star);
      if(n != -1) {
        allStar.splice(n,1);
      }
    }
  });
};


function gameWon() {
  if (!player.wonGame && (player.key == 2) && (player.gems == 2) &&
      (player.star == 2) && (player.getXBlock() == 0) &&
      (player.getYBlock() == 0)) {
      alert("You Won!");
      player.wonGame = 1;
      gameReset();
  }
};


function rockColllide(xCoordinate, yCoordinate) {
  return (
      allRock.some(function (rock) {
        return ((Math.abs(rock.x - xCoordinate) < 40) &&
                (Math.abs(rock.y - yCoordinate) < 20))
              }
            )
          );
};


function gameReset(global) {
  player = new Player(202, 385);
  allEnemies = [];
  allGems = [new Gems(327, 200), new Gems(25, 118)];
  allLives = [new Lives(527,120), new Lives(227, 285)];
  allRock = [new Rock(300,220), new Rock(400,140), new Rock(400,310),
                 new Rock(500,310), new Rock(500,220), new Rock(200,60),
                 new Rock(200,-25)];
  allKey = [new Key(520,190), new Key(118,30)];
  allStar = [new Star(110,195), new Star(410,115)];
}

var player, allEnemies, allGems, allLives, allRock, allKey, allStar;
gameReset();
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
