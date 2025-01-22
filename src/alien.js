import {Entity} from "./entity.js";

export class Alien extends Entity{
        constructor({x,y, getBulletLap,removeAlien,removeBullet}){
            super({tag:'img'})
            this.el.src = "../images/ufo.png"
            this.el.style.width = '50px'
            this.SPEED = 5

            this.direction = 'left'
            this.getBulletLap = getBulletLap
            this.removeAlien = removeAlien; 
            this.removeBullet = removeBullet;
        
             this.setX(x) 
            this.setY(y)
            
        }
       
    setDirectionRight(){
        this.direction = 'right'
    }
    setDirectionLeft(){
        this.direction = 'left'
    }
    moveDown(){
        this.setY(this.y + 15)
    }
    update(){
        if (this.direction ==='left'){
            this.setX(this.x - this.SPEED)
        }else{
            this.setX(this.x + this.SPEED)
        }
       const bullet = this.getBulletLap(this)
        if(bullet){
            this.removeAlien(this);
            this.removeBullet(bullet);
        }
    }
    remove() { this.el.remove(); }

}