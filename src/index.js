import { Alien } from './Alien.js';
import { Bullet } from './bullet.js';
import {Ship} from './ship.js';
import { PauseMenu } from './pausemenu.js';


const keys = {
ArrowLeft: false,
ArrowRight: false,
' ': false

}
document.addEventListener('keydown', e=>{
    keys[e.key] = true
    console.log(keys)
    
})
document.addEventListener('keyup', e=>{
    keys[e.key] = false
    console.log(e)
    
})
const bullets = []
const aliens = []

const aliensGrid = [];
const removeAlien = (alien) => {
    aliens.splice(aliens.indexOf(alien), 1);
    alien.remove();
  
    for (let row = 0; row < aliensGrid.length; row++) {
      for (let col = 0; col < aliensGrid.length; col++) {
        if (aliensGrid[row][col] === alien) {
          aliensGrid[row][col] = null;
        }
      }
    }
  };
  const removeBullet = (bullet) => {
    bullets.splice(bullets.indexOf(bullet), 1);
    bullet.remove();
  };
const isOverlapping = (entity1, entity2) => {
    const rect1 = entity1.el.getBoundingClientRect();
    const rect2 = entity2.el.getBoundingClientRect();
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };
// Update GameManager class in index.js
class GameManager {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.time = 0;
        this.isPaused = false;
        this.timerInterval = null;

        this.contain = document.getElementById('gameArea');
        
        // Score display
        this.scoreElem = document.createElement('span');
        this.scoreElem.className = 'score';
        this.scoreElem.textContent = `Score: ${this.score}`;
        this.contain.appendChild(this.scoreElem);

        // Lives display
        this.livesElem = document.createElement('span');
        this.livesElem.className = 'lives';
        this.livesElem.textContent = `Lives: ${this.lives}`;
        this.contain.appendChild(this.livesElem);

        // Timer display
        this.timerElem = document.createElement('span');
        this.timerElem.className = 'timer';
        this.timerElem.textContent = 'Time: 0:00';
        this.contain.appendChild(this.timerElem);

        this.startTimer();
    }

    incrementScore() {
        this.score++;
        this.updateScoreDisplay();
    }

    decrementLives() {
        this.lives--;
        this.updateLivesDisplay();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    updateScoreDisplay() {
        this.scoreElem.textContent = `Score: ${this.score}`;
    }

    updateLivesDisplay() {
        this.livesElem.textContent = `Lives: ${this.lives}`;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.time++;
                this.updateTimerDisplay();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        this.timerElem.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    toggleGamePause() {
        this.isPaused = !this.isPaused;
    }

    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.time = 0;
        this.updateScoreDisplay();
        this.updateLivesDisplay();
        this.updateTimerDisplay();
        // Add any additional reset logic for aliens, ship, etc.
    }

    gameOver() {
        clearInterval(this.timerInterval);
        // Implement game over logic
        alert(`Game Over! Score: ${this.score}`);
    }
}
  
  // In your game setup, you would have:
  const gameManager = new GameManager();

const pauseMenu = new PauseMenu(gameManager);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        pauseMenu.togglePause();
    }
});
const getBulletLap = (entity)=>{
    for (let bullet of bullets) {
        if (isOverlapping(entity, bullet)) {
          return bullet;
        }
      }
      return null;
}
    
const ship = new Ship();

// const alien = new Alien()

for (let row = 0; row < 5; row++){
for (let col = 0; col < 11; col++){
    const alien = new Alien({
        x:col * 80 + 500,
        y:row  * 80 + 50,
        getBulletLap,
        removeAlien,
        removeBullet,
        gameManager: gameManager 
    })
    aliens.push(alien)
    // aliensGrid[row][col] = alien; 
}

}

const getLeftMostAlien = ()=>{
    return aliens.reduce((min, curr) =>{
        return curr.x < min.x ? curr : min
    })
}
const getRightMostAlien = ()=>{
    return aliens.reduce((min, curr) =>{
        return curr.x > min.x ? min : curr
    })
}


console.log(ship)
const creatBullet = ({ x, y})=>{
    bullets.push(new Bullet({
        x: ship.x + 25, 
        y: ship.y
        
    }))
    // console.log(x,y)
}
const update = ()=>{
if (keys["ArrowLeft"] && ship.x > 50){
    console.log("left")
    // console.log(ship)
    ship.moveLeft()
}
if (keys["ArrowRight"] && ship.x < window.innerWidth - 50 ){
    console.log("Right")
    ship.moveRight()
}

if (keys[" "]){
    keys[' '] = false
    ship.fire({
        creatBullet
    })
keys[' '] = false
    // console.log("Bullet",bullets )

}
bullets.forEach((bullet)=>{
bullet.update()
if (bullet.y < 0){
    bullet.remove()
    bullets.splice(bullets.indexOf(bullet), 1)
}
})
aliens.forEach((alien)=>{
    alien.update()
})
const leftAlien = getLeftMostAlien()
// console.log(leftAlien)
if (leftAlien.x < 80){
    aliens.forEach((alien)=>{
        alien.setDirectionRight()
        alien.moveDown()
    })
}
const rightAlien = getRightMostAlien()
// console.log(rightAlien)
if (rightAlien.x > 900){
    aliens.forEach((alien)=>{
        alien.setDirectionLeft()
        alien.moveDown()
        // console.log(alien.moveDown())
    })
}
// console.log("Bullet",bullets )
requestAnimationFrame(update)
}

update()
   
