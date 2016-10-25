module ThreeThirty.Client {

    // all ships use this interface
    export class DefaultEngine implements IEngine, IItem {
        // base stats
        thrust: number = 400;
        turning: number = 400;
        size: number = 14;
        isEngine: boolean = true;
        equippable: boolean = true;
    }

}