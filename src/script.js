import { BulletPool } from "./bulletpull.js";
import { Player } from "./player.js";
import { EnemyGrid } from "./enemygrid.js";
import { InputHandler } from "./inputhundler.js";
class Game {
  constructor() {
    this.container = document.getElementById('gameContainer');
    this.lastTime = 0;
    this.lastShot = 0;
    this.shootingDelay = 250;
    this.score = 0;
    this.gameOver = false;
    this.level = 1;
    this.enemySpeedMultiplier = 1;
    this.lives = 3;
    this.isPaused = false;
    this.startTime = Date.now();
    this.lastEnemyShot = 0;
    this.enemyShootingDelay = 500;
    this.screenShake = false;
    this.fps = 60;
    this.frameInterval = 1000 / this.fps;
    this.accumulator = 0;
    // Initialize bullet pools
    this.bulletPool = new BulletPool(this.container);
    this.enemyBulletPool = new BulletPool(this.container, 30);
    
    this.createScoreDisplay();
    this.player = new Player(this.container);
    this.enemyGrid = new EnemyGrid(this.container);
    this.inputHandler = new InputHandler(this);
    this.createPauseMenu();
    this.createCompleteScoreboard();
    
    this.init();
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
  if (this.gameOver) return;

  const deltaTime = timestamp - this.lastTime;
  this.lastTime = timestamp;
  this.accumulator += deltaTime;

  // Update game state at fixed time steps
  while (this.accumulator >= this.frameInterval) {
    if (!this.isPaused) {
      this.update(this.frameInterval);
    }
    this.accumulator -= this.frameInterval;
  }

  // Render at screen refresh rate
  if (!this.isPaused) {
    this.render();
    this.updateScoreboard();
  }

  requestAnimationFrame(this.gameloop.bind(this));
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
    
    // Check for shooting
    if (this.inputHandler.keys.Space) {
      this.shoot();
    }

    this.bulletPool.pool.forEach(bullet => {
      if (bullet.active) {
        bullet.update(deltaTime);
      }
    });
    
    // Update enemy bullets
    this.enemyBulletPool.pool.forEach(bullet => {
      if (bullet.active) {
        bullet.update(deltaTime);
      }
    });

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
  this.player.element.style.transform = `translateX(${this.player.x}px)`;

  // Update bullet positions
  this.bulletPool.pool.forEach(bullet => {
    if (bullet.active) {
      bullet.element.style.transform = `translate(${bullet.x}px, ${bullet.y}px)`;
    }
  });
  
  this.enemyBulletPool.pool.forEach(bullet => {
    if (bullet.active) {
      bullet.element.style.transform = `translate(${bullet.x}px, ${bullet.y}px)`;
    }
  });

  // Update enemy positions
  this.enemyGrid.enemies.forEach(enemy => {
    enemy.element.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
  });

  // Update score display
  this.scoreElement.textContent = `Score: ${this.score} | Level: ${this.level}`;


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
    const shootingEnemies = this.enemyGrid.enemies.filter(enemy => 
      !this.enemyGrid.enemies.some(other => 
        other.col === enemy.col && other.row > enemy.row
      )
    );
    
    if (shootingEnemies.length > 0) {
      const shooter = shootingEnemies[Math.floor(Math.random() * shootingEnemies.length)];
      const bullet = this.enemyBulletPool.getBullet(
        shooter.x + 15,
        shooter.y + 30,
        true
      );
      this.lastEnemyShot = now;
    }
  }
  
  // Update all bullets from both pools
  this.bulletPool.pool.forEach(bullet => {
    if (bullet.active) bullet.update(deltaTime);
  });
  
  this.enemyBulletPool.pool.forEach(bullet => {
    if (bullet.active) bullet.update(deltaTime);
  });
}
handlePlayerHit() {
  this.screenShake = true;
  this.player.element.style.opacity = '0.5';
  
  setTimeout(() => {
    this.player.element.style.opacity = '1';
    this.screenShake = false;
  }, 200);
  
  this.lives--;
  
  if (this.lives <= 0) {
    this.endGame();
  }
}
// In the Game class, update the shoot() method
shoot() {
  const now = Date.now();
  if (now - this.lastShot >= this.shootingDelay) {
    const bulletX = this.player.x + (this.player.element.offsetWidth / 2) - 1;
    const bullet = this.bulletPool.getBullet(bulletX, 550, false);
    this.lastShot = now;
  }
}

checkCollisions() {
  // Check player bullets with enemies
  this.bulletPool.pool.forEach(bullet => {
    if (!bullet.active) return;

    this.enemyGrid.enemies.forEach(enemy => {
      if (this.isColliding(bullet, enemy)) {
        bullet.deactivate();
        this.removeEnemy(enemy);
        this.score += 100;
      }
    });
  });

  // Check enemy bullets with player
  this.enemyBulletPool.pool.forEach(bullet => {
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
  // Clear container
  this.container.innerHTML = '';
  
  // Reset game state
  this.lastShot = 0;
  this.score = 0;
  this.gameOver = false;
  this.isPaused = false;
  this.lives = 3;
  this.level = 1;
  this.enemySpeedMultiplier = 1;
  this.startTime = Date.now();
  
  // Create new bullet pools
  this.bulletPool = new BulletPool(this.container);
  this.enemyBulletPool = new BulletPool(this.container);
  
  // Recreate game elements
  this.createScoreDisplay();
  this.createCompleteScoreboard();
  this.createPauseMenu();
  this.player = new Player(this.container);
  this.enemyGrid = new EnemyGrid(this.container);
  
  // Restart game loop
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












