import {Entity} from "./entity.js";

export class Bullet extends Entity{
        constructor({x,y}){
            super({className:'bullet'})
            
            this.SPEED = 5
            this.setX(x) 
            this.setY(y)
            
        }
        update(){
            this.setY(this.y - this.SPEED)
        }
        remove(){
            this.el.remove()
            this.el = null
         }
    
}