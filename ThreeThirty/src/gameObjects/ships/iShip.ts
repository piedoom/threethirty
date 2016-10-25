module ThreeThirty.Client {

    // all ships use this interface
    export interface IShip {
        // base stats
        speed: number;
        weight: number;
        hullSpace: number;
        weaponSlots: number;
    }

}