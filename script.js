class Game {
  constructor(){
    this.container = document.getElementById('gameContainer');
    this.lastTime = 0;
    this.bullets = [];
    this.lastShot = 0;
    this.shootingDelay = 100; 
    this.score = 0;
    this.gameOver = false;
    this.createScoreDisplay();
    this.level = 1;
    this.enemySpeedMultiplier = 1;
    this.player = new Player(this.container);
    this.enemyGrid = new EnemyGrid(this.container);
    this.inputHandler = new InputHandler(this);
    this.init();
    this.lives = 3;
    this.isPaused = false;
    this.startTime = Date.now();
    this.enemyBullets = [];
    this.lastEnemyShot = 0;
    this.enemyShootingDelay = 500; // Enemies shoot every 1 second
    this.createPauseMenu();
    this.createCompleteScoreboard();
    
  }

preloadImages() {
  const images = [
    './ship.png',
    './alien.png',
    './alien-cyan.png',
    './alien-magenta.png',
    './alien-yellow.png'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
init(){
  requestAnimationFrame(this.gameloop.bind(this));
}  
gameloop(timestamp) {
  // Remove the FPS check to let rAF handle timing
  const deltaTime = timestamp - this.lastTime;
  this.lastTime = timestamp;
  
  if (!this.isPaused) {
    this.update(deltaTime);
    this.render();
  }
  
  if (!this.gameOver) {
    requestAnimationFrame(this.gameloop.bind(this));
  }
}
update(deltaTime) {
  if (this.gameOver || this.isPaused) return;

  // Handle player movement
  if (this.inputHandler.keys.ArrowLeft) {
    this.player.move(-1, deltaTime);
  }
  if (this.inputHandler.keys.ArrowRight) {
    this.player.move(1, deltaTime);
  }
  if (this.inputHandler.keys.Space) {
    this.shoot();
  }

  // Update bullets
  this.bullets = this.bullets.filter(bullet => bullet.active);
  this.bullets.forEach(bullet => bullet.update(deltaTime));

  // Update enemies
  this.enemyGrid.update(deltaTime);

  // Check collisions
  this.checkCollisions();
  
  // Check game over conditions
  this.checkGameOver();
  
  // Update score display
  this.updateScore();
  this.handleEnemyShooting(deltaTime);
}
render() {
  // Optional: Add screen shake when player is hit or for explosions
  if (this.screenShake) {
      const shake = Math.random() * 4 - 2; // Random value between -2 and 2
      this.container.style.transform = `translate(${shake}px, ${shake}px)`;
  }

  // Update player position
  this.player.element.style.left = `${this.player.x}px`;

  // Update bullet positions
  this.bullets.forEach(bullet => {
      if (bullet.active) {
          bullet.element.style.top = `${bullet.y}px`;
          bullet.element.style.left = `${bullet.x}px`;
      }
  });

  // Update enemy positions
  this.enemyGrid.enemies.forEach(enemy => {
      enemy.element.style.left = `${enemy.x}px`;
      enemy.element.style.top = `${enemy.y}px`;
  });

  // Update score display
  this.scoreElement.textContent = `Score: ${this.score} | Level: ${this.level}`;

  // Add visual feedback for hits
  this.bullets.forEach(bullet => {
      if (!bullet.active) {
          // Create hit effect
          const hitEffect = document.createElement('div');
          hitEffect.className = 'hit-effect';
          hitEffect.style.cssText = `
              position: absolute;
              width: 20px;
              height: 20px;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 50%;
              left: ${bullet.x - 8}px;
              top: ${bullet.y - 8}px;
              animation: hit-flash 0.2s forwards;
          `;
          this.container.appendChild(hitEffect);
          
          // Remove the hit effect after animation
          setTimeout(() => hitEffect.remove(), 200);
      }
  });

  // Add CSS for hit effect animation if not already present
  if (!document.querySelector('#game-animations')) {
      const style = document.createElement('style');
      style.id = 'game-animations';
      style.textContent = `
          @keyframes hit-flash {
              0% { transform: scale(0.5); opacity: 1; }
              100% { transform: scale(1.5); opacity: 0; }
          }
      `;
      document.head.appendChild(style);
  }
}
createCompleteScoreboard() {
  this.scoreboardElement = document.createElement('div');
  this.scoreboardElement.style.cssText = `
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    font-family: Arial;
    font-size: 16px;
    display: flex;
    gap: 20px;
  `;
  
  this.timerElement = document.createElement('span');
  this.livesElement = document.createElement('span');
  this.scoreElement = document.createElement('span');
  
  this.scoreboardElement.appendChild(this.scoreElement);
  this.scoreboardElement.appendChild(this.livesElement);
  this.scoreboardElement.appendChild(this.timerElement);
  
  this.container.appendChild(this.scoreboardElement);
}
updateScoreboard() {
  const gameTime = Math.floor((Date.now() - this.startTime) / 1000);
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  
  this.scoreElement.textContent = `Score: ${this.score}`;
  this.livesElement.textContent = `Lives: ${this.lives}`;
  this.timerElement.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

createPauseMenu() {
  this.pauseMenuElement = document.createElement('div');
  this.pauseMenuElement.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    display: none;
    text-align: center;
    z-index: 1000;
  `;
  
  const createButton = (text, onClick) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.cssText = `
      display: block;
      margin: 10px auto;
      padding: 10px 20px;
      background: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      z-index: 1000;
    `;
    button.addEventListener('click', onClick);
    return button;
  };
  
  // Bind the methods properly
  this.pauseMenuElement.appendChild(
    createButton('Continue', () => this.togglePause())
  );
  this.pauseMenuElement.appendChild(
    createButton('Restart', () => {
      this.togglePause(); // First unpause
      this.restart();     // Then restart
    })
  );
  
  this.container.appendChild(this.pauseMenuElement);
}

togglePause() {
  this.isPaused = !this.isPaused;
  this.pauseMenuElement.style.display = this.isPaused ? 'block' : 'none';
  
  if (!this.isPaused) {
    requestAnimationFrame(this.gameloop.bind(this));
  }
}

handleEnemyShooting(deltaTime) {
  const now = Date.now();
  if (now - this.lastEnemyShot >= this.enemyShootingDelay) {
    // Randomly select an enemy to shoot
    const shootingEnemies = this.enemyGrid.enemies.filter(enemy => 
      // Only enemies with no other enemies directly below them can shoot
      !this.enemyGrid.enemies.some(other => 
        other.col === enemy.col && other.row > enemy.row
      )
    );
    
    if (shootingEnemies.length > 0) {
      const shooter = shootingEnemies[Math.floor(Math.random() * shootingEnemies.length)];
      const bullet = new Bullet(
        this.container,
        shooter.x + 15, // Center of enemy
        shooter.y + 30, // Below enemy
        true // isEnemy = true
      );
      this.enemyBullets.push(bullet);
      this.lastEnemyShot = now;
    }
  }
  
  // Update enemy bullets
  this.enemyBullets = this.enemyBullets.filter(bullet => bullet.active);
  this.enemyBullets.forEach(bullet => bullet.update(deltaTime));
}
handlePlayerHit() {
  // Visual feedback
  this.player.element.style.opacity = '0.5';
  setTimeout(() => {
    this.player.element.style.opacity = '1';
  }, 200);
  
  if (this.lives <= 0) {
    this.endGame();
  }
}
shoot() {
  const now = Date.now();
  if (now - this.lastShot >= this.shootingDelay) {
    const bullet = new Bullet(
    this.container, 
    this.player.x + 18, // Center of player
    550 // Just above player
   );
   this.bullets.push(bullet);
   this.lastShot = now;
  }
}


  checkCollisions() {
    this.bullets.forEach(bullet => {
        if (!bullet.active) return;

        this.enemyGrid.enemies.forEach(enemy => {
            if (this.isColliding(bullet, enemy)) {
                bullet.deactivate();
                this.removeEnemy(enemy);
                this.score += 100;
            }
        });
    });
    this.enemyBullets.forEach(bullet => {
      if (!bullet.active) return;
      
      if (this.isColliding(bullet, this.player)) {
        bullet.deactivate();
        this.lives--;
        this.handlePlayerHit();
      }
    });
}

isColliding(bullet, enemy) {
    const bulletRect = bullet.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    return !(bulletRect.right < enemyRect.left || 
            bulletRect.left > enemyRect.right || 
            bulletRect.bottom < enemyRect.top || 
            bulletRect.top > enemyRect.bottom);
}

removeEnemy(enemy) {
    enemy.element.remove();
    const index = this.enemyGrid.enemies.indexOf(enemy);
    if (index > -1) {
        this.enemyGrid.enemies.splice(index, 1);
    }
}

createScoreDisplay() {
  this.scoreElement = document.createElement('div');
  this.scoreElement.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      color: white;
      font-family: Arial;
      font-size: 20px;
  `;
  this.container.appendChild(this.scoreElement);
}

updateScore() {
  this.scoreElement.textContent = `Score: ${this.score}`;
}

checkGameOver() {
  // Check if enemies reached bottom
  if (this.enemyGrid.enemies.some(enemy => enemy.y > 500)) {
      this.endGame();
  }
  // Check if all enemies destroyed
  if (this.enemyGrid.enemies.length === 0) {
      this.winGame();
  }
}

endGame() {
  this.gameOver = true;
  this.showGameOverScreen('GAME OVER');
}

winGame() {
  this.gameOver = true;
  this.showGameOverScreen('YOU WIN!');
}

showGameOverScreen(message) {
  const gameOverDiv = document.createElement('div');
  gameOverDiv.style.cssText = `
      background: rgba(0, 0, 0, 0.8);
      padding: 20px;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-family: Arial;
      font-size: 48px;
      text-align: center;
      z-index: 1000;
  `;
  gameOverDiv.innerHTML = `
      ${message}<br>
      <span style="font-size: 24px">Press ENTER to restart</span>
  `;
  this.container.appendChild(gameOverDiv);
}

restart() {
  // Clear all elements
  this.container.innerHTML = '';
  
  // Reset game state
  this.bullets = [];
  this.enemyBullets = [];
  this.lastShot = 0;
  this.score = 0;
  this.gameOver = false;
  this.isPaused = false;
  this.lives = 3;
  this.level = 1;
  this.enemySpeedMultiplier = 1;
  this.startTime = Date.now();
  
  // Recreate all game elements
  this.createScoreDisplay();
  this.createCompleteScoreboard();
  this.createPauseMenu();
  this.player = new Player(this.container);
  this.enemyGrid = new EnemyGrid(this.container);
  
  // Restart the game loop
  this.lastTime = performance.now();
  requestAnimationFrame(this.gameloop.bind(this));
}
levelUp() {
  this.level++;
  this.enemySpeedMultiplier *= 1.2;
  this.enemyGrid.enemies.forEach(enemy => {
      enemy.speed *= 1.2;
  });
}
}
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
});
class Player {
  constructor(container){
    this.element = document.createElement('div');
    this.element.className = 'player';
    this.x = 400;
    this.speed = 0.5;
    this.container = container;
    this.init()

  }
  init() {
    this.element.style.cssText = `
      position: absolute;
      width: 40px;
      height: 40px;
      bottom: 20px;
      left: ${this.x}px;
      background-image: url('./ship.png');
      background-size: cover;
      background-position: center;
    `;
    this.container.appendChild(this.element);
  }
  move(direction, deltaTime) {
    this.x += direction * this.speed * deltaTime;
    this.x = Math.max(0, Math.min(760, this.x)); // boundaries
    this.element.style.left = `${this.x}px`;
 }
}
class Enemy {
  constructor(container, x, y, row, col) {
    this.element = document.createElement('div');
    this.element.className = 'enemy';
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
    this.direction = 1;
    this.speed = 0.1;
    this.alienTypes = [
      './alien.png',
      './alien-cyan.png',
      './alien-magenta.png',
      './alien-yellow.png'
    ];
    this.init(container);
  }

  init(container) {
    // Select alien type based on row
    const alienType = this.alienTypes[this.row % this.alienTypes.length];
    
    this.element.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      left: ${this.x}px;
      top: ${this.y}px;
      background-image: url('${alienType}');
      background-size: cover;
      background-position: center;
    `;
    container.appendChild(this.element);
  }

  move(deltaTime) {
      this.x += this.direction * this.speed * deltaTime;
      this.element.style.left = `${this.x}px`;
  }

  moveDown() {
      this.y += 30;
      this.element.style.top = `${this.y}px`;
      this.direction *= -1;
  }
}
class EnemyGrid {
  constructor(container) {
      this.container = container;
      this.enemies = [];
      this.moveDownFlag = false;
      this.init();
  }

  init() {
      for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 11; col++) {
              const enemy = new Enemy(
                  this.container,
                  100 + col * 50,
                  50 + row * 50,
                  row,
                  col
              );
              this.enemies.push(enemy);
          }
      }
  }

  update(deltaTime) {
      let shouldMoveDown = false;
      
      this.enemies.forEach(enemy => {
          enemy.move(deltaTime);
          
          // Check boundaries
          if (enemy.x < 50 || enemy.x > 700) {
              shouldMoveDown = true;
          }
      });

      if (shouldMoveDown && !this.moveDownFlag) {
          this.enemies.forEach(enemy => enemy.moveDown());
          this.moveDownFlag = true;
      } else if (!shouldMoveDown) {
          this.moveDownFlag = false;
      }
  }
}
class Bullet {
  constructor(container, x, y, isEnemy = false) {
      this.element = document.createElement('div');
      this.element.className = `bullet ${isEnemy ? 'enemy-bullet' : 'player-bullet'}`;
      this.x = x;
      this.y = y;
      this.speed = isEnemy ? 0.3 : -0.5; // Negative for moving up
      this.active = true;
      
      this.init(container);
  }

  init(container) {
      this.element.style.cssText = `
          position: absolute;
          width: 4px;
          height: 12px;
          background: white;
          left: ${this.x}px;
          top: ${this.y}px;
      `;
      container.appendChild(this.element);
  }

  update(deltaTime) {
      if (!this.active) return;
      
      this.y += this.speed * deltaTime;
      this.element.style.top = `${this.y}px`;

      // Remove if out of bounds
      if (this.y < 0 || this.y > 600) {
          this.deactivate();
      }
  }

  deactivate() {
      this.active = false;
      this.element.remove();
  }
}
class InputHandler {
  constructor(game) {
    this.keys = {
      ArrowLeft: false,
      ArrowRight: false,
      Space: false
    };

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = true;
      }
      
      // Handle Enter key for restart
      if (e.code === 'Enter' && game.gameOver) {
        game.restart();
      }
      
      // Handle Escape key for pause
      if (e.code === 'Escape') {
        game.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = false;
      }
    });
  }
}







