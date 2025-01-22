const start = document.getElementById("start");
const end = document.getElementById("end");
const btns = document.querySelector('.btns');
let ball = document.createElement('div');
let request;
let i = 0;
let positionX = (window.innerWidth / 2) - (ball.offsetWidth / 2); // Initial position in the middle
const speed = 10;

// Set initial classes and position for the ball
ball.className = 'ball'; 
btns.appendChild(ball);
ball.style.position = 'absolute'; // This ensures the ball can move with left positioning
ball.style.left = `${positionX}px`; // Initial position
let weapons = []; // Array to store weapon elements

// Remove commented-out code for clarity

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        positionX = Math.max(0, positionX - speed); // Prevent moving off-screen left
    } else if (e.key === "ArrowRight") {
        // console.log("left")
        positionX = Math.min(window.innerWidth - ball.offsetWidth, positionX + speed); // Prevent moving off-screen right
    }else if(e.key == " "){
        console.log("space")
        releaseWeapon();
    }
    ball.style.left = `${positionX}px`; // Update the ball's position
});
  // Function to create and release a weapon
  function releaseWeapon() {
    const weapon = document.createElement('div');
    weapon.className = 'weapon';
    weapon.style.left = `${positionX + (ball.offsetWidth / 2 - weapon.offsetWidth / 2)}px`; // Center the weapon under the ball
    weapon.style.bottom = `${ball.offsetHeight}px`; // Start from just below the ball
    document.body.appendChild(weapon);
    weapons.push(weapon); // Add to array for tracking

    // Animate the weapon moving upwards
    animateWeapon(weapon);
}
function animateWeapon(weapon) {
    let positionY = parseInt(weapon.style.bottom) || 0;
    function move() {
        positionY += 5; // Adjust speed as needed
        weapon.style.bottom = `${positionY}px`;
        
        if (positionY < window.innerHeight) {
            requestAnimationFrame(move);
        } else {
            // Remove weapon when it goes out of screen
            weapon.remove();
            weapons = weapons.filter(w => w !== weapon);
        }
    }
    move();
}


const perfAnimation = () => {
    request = requestAnimationFrame(perfAnimation);
    console.log(i++); // This will keep incrementing and logging 'i'
};

// perfAnimation(); // Commented out as it's not needed unless you want a continuous animation

// If you want to start and stop the animation with buttons:
start.addEventListener('click', () => {
    request = requestAnimationFrame(perfAnimation);
});

end.addEventListener('click', () => {
    cancelAnimationFrame(request);
});