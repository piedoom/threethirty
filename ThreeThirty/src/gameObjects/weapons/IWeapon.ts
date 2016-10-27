module ThreeThirty.Client {

    // all weapons use this interface
    export interface IWeapon {
        // base stats
        fireRate: number;
        isWeapon: boolean;
        fire: Function;
    }

}