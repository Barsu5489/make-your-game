// PauseMenu.js
export class PauseMenu {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.createPauseMenuElement();
        this.setupEventListeners();
    }

    createPauseMenuElement() {
        this.pauseMenu = document.createElement('div');
        this.pauseMenu.className = 'pause-menu hidden';
        this.pauseMenu.innerHTML = `
            <div class="pause-menu-content">
                <h2>GAME PAUSED</h2>
                <button id="continueBtn">Continue</button>
                <button id="restartBtn">Restart</button>
            </div>
        `;
        document.body.appendChild(this.pauseMenu);
    }

    setupEventListeners() {
        const continueBtn = this.pauseMenu.querySelector('#continueBtn');
        const restartBtn = this.pauseMenu.querySelector('#restartBtn');

        continueBtn.addEventListener('click', () => this.continueGame());
        restartBtn.addEventListener('click', () => this.restartGame());
    }

    togglePause() {
        this.pauseMenu.classList.toggle('hidden');
        this.gameManager.toggleGamePause();
    }

    continueGame() {
        this.togglePause();
    }

    restartGame() {
        // Reset game state
        this.gameManager.resetGame();
        this.togglePause();
    }
}