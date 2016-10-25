module ThreeThirty.Client {

    export class Arena extends Phaser.State {

        background: Phaser.TileSprite;
        music: Phaser.Sound;
        player: Player;

        preload() {
            this.load.image("starBackground", "./assets/backgrounds/stars.png");
            this.load.image("player", "./assets/sprites/ship.png");
        }

        create() {
            this.background = this.game.add.tileSprite(0, 0, 1200, 1200, "starBackground");
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.player = new Player(this.game, this.world.centerX, this.world.centerX);     
        }

    }

}