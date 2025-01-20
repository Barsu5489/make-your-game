export class Ship{
    constructor(){
        this.gameContainer = document.getElementById('game')

        this.el = document.createElement('img')
        this.el.src = '../images/ship.png'
        this.gameContainer.appendChild(this.el)


        this.el.style.position = 'absolute';  // Set position to absolute
        
        this.changeX(this.gameContainer.offsetWidth/ 2);

       this.changeY(this.gameContainer.offsetHeight -55)
    }
 
    changeX(x){
        this.x = x
        this.el.style.left = `${this.x}px`;
    }
    changeY(y){
        this.y = y
        this.el.style.top = `${this.y}px`;
    }

    // Methods to move the ship
    moveLeft() {
       this.changeX(this.x - 5)
    }

    moveRight() {
    this.changeX(this.x + 5)
    }
}
