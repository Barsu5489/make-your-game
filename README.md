# Alien Invasion Game

Alien Invasion is a simple, interactive browser-based game where a spaceship battles waves of alien enemies. The game features dynamic enemy movements, player-controlled spaceship movement, and firing mechanics.

## Features

- **Player-controlled spaceship:** Move left, right, and fire bullets to eliminate aliens.
- **Dynamic alien movement:** Aliens move horizontally and descend upon reaching screen edges.
- **Collision detection:** Bullets collide with aliens to eliminate them.
- **Game area:** Dynamic elements like aliens and bullets are rendered within the game area.

## Project Structure

project-root/ 
├── images/ │ 
├── spaceship.png │ 
├── ufo.png 
├── src/ │ 
├── entity.js │ 
├── alien.js │ 
├── bullet.js │ 
├── ship.js │ 
├── index.js 
├── style.css 
├── index.html


### Key Files

1. **`index.html`**: The main HTML file that serves the game interface.
2. **`style.css`**: Handles the styling of the game elements.
3. **`src/entity.js`**: Base class for all game entities, providing common functionality like positioning.
4. **`src/alien.js`**: Alien class, responsible for alien behavior (movement, collision detection).
5. **`src/bullet.js`**: Bullet class, representing the bullets fired by the spaceship.
6. **`src/ship.js`**: Ship class, managing the player-controlled spaceship.
7. **`src/index.js`**: Main game logic, including game loop, keyboard controls, and collision handling.

## How to Play

1. Open `index.html` in any modern browser.
2. Use the following controls:
   - **Arrow Left**: Move spaceship to the left.
   - **Arrow Right**: Move spaceship to the right.
   - **Spacebar**: Fire bullets at aliens.
3. Eliminate all the aliens before they reach the bottom of the game area.

## Installation

1. Clone the repository:
   ```bash
   git clone https://learn.zone01kisumu.ke/git/ebarsula/make-your-game
   cd make-your-game
   open index.html

```
