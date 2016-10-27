module ThreeThirty.Client {

    export class Player extends Phaser.Sprite {

        // default stuff
        sprite: Phaser.Sprite;
        cursors: Phaser.CursorKeys;
        brakeDrag: number = 300;
        regularDrag: number = 2;

        ship: IShip;
        inventory: Array<IItem> = new Array<IItem>();
        equipped: Array<IItem> = new Array<IItem>();
        engine: IEngine;
        weapon: IWeapon;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'player', 1);

            // initial inventory / ship population
            this.ship = new Ship();
            var engine = new DefaultEngine();
            var weapon = new DefaultWeapon();
            this.inventory.push(engine);
            this.inventory.push(weapon);
            this.equip(weapon);
            this.equip(engine);

            // default stuff
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.game.input.keyboard.addKey(32).onDown.add(this.shoot.bind(this));
            this.anchor.setTo(0.5);
            this.game = game;
            game.add.existing(this);
            game.physics.enable(this);
            this.body.collideWorldBounds = false;
            this.body.setCircle(20);
            this.body.drag.set(this.brakeDrag);
            this.body.maxVelocity.set(this.ship.speed);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.z = 100;
        }

        update() {

            // acceleration
            if (this.cursors.up.isDown) {
                this.game.physics.arcade.accelerationFromRotation(this.rotation, this.engine.thrust, this.body.acceleration);
            } else {
                this.body.acceleration.set(0);
            }


            // braking
            if (this.cursors.down.isDown) {
                this.body.drag.set(this.brakeDrag);
            } else {
                this.body.drag.set(this.regularDrag);
            }

            // turning
            if (this.cursors.left.isDown) {
                this.body.angularVelocity = -this.engine.turning;
            } else if (this.cursors.right.isDown) {
                this.body.angularVelocity = this.engine.turning;
            } else {
                this.body.angularVelocity = 0;
            }
            
        }

        shoot() {
            if (this.weapon != undefined) {
                this.weapon.fire(this.game, this)
            }
        }

        // set an item to be equipped 
        equip(item: IItem) {
            // make sure item exists in our inventory
            var targetItem = null;
            for (var i = 0; i < this.inventory.length; i++) {
                if (this.inventory[i] == item) {
                    targetItem = this.inventory[i];
                }
            }

            // make sure item is not already equipped
            for (var i = 0; i < this.equipped.length; i++) {
                if (this.equipped[i] == item) {
                    return;
                }
            }

            // okay!  we can equip our item.  Let's do some special checks for specific item types
            // typescript doesn't allow us to check interfaces sanely for some stupid reason so....
            if (targetItem.isEngine) {
                this.engine = targetItem;
            }

            if (targetItem.isWeapon) {
                this.weapon = targetItem;
            }

            // finally, equip our item for UI purposes
            this.equipped.push(targetItem);
        }

        unEquip(item: IItem) {
            for (var i = 0; i < this.equipped.length; i++) {
                if (this.equipped[i] == item) {
                    this.equipped.splice(i);
                }
            }
        }
    }

}