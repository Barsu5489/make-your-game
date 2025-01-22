// import shipImage from '../images/spaceship.png';

import {Entity} from "./entity.js";

export class Ship extends Entity{
    constructor(){
        super({tag: 'img'});
        // this.el = document.createElement('img');
        this.el.src = "../images/spaceship.png"
        document.body.appendChild(this.el);
        this.el.style.width = '50px'
        this.el.className = 'ship'
        this.el.style.position = 'absolute'
         this.canFire = true
        this.setX(window.innerWidth/2)
        this.el.style.left = `${this.x}px`  
        this.setY( this.y =  window.innerHeight - 50)
        
    }

  
    moveLeft(){
        this.setX(this.x -5)
        // requestAnimationFrame(this.moveLeft)
    }    
    moveRight(){
        this.setX(this.x +5)
        // requestAnimationFrame(this.moveLeft)
    }
    fire({creatBullet}){
        // this.canFire = false
        if (this.canFire){

            creatBullet({
                x: Ship.x + 25, 
                y: Ship.y
            })
            
        }
 
     }
   
}