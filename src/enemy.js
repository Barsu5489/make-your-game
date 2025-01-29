export class Enemy {
    constructor(container, x, y, row, col) {
      this.element = document.createElement('div');
      this.element.className = 'enemy';
      this.x = x;
      this.y = y;
      this.row = row;
      this.col = col;
      this.direction = 1;
      this.speed = 0.05;
      this.width = 30;  // Add explicit width
      this.height = 30; 
      this.alienTypes = [
        './alien.png',
        './alien-cyan.png',
        './alien-magenta.png',
        './alien-yellow.png'
      ];
      this.init(container);
    }
  
    init(container) {
      const alienType = this.alienTypes[this.row % this.alienTypes.length];
      this.element.style.backgroundImage = `url('${alienType}')`;
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
      container.appendChild(this.element);
    }
  
    move(deltaTime) {
      this.x += this.direction * this.speed * deltaTime;
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  
    moveDown() {
      this.y += 30;
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
      this.direction *= -1;
    }
  }
  