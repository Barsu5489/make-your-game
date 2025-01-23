# Space Invaders Game

A modern browser-based Space Invaders game created using vanilla JavaScript, HTML, and CSS. Engage in the classic battle of shooting down enemy invaders while dodging attacks and racking up your score.

---

## 🚀 Features

- **Player Movement**: Move left or right to evade enemies and position yourself for shots.
- **Shooting Mechanics**: Shoot bullets to destroy enemies. Bullets have a visual feedback effect on impact.
- **Dynamic Enemy Grid**: Enemies move in a grid and speed up as you level up.
- **Collision Detection**: Ensures accurate hit registration between bullets and enemies.
- **Score and Level Tracking**: Displays your current score and level in real-time.
- **Game Over and Restart**: Clear messages and easy restart functionality.
- **CSS Animations**: Smooth animations for bullets, explosions, and hit effects.
- **Level Progression**: Enemies get faster and more challenging as levels increase.

---

## 🛠️ Technologies Used

- **HTML5**: Structure of the game.
- **CSS3**: Styling and animations.
- **JavaScript**: Game logic, rendering, and interactivity.

---

## 📂 Project Structure

├── index.html # Main HTML file
├── style.css # Styles for the game
├── game.js # Core game logic and classes └── assets/ # (Optional) Place for any images or additional resources

---

## 🎮 How to Play

1. Open the game in your browser (index.html).
2. Use the following controls:
   - **Arrow Left**: Move left.
   - **Arrow Right**: Move right.
   - **Spacebar**: Shoot bullets.
3. Destroy all enemies before they reach the bottom of the screen.
4. If enemies reach the bottom or collide with the player, it's game over.
5. Advance to the next level by clearing all enemies.

---

## 🧩 Game Classes

### **Game**
- Handles the main game loop, updates, and rendering.
- Manages bullets, score, and level progression.

### **Player**
- Represents the player character and manages movement and boundaries.

### **Enemy**
- Defines individual enemies, their movement, and behavior.

### **EnemyGrid**
- Manages the grid of enemies, including movement and level progression.

### **Bullet**
- Handles bullet creation, movement, and deactivation.

### **InputHandler**
- Captures and processes keyboard input for player controls and restart.

---

## 📦 Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/space-invaders.git
cd space-invaders
