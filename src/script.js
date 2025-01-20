import { Ship } from "./ship.js";
const ship = new Ship()

const keys = {
    ArrowLeft: false,
    ArrowRight: false,
}

document.addEventListener('keydown', (e)=>{
    console.log(e.code)
    if (keys.hasOwnProperty(e.code)){
        keys[e.code] = true
    }

});
document.addEventListener('keyup', (e)=>{
    console.log(e.code)
    if (keys.hasOwnProperty(e.code)){
        keys[e.code] = false
    }

});

function gameLoop() {
    if (keys.ArrowRight) {
        ship.moveRight(); // Move the ship to the right
    }
    if (keys.ArrowLeft) {
        ship.moveLeft(); // Move the ship to the left
    }

    // Call the game loop again at the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
