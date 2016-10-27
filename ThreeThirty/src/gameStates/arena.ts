module ThreeThirty.Client {

    export class Arena extends Phaser.State {

        background: Phaser.TileSprite;
        midground: Phaser.TileSprite;
        foreground: Phaser.TileSprite;
        music: Phaser.Sound;
        player: Player;
        cameraPos: Phaser.Point;

        preload() {
            this.load.image("starBackground", "./assets/backgrounds/stars.png");
            this.load.image("player", "./assets/sprites/ship.png");
            this.load.image('defaultProjectile', "./assets/sprites/bullet.png");
        }

        create() {
            this.cameraPos = new Phaser.Point(0, 0);

            // create background sprites
            this.background = this.game.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, "starBackground");
            this.midground = this.game.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, "starBackground");
            this.foreground = this.game.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, "starBackground");

            this.background.tileScale.set(0.5, 0.5);
            this.midground.tileScale.set(0.75, 0.75);

            this.background.fixedToCamera = true;
            this.midground.fixedToCamera = true;
            this.foreground.fixedToCamera = true;

            // set up physics
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.player = new Player(this.game, this.world.centerX, this.world.centerX);     

            this.game.world.setBounds(-1000, -1000, 10000, 10000);
        }

        update() {
            var lerp = 1;
            this.cameraPos.x += (this.player.x - this.cameraPos.x) * lerp;
            this.cameraPos.y += (this.player.y - this.cameraPos.y) * lerp;
            this.game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y);

            this.background.tilePosition.set(this.game.camera.x * -0.5, this.game.camera.y * -0.5);
            this.midground.tilePosition.set(this.game.camera.x * -0.75, this.game.camera.y * -0.75);
            this.foreground.tilePosition.set(this.game.camera.x * -1, this.game.camera.y * -1);
        }

    }

}