import { Alien } from './Alien.js'
import { Bullet } from './bullet.js'
import {Ship} from './ship.js'


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
        removeBullet
    })
    aliens.push(alien)
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
    console.log(x,y)
}
const update = ()=>{
if (keys["ArrowLeft"] && ship.x > 50){
    console.log("left")
    console.log(ship)
    ship.moveLeft()
}
if (keys["ArrowRight"] && ship.x < window.innerWidth - 50 ){
    console.log("Right")
    ship.moveRight()
}

if (keys[" "]){
    ship.fire({
        creatBullet
    })

    console.log("Bullet",bullets )

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
console.log(rightAlien)
if (rightAlien.x > 900){
    aliens.forEach((alien)=>{
        alien.setDirectionLeft()
        alien.moveDown()
        console.log(alien.moveDown())
    })
}
// console.log("Bullet",bullets )
requestAnimationFrame(update)
}

update()
   
