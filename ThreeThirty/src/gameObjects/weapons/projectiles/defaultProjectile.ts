module ThreeThirty.Client {

    export class DefaultProjectile extends Phaser.Sprite implements IProjectile {

        hitdamage: number = 100;
        sprite: Phaser.Sprite;
        game: Phaser.Game;
        direction: number;
        point: Phaser.Point;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'defaultProjectile');
            this.game = game;
            this.game.physics.enable(this);
            console.log(x);
            console.log(y);
            this.game.add.sprite(x, y);
        }

        update() {

        }
    }

}