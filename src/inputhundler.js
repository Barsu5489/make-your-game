export class InputHandler {
    constructor(game) {
      this.keys = {
        ArrowLeft: false,
        ArrowRight: false,
        Space: false
      };
  
      window.addEventListener('keydown', (e) => {
        if (this.keys.hasOwnProperty(e.code)) {
          e.preventDefault(); // Prevent page scrolling
          this.keys[e.code] = true;
        }
              // Handle Enter key for restart
        if (e.code === 'Enter' && game.gameOver) {
          game.restart();
        }
        
        // Handle Escape key for pause
        if (e.code === 'Escape') {
          game.togglePause();
        }
      });
      
      
      window.addEventListener('keyup', (e) => {
        if (this.keys.hasOwnProperty(e.code)) {
          e.preventDefault();
          this.keys[e.code] = false;
        }
      });
  
    }
  }