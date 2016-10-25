module ThreeThirty.Client {

    // all engines use this interface
    export interface IEngine {
        // base stats
        thrust: number;
        turning: number;
        isEngine: boolean;
    }

}