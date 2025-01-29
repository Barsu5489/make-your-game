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

├── index.html # Main HTML file ├── style.css # Styles for the game ├── game.js # Core game logic and classes └── assets/ # (Optional) Place for any images or additional resources


---

## 🎮 How to Play

1. Open the game in your browser (`index.html`).
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
## ⚡ Performance Optimization  

### Why Disable GPU Acceleration?  

You might expect GPU acceleration to always improve performance, but in some cases—like this game—it can actually introduce **frame drops**. When hardware acceleration is enabled in Chrome, the browser tries to offload rendering tasks to the GPU, but this can backfire due to:  

### 🖼️ Layer Promotion and Memory Overhead  
- Chrome promotes elements to their own compositor layers when using **transforms** and `will-change`.  
- Since the game has **many bullets, enemies, and animated elements**, this results in **many individual layers**.  
- Each layer consumes **GPU memory** and requires management overhead.  
- Too many layers can slow rendering, as the GPU has to **composite them all together**.  

### 🔄 Context Switching  
- When elements frequently update their **transforms**, the browser **switches between CPU and GPU processing**.  
- This **context switching** introduces **overhead and latency**.  
- In a **fast-paced game** where multiple objects move every frame, this switching cost might **outweigh the benefits of GPU acceleration**.  

### 🚀 Memory Bandwidth Limitations  
- GPU acceleration is best for **complex animations on a few elements**.  
- This game has **many simple elements** (bullets, enemies) updating every frame.  
- The bandwidth required to **send all these updates to the GPU** can become a **bottleneck**.  
- The **CPU can sometimes handle these simpler draws more efficiently** without GPU acceleration.  

---

## 🛠️ How to Disable GPU Acceleration in Chrome  

For a **smoother 60 FPS experience**, you can disable GPU acceleration in Chrome by launching it with this flag:  

```bash
chrome.exe --disable-gpu
