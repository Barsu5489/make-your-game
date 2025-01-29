export class Bullet {
    constructor(container, x, y, isEnemy = false) {
      this.element = document.createElement('div');
      this.element.className = `bullet ${isEnemy ? 'enemy-bullet' : 'player-bullet'}`;
      this.x = x;
      this.y = y;
      this.speed = isEnemy ? 0.2 : -0.4;
      this.active = false;
      this.container = container;
      this.init(container);
    }
  
    init(container) {
      container.appendChild(this.element);
      this.element.style.display = 'none';
    }
  
    update(deltaTime) {
      if (!this.active) return;
      
      this.y += this.speed * deltaTime;
      
      // Update position
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  
      // Check boundaries
      if (this.y < 0 || this.y > 580) {
        this.deactivate();
      }
    }
  
    deactivate() {
      this.active = false;
      this.element.style.display = 'none';
    }
  
    reset(x, y, isEnemy) {
      this.x = x;
      this.y = y;
      this.speed = isEnemy ? 0.2 : -0.4;
      this.active = true;
      this.element.className = `bullet ${isEnemy ? 'enemy-bullet' : 'player-bullet'}`;
      this.element.style.display = 'block';
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }