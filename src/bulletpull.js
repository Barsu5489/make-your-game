import { Bullet } from "./bullet.js";
export class BulletPool {
    constructor(container, poolSize = 30) {
      this.pool = [];
      this.container = container;
      
      // Pre-initialize pool
      for (let i = 0; i < poolSize; i++) {
        const bullet = new Bullet(container, 0, 0, false);
        bullet.active = false; // Make sure bullets start inactive
        this.pool.push(bullet);
      }
    }
  
    getBullet(x, y, isEnemy) {
      // Find first inactive bullet
      let bullet = this.pool.find(b => !b.active);
      
      // If no inactive bullets found, create a new one
      if (!bullet) {
        bullet = new Bullet(this.container, x, y, isEnemy);
        this.pool.push(bullet);
      }
      
      bullet.reset(x, y, isEnemy);
      bullet.active = true; // Explicitly set active
      return bullet;
    }
  }