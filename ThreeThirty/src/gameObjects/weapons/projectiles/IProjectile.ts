module ThreeThirty.Client {

    // all engines use this interface
    export interface IProjectile {
        // base stats
        hitdamage: number;
        direction: number;
        sprite: Phaser.Sprite;
        update: Function;
    }

}