module ThreeThirty.Client {
    export class DefaultWeapon implements IItem, IWeapon {
        // base stats
        fireRate: number = 2;
        isWeapon: boolean = true;
        size: number = 10;
        equippable: boolean = true;

        fire(game: Phaser.Game, player: Player) {
            new DefaultProjectile(game, player.x, player.y);
        }
    }

}