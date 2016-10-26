var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
                this.state.add('Boot', Client.Boot, false);
                this.state.add('Arena', Client.Arena, false);
                this.state.start('Boot');
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
window.onload = function () {
    new ThreeThirty.Client.GameEngine();
};
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var DefaultEngine = (function () {
            function DefaultEngine() {
                this.thrust = 400;
                this.turning = 400;
                this.size = 14;
                this.isEngine = true;
                this.equippable = true;
            }
            return DefaultEngine;
        }());
        Client.DefaultEngine = DefaultEngine;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                _super.call(this, game, x, y, 'player', 1);
                this.brakeDrag = 300;
                this.regularDrag = 2;
                this.inventory = new Array();
                this.equipped = new Array();
                this.ship = new Client.Ship();
                var engine = new Client.DefaultEngine();
                this.inventory.push(engine);
                this.equip(engine);
                this.cursors = this.game.input.keyboard.createCursorKeys();
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
            Player.prototype.update = function () {
                if (this.cursors.up.isDown) {
                    this.game.physics.arcade.accelerationFromRotation(this.rotation, this.engine.thrust, this.body.acceleration);
                }
                else {
                    this.body.acceleration.set(0);
                }
                if (this.cursors.down.isDown) {
                    this.body.drag.set(this.brakeDrag);
                }
                else {
                    this.body.drag.set(this.regularDrag);
                }
                if (this.cursors.left.isDown) {
                    this.body.angularVelocity = -this.engine.turning;
                }
                else if (this.cursors.right.isDown) {
                    this.body.angularVelocity = this.engine.turning;
                }
                else {
                    this.body.angularVelocity = 0;
                }
            };
            Player.prototype.equip = function (item) {
                var targetItem = null;
                for (var i = 0; i < this.inventory.length; i++) {
                    if (this.inventory[i] == item) {
                        targetItem = this.inventory[i];
                    }
                }
                for (var i = 0; i < this.equipped.length; i++) {
                    if (this.equipped[i] == item) {
                        return;
                    }
                }
                if (targetItem.isEngine) {
                    this.engine = targetItem;
                }
                this.equipped.push(targetItem);
            };
            Player.prototype.unEquip = function (item) {
                for (var i = 0; i < this.equipped.length; i++) {
                    if (this.equipped[i] == item) {
                        this.equipped.splice(i);
                    }
                }
            };
            return Player;
        }(Phaser.Sprite));
        Client.Player = Player;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var Ship = (function () {
            function Ship() {
                this.speed = 250;
                this.weight = 100;
                this.hullSpace = 150;
                this.weaponSlots = 2;
            }
            return Ship;
        }());
        Client.Ship = Ship;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var Arena = (function (_super) {
            __extends(Arena, _super);
            function Arena() {
                _super.apply(this, arguments);
            }
            Arena.prototype.preload = function () {
                this.load.image("starBackground", "./assets/backgrounds/stars.png");
                this.load.image("player", "./assets/sprites/ship.png");
            };
            Arena.prototype.create = function () {
                this.background = this.game.add.tileSprite(0, 0, 1200, 1200, "starBackground");
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.player = new Client.Player(this.game, this.world.centerX, this.world.centerX);
            };
            return Arena;
        }(Phaser.State));
        Client.Arena = Arena;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0x000000);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                this.game.state.start('Arena', true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
var ThreeThirty;
(function (ThreeThirty) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
                this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...", { font: "18px Arial", fill: "#A9A91111", align: "center" });
                this.loaderText.anchor.setTo(0.5);
                this.load.image('titlepage', './assets/ui/titlePage.png');
                this.load.image('logo', './assets/ui/gameLogo.png');
                this.load.audio('click', './assets/sounds/click.ogg', true);
                this.load.atlasJSONHash('level01-sprites', './assets/sprites/level01-sprites.png', './assets/sprites/level01-sprites.json');
            };
            Preloader.prototype.create = function () {
                var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start('MainMenu', true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = ThreeThirty.Client || (ThreeThirty.Client = {}));
})(ThreeThirty || (ThreeThirty = {}));
//# sourceMappingURL=game.js.map