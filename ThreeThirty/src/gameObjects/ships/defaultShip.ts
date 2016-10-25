module ThreeThirty.Client {

    // all ships use this interface
    export class Ship implements IShip {
        // base stats
        speed: number = 250;
        weight: number = 100;
        hullSpace: number = 150;
        weaponSlots: number = 2;
    }

}