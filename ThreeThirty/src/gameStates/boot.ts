module ThreeThirty.Client {

    export class Boot extends Phaser.State {
        preload() {
            //You can preload an image here if you dont want to use text for the loading screen
        }

        create() {
            this.stage.setBackgroundColor(0x000000);

            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Arena', true, false);
        }
    }

}