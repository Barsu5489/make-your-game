export class Player {
    constructor(container) {
      this.element = document.createElement('div');
      this.element.className = 'player';
      this.x = 380; // Center position (800 - playerWidth) / 2
      this.speed = 0.3;
      this.container = container;
      this.width = 30; 
      this.init();
    }
  
    init() {
      this.container.appendChild(this.element);
      this.element.style.transform = `translateX(${this.x}px)`; // Initial position
    }
  
    move(direction, deltaTime) {
      this.x += direction * this.speed * deltaTime;
      // Update boundary check to account for player width
      const maxX = this.container.offsetWidth - this.width;
      this.x = Math.max(0, Math.min(maxX, this.x));
      this.element.style.transform = `translateX(${this.x}px)`;
    }
  }