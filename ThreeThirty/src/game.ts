module ThreeThirty.Client {

    export class GameEngine extends Phaser.Game {

        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Arena', Arena, false);
            this.state.start('Boot');

        }
    }
}

window.onload = () => {
    new ThreeThirty.Client.GameEngine();
};