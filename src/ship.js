export class Ship{
    constructor(){
        this.gameContainer = document.getElementById('game')

        this.el = document.createElement('img')
        this.el.src = '../images/ship.png'
        this.gameContainer.appendChild(this.el)

        this.x = this.gameContainer.offsetWidth/ 2
        this.y = this.gameContainer.offsetHeight -55

        this.el.style.position = 'absolute';  // Set position to absolute
        this.el.style.left = `${this.x}px`;

        this.el.style.top = `${this.y}px`
    }
    move() {
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }

    // Methods to move the ship
    moveLeft() {
        this.x -= 5;
        this.move();
    }

    moveRight() {
        this.x += 5;
        this.move();
    }
}
