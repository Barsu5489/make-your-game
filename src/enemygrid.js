export class EnemyGrid {
    constructor(container) {
      this.container = container;
      this.enemies = [];
      this.moveDownFlag = false;
      this.enemyWidth = 30;
      this.enemySpacing = 40;
      this.leftBound = 20;
      this.rightBound = container.offsetWidth - (this.enemyWidth + 20);
      this.init();
    }
  
    init() {
      const fragment = document.createDocumentFragment();
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 8; col++) {
          const enemy = new Enemy(
            fragment,
            col * this.enemySpacing + this.leftBound,
            row * this.enemySpacing + 40,
            row,
            col
          );
          this.enemies.push(enemy);
        }
      }
      this.container.appendChild(fragment);
    }
  
    update(deltaTime) {
      let shouldMoveDown = false;
      
      this.enemies.forEach(enemy => {
        enemy.move(deltaTime);
        
        // Update boundary check
        if (enemy.x < this.leftBound || enemy.x > this.rightBound) {
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