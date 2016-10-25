module ThreeThirty.Client {

    // anything that can potentially go in a user's inventory
    export interface IItem {
        // base stats
        size: number;
        equippable: boolean;
    }

}