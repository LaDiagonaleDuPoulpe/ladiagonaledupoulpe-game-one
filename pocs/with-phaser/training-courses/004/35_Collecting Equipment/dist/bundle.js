webpackJsonp([0],{

/***/ 105:
/*!*************************************!*\
  !*** ./src/prefabs/HUD/MenuItem.js ***!
  \*************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class MenuItem extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.setInteractive();
        this.on('pointerdown', this.select.bind(this));
    }

    select() {
        console.log(this.name + ' selected');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (MenuItem);

/***/ }),

/***/ 1392:
/*!**********************************!*\
  !*** ./src/scenes/TitleScene.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JSONLevelScene__ = __webpack_require__(/*! ./JSONLevelScene */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prefabs_Prefab_js__ = __webpack_require__(/*! ../prefabs/Prefab.js */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prefabs_TextPrefab_js__ = __webpack_require__(/*! ../prefabs/TextPrefab.js */ 148);




class TitleScene extends __WEBPACK_IMPORTED_MODULE_0__JSONLevelScene__["a" /* default */] {
    constructor() {
        super('TitleScene');

        this.prefab_classes = {
            background: __WEBPACK_IMPORTED_MODULE_1__prefabs_Prefab_js__["a" /* default */].prototype.constructor,
            text: __WEBPACK_IMPORTED_MODULE_2__prefabs_TextPrefab_js__["a" /* default */].prototype.constructor
        };
    }

    preload() {
        this.load.json('default_data', 'assets/levels/default_data.json');
    }

    create() {
        super.create();
        this.cache.game.party_data = this.cache.json.get('default_data');
    }

    start_game() {
        this.scene.start('BootScene', { scene: 'town' });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TitleScene);

/***/ }),

/***/ 1393:
/*!**********************************!*\
  !*** ./src/plugins/UserInput.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UserInput {
    constructor(scene) {
        this.scene = scene;

        this.enabled = false;
    }

    set_input(user_input_data) {
        this.scene.input.keyboard.removeAllListeners('keydown');
        this.scene.input.keyboard.removeAllListeners('keyup');

        this.scene.input.keyboard.on('keydown', this.process_input, this);
        this.scene.input.keyboard.on('keyup', this.process_input, this);

        this.user_inputs = user_input_data;

        this.enabled = true;
    }

    process_input(event) {
        if (this.enabled) {
            let user_input = this.user_inputs[event.type][event.key];
            if (user_input) {
                let context = undefined;
                let callback_data = user_input.callback.split(".");
                if (callback_data[0] === "scene") {
                    context = this.scene;
                } else {
                    context = this.scene.prefabs[callback_data[0]];
                }
                let method = context[callback_data[1]];
                method.apply(context, user_input.args);
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (UserInput);

/***/ }),

/***/ 1394:
/*!**********************************!*\
  !*** ./src/scenes/WorldScene.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JSONLevelScene__ = __webpack_require__(/*! ./JSONLevelScene */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prefabs_Prefab_js__ = __webpack_require__(/*! ../prefabs/Prefab.js */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prefabs_TextPrefab_js__ = __webpack_require__(/*! ../prefabs/TextPrefab.js */ 148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__prefabs_world_Player_js__ = __webpack_require__(/*! ../prefabs/world/Player.js */ 1395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__prefabs_world_Door_js__ = __webpack_require__(/*! ../prefabs/world/Door.js */ 1396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__prefabs_world_NPC_js__ = __webpack_require__(/*! ../prefabs/world/NPC.js */ 1397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__prefabs_world_EnemySpawner_js__ = __webpack_require__(/*! ../prefabs/world/EnemySpawner.js */ 1399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__prefabs_world_Equipment_js__ = __webpack_require__(/*! ../prefabs/world/Equipment.js */ 1400);









class WorldScene extends __WEBPACK_IMPORTED_MODULE_0__JSONLevelScene__["a" /* default */] {
    constructor() {
        super('WorldScene');

        this.prefab_classes = {
            player: __WEBPACK_IMPORTED_MODULE_3__prefabs_world_Player_js__["a" /* default */].prototype.constructor,
            door: __WEBPACK_IMPORTED_MODULE_4__prefabs_world_Door_js__["a" /* default */].prototype.constructor,
            npc: __WEBPACK_IMPORTED_MODULE_5__prefabs_world_NPC_js__["a" /* default */].prototype.constructor,
            enemy_spawner: __WEBPACK_IMPORTED_MODULE_6__prefabs_world_EnemySpawner_js__["a" /* default */].prototype.constructor,
            equipment: __WEBPACK_IMPORTED_MODULE_7__prefabs_world_Equipment_js__["a" /* default */].prototype.constructor
        };

        this.TEXT_STYLE = { font: "14px Kells", fill: "#FFFFFF" };
    }

    preload() {
        for (let npc_message_name in this.level_data.npc_messages) {
            this.load.text(npc_message_name, this.level_data.npc_messages[npc_message_name]);
        }

        for (let enemy_encounter_name in this.level_data.enemy_encounters) {
            this.load.json(enemy_encounter_name, this.level_data.enemy_encounters[enemy_encounter_name]);
        }
    }

    create() {
        // create map and set tileset
        this.map = this.add.tilemap(this.level_data.map.key);
        let tileset_index = 0;
        this.tilesets = {};
        this.map.tilesets.forEach(function (tileset) {
            let map_tileset = this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
            this.tilesets[this.level_data.map.tilesets[tileset_index]] = map_tileset;
            tileset_index += 1;
        }, this);

        // create map layers before groups
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset]);
            if (layer.properties.collision) {
                // collision layer
                this.map.setCollisionByExclusion([-1]);
            }
        }, this);

        super.create();

        this.map.objects.forEach(function (object_layer) {
            object_layer.objects.forEach(this.create_object, this);
        }, this);
    }

    create_object(object) {
        // tiled coordinates starts in the bottom left corner
        let object_y = object.gid ? object.y - this.map.tileHeight / 2 : object.y + object.height / 2;
        let position = { "x": object.x + this.map.tileHeight / 2, "y": object_y };
        // create object according to its type
        if (this.prefab_classes.hasOwnProperty(object.type)) {
            let prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
        }
    }

    update() {
        for (let prefab_name in this.prefabs) {
            this.prefabs[prefab_name].update();
        }
    }

    end_talk() {
        this.current_message_box.destroy();
        this.user_input.set_input(this.user_inputs.town_user_input);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (WorldScene);

/***/ }),

/***/ 1395:
/*!*************************************!*\
  !*** ./src/prefabs/world/Player.js ***!
  \*************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class Player extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.walking_speed = +properties.walking_speed;

        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;

        this.moving = { left: false, right: false, up: false, down: false };

        if (!this.scene.anims.anims.has('walking_down')) {
            this.scene.anims.create({
                key: 'walking_down',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [0, 4, 8, 12] }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.anims.has('walking_up')) {
            this.scene.anims.create({
                key: 'walking_up',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [1, 5, 9, 13] }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.anims.has('walking_left')) {
            this.scene.anims.create({
                key: 'walking_left',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [2, 6, 10, 14] }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.anims.has('walking_right')) {
            this.scene.anims.create({
                key: 'walking_right',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [3, 7, 11, 15] }),
                frameRate: 6,
                repeat: -1
            });
        }

        this.stopped_frames = [0, 1, 0, 2, 3];
    }

    update() {
        this.scene.physics.world.collide(this, this.scene.layers.buildings);

        if (this.moving.left && this.body.velocity.x <= 0) {
            this.body.velocity.x = -this.walking_speed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walking_left', true);
            }
        } else if (this.moving.right && this.body.velocity.x >= 0) {
            this.body.velocity.x = this.walking_speed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walking_right', true);
            }
        } else {
            this.body.velocity.x = 0;
        }

        if (this.moving.up && this.body.velocity.y <= 0) {
            this.body.velocity.y = -this.walking_speed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walking_up', true);
            }
        } else if (this.moving.down && this.body.velocity.y >= 0) {
            this.body.velocity.y = this.walking_speed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walking_down', true);
            }
        } else {
            this.body.velocity.y = 0;
        }

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            // stop current animation
            this.anims.stop();
            this.setFrame(this.stopped_frames[this.body.facing - 10]);
        }
    }

    change_movement(direction, move) {
        this.moving[direction] = move;
    }

    stop() {
        this.moving = { left: false, right: false, up: false, down: false };
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),

/***/ 1396:
/*!***********************************!*\
  !*** ./src/prefabs/world/Door.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class Door extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.next_level = properties.next_level;

        this.scene.physics.add.existing(this);
        this.body.immovable = true;
    }

    update() {
        if (this.scene) {
            this.scene.physics.world.collide(this, this.scene.groups.players, this.enter, null, this);
        }
    }

    enter() {
        this.scene.scene.start('BootScene', { scene: this.next_level });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Door);

/***/ }),

/***/ 1397:
/*!**********************************!*\
  !*** ./src/prefabs/world/NPC.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HUD_MessageBox__ = __webpack_require__(/*! ../HUD/MessageBox */ 1398);



class NPC extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.message = this.scene.cache.text.get(properties.message);

        this.scene.physics.add.existing(this);
        this.body.immovable = true;

        this.MESSAGE_BOX_POSITION = { x: 0, y: 360 };
    }

    update() {
        if (this.scene) {
            this.scene.physics.world.collide(this, this.scene.groups.players, this.talk, null, this);
        }
    }

    talk(npc, player) {
        player.stop();

        this.scene.current_message_box = new __WEBPACK_IMPORTED_MODULE_1__HUD_MessageBox__["a" /* default */](this.scene, this.name + "_message_box", this.MESSAGE_BOX_POSITION, { texture: "message_box_image", group: "hud", message: this.message });
        this.scene.user_input.set_input(this.scene.user_inputs.talking_user_input);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NPC);

/***/ }),

/***/ 1398:
/*!***************************************!*\
  !*** ./src/prefabs/HUD/MessageBox.js ***!
  \***************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextPrefab__ = __webpack_require__(/*! ../TextPrefab */ 148);



class MessageBox extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.message_text = new __WEBPACK_IMPORTED_MODULE_1__TextPrefab__["a" /* default */](this.scene, this.name + "_message", { x: this.x + this.width / 2, y: this.y + 50 }, { group: "hud", text: properties.message, style: Object.create(this.scene.TEXT_STYLE) });

        this.setOrigin(0);
        this.message_text.setOrigin(0.5);
    }

    destroy() {
        super.destroy();
        this.message_text.destroy();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (MessageBox);

/***/ }),

/***/ 1399:
/*!*******************************************!*\
  !*** ./src/prefabs/world/EnemySpawner.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class EnemySpawner extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.scene.physics.add.existing(this);
        this.body.immovable = true;

        this.encounter = this.scene.cache.json.get(properties.encounter);
    }

    update() {
        if (this.scene) {
            this.overlapping = this.scene.physics.world.collide(this, this.scene.groups.players, this.spawn, null, this);
        }
    }

    spawn() {
        this.scene.scene.start('BootScene', { scene: 'battle', extra_parameters: { previous_level: this.scene.level_data.level, encounter: this.encounter } });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (EnemySpawner);

/***/ }),

/***/ 14:
/*!*******************************!*\
  !*** ./src/prefabs/Prefab.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Prefab extends Phaser.GameObjects.Sprite {
    constructor(scene, name, position, properties) {
        super(scene, position.x, position.y, properties.texture, properties.frame);

        this.scene = scene;
        this.name = name;
        this.scene.add.existing(this);
        this.scene.groups[properties.group].add(this);

        if (properties.scale) {
            this.setScale(properties.scale.x, properties.scale.y);
        }

        if (properties.anchor) {
            this.setOrigin(properties.anchor.x, properties.anchor.y);
        }

        this.scene.prefabs[name] = this;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Prefab);

/***/ }),

/***/ 1400:
/*!****************************************!*\
  !*** ./src/prefabs/world/Equipment.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class Equipment extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.setScale(0.3, 0.3);

        this.unit_name = properties.unit_name;
        this.body_part = properties.body_part;
        this.stat = properties.stat;
        this.bonus = +properties.bonus;

        this.scene.physics.add.existing(this);
        this.body.immovable = true;
        this.body.setSize(this.width * this.scaleX, this.height * this.scaleY);

        this.scene.physics.add.collider(this, this.scene.groups.players, this.collect, null, this);
    }

    collect() {
        let unit_data = this.scene.cache.game.party_data[this.unit_name];

        if (unit_data.equipment[this.body_part].name !== this.name) {
            unit_data.equipment[this.body_part] = { name: this.name };
            unit_data.stats_bonus[this.stat] = this.bonus;
            this.destroy();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Equipment);

/***/ }),

/***/ 1401:
/*!***********************************!*\
  !*** ./src/scenes/BattleScene.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JSONLevelScene__ = __webpack_require__(/*! ./JSONLevelScene */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prefabs_Prefab_js__ = __webpack_require__(/*! ../prefabs/Prefab.js */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prefabs_TextPrefab_js__ = __webpack_require__(/*! ../prefabs/TextPrefab.js */ 148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__prefabs_battle_Unit_js__ = __webpack_require__(/*! ../prefabs/battle/Unit.js */ 295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__prefabs_battle_EnemyUnit_js__ = __webpack_require__(/*! ../prefabs/battle/EnemyUnit.js */ 1402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__prefabs_battle_PlayerUnit_js__ = __webpack_require__(/*! ../prefabs/battle/PlayerUnit.js */ 1403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__prefabs_HUD_MenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/MenuItem.js */ 105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__prefabs_HUD_PhysicalAttackMenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/PhysicalAttackMenuItem.js */ 1404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__prefabs_HUD_MagicalAttackMenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/MagicalAttackMenuItem.js */ 1405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__prefabs_HUD_EnemyMenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/EnemyMenuItem.js */ 1407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__prefabs_HUD_RunMenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/RunMenuItem.js */ 1408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__prefabs_HUD_InventoryMenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/InventoryMenuItem.js */ 1409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__prefabs_HUD_ItemMenuItem_js__ = __webpack_require__(/*! ../prefabs/HUD/ItemMenuItem.js */ 555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__prefabs_HUD_Menu_js__ = __webpack_require__(/*! ../prefabs/HUD/Menu.js */ 1410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__prefabs_HUD_ShowPlayerUnit_js__ = __webpack_require__(/*! ../prefabs/HUD/ShowPlayerUnit.js */ 1411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__priority_queue_min_js__ = __webpack_require__(/*! ../priority-queue.min.js */ 1413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__priority_queue_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__priority_queue_min_js__);

















class BattleScene extends __WEBPACK_IMPORTED_MODULE_0__JSONLevelScene__["a" /* default */] {
    constructor() {
        super('BattleScene');

        this.prefab_classes = {
            background: __WEBPACK_IMPORTED_MODULE_1__prefabs_Prefab_js__["a" /* default */].prototype.constructor,
            player_unit: __WEBPACK_IMPORTED_MODULE_5__prefabs_battle_PlayerUnit_js__["a" /* default */].prototype.constructor,
            enemy_unit: __WEBPACK_IMPORTED_MODULE_4__prefabs_battle_EnemyUnit_js__["a" /* default */].prototype.constructor,
            menu_item: __WEBPACK_IMPORTED_MODULE_6__prefabs_HUD_MenuItem_js__["a" /* default */].prototype.constructor,
            menu: __WEBPACK_IMPORTED_MODULE_13__prefabs_HUD_Menu_js__["a" /* default */].prototype.constructor,
            enemy_menu_item: __WEBPACK_IMPORTED_MODULE_9__prefabs_HUD_EnemyMenuItem_js__["a" /* default */].prototype.constructor,
            physical_attack_menu_item: __WEBPACK_IMPORTED_MODULE_7__prefabs_HUD_PhysicalAttackMenuItem_js__["a" /* default */].prototype.constructor,
            magical_attack_menu_item: __WEBPACK_IMPORTED_MODULE_8__prefabs_HUD_MagicalAttackMenuItem_js__["a" /* default */].prototype.constructor,
            run_menu_item: __WEBPACK_IMPORTED_MODULE_10__prefabs_HUD_RunMenuItem_js__["a" /* default */].prototype.constructor,
            inventory_menu_item: __WEBPACK_IMPORTED_MODULE_11__prefabs_HUD_InventoryMenuItem_js__["a" /* default */].prototype.constructor,
            show_player_unit: __WEBPACK_IMPORTED_MODULE_14__prefabs_HUD_ShowPlayerUnit_js__["a" /* default */].prototype.constructor,
            item_menu_item: __WEBPACK_IMPORTED_MODULE_12__prefabs_HUD_ItemMenuItem_js__["a" /* default */].prototype.constructor
        };

        this.rnd = new Phaser.Math.RandomDataGenerator();
    }

    init(data) {
        super.init(data);

        this.previous_level = data.extra_parameters.previous_level;
        this.encounter = data.extra_parameters.encounter;

        console.log(this.cache.game.party_data);
    }

    preload() {
        this.load.json('experience_table', 'assets/levels/experience_table.json');
    }

    create() {
        super.create();

        this.experience_table = this.cache.json.get('experience_table');

        for (let enemy_unit_name in this.encounter.enemy_data) {
            this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
        }

        for (let player_unit_name in this.cache.game.party_data) {
            let unit_data = this.cache.game.party_data[player_unit_name];
            this.prefabs[player_unit_name].stats = {};
            for (let stat_name in unit_data.stats) {
                this.prefabs[player_unit_name].stats[stat_name] = unit_data.stats[stat_name] + unit_data.stats_bonus[stat_name];
            }

            this.prefabs[player_unit_name].experience = unit_data.experience;
            this.prefabs[player_unit_name].current_level = unit_data.current_level;
        }

        this.cache.game.inventory.collect_item(this, { "type": "potion", "properties": { "group": "items", "item_texture": "potion_image" } });

        this.cache.game.inventory.create_menu(this, this.prefabs.items_menu);

        this.units = new __WEBPACK_IMPORTED_MODULE_15__priority_queue_min_js___default.a({ comparator: function (unit_a, unit_b) {
                return unit_a.act_turn - unit_b.act_turn;
            } });

        this.groups.player_units.children.each(function (unit) {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        }, this);
        this.groups.enemy_units.children.each(function (unit) {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        }, this);

        this.next_turn();
    }

    start_game() {
        this.scene.start('BootScene', { scene: 'town' });
    }

    next_turn() {
        if (this.groups.enemy_units.countActive() === 0) {
            this.end_battle();
            return;
        }

        if (this.groups.player_units.countActive() === 0) {
            this.game_over();
            return;
        }

        this.current_unit = this.units.dequeue();
        // if the unit is alive, it acts, otherwise goes to the next turn
        if (this.current_unit.active) {
            this.current_unit.act();
            this.current_unit.calculate_act_turn(this.current_unit.act_turn);
            this.units.queue(this.current_unit);
        } else {
            this.next_turn();
        }
    }

    back_to_world() {
        this.scene.start("BootScene", { scene: this.previous_level });
    }

    game_over() {
        this.scene.start("BootScene", { scene: 'title' });
    }

    end_battle() {
        let received_experience = this.encounter.reward.experience;
        this.groups.player_units.children.each(player_unit => {
            player_unit.receive_experience(received_experience / this.groups.player_units.children.size);

            this.cache.game.party_data[player_unit.name].stats = player_unit.stats;
            this.cache.game.party_data[player_unit.name].experience = player_unit.experience;
            this.cache.game.party_data[player_unit.name].current_level = player_unit.current_level;
        });

        this.encounter.reward.items.forEach(function (item_object) {
            this.cache.game.inventory.collect_item(this, item_object);
        }, this);

        this.back_to_world();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BattleScene);

/***/ }),

/***/ 1402:
/*!*****************************************!*\
  !*** ./src/prefabs/battle/EnemyUnit.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Unit__ = __webpack_require__(/*! ./Unit */ 295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__battle_PhysicalAttack__ = __webpack_require__(/*! ../battle/PhysicalAttack */ 554);




class EnemyUnit extends __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.target_units = properties.target_units;

        this.attack = new __WEBPACK_IMPORTED_MODULE_2__battle_PhysicalAttack__["a" /* default */](this.scene, this.name + "_attack", { x: 0, y: 0 }, { group: "attacks", owner: this });
    }

    choose_target() {
        let target = undefined;
        let target_index = this.scene.rnd.between(0, this.scene.groups[this.target_units].countActive() - 1);
        let alive_player_unit_index = 0;
        this.scene.groups[this.target_units].children.each(function (unit) {
            if (unit.active) {
                if (alive_player_unit_index === target_index) {
                    target = unit;
                }
                alive_player_unit_index += 1;
            }
        }, this);
        return target;
    }

    act() {
        this.scene.prefabs.show_player_unit.show(false);

        let target = this.choose_target();

        this.attack.hit(target);
    }

    destroy() {
        if (this.active) {
            let menu_item = this.scene.prefabs[this.name + '_item'];
            menu_item.destroy();
            super.destroy();
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (EnemyUnit);

/***/ }),

/***/ 1403:
/*!******************************************!*\
  !*** ./src/prefabs/battle/PlayerUnit.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Unit__ = __webpack_require__(/*! ./Unit */ 295);



class PlayerUnit extends __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.face_texture = properties.face_texture;
    }

    act() {
        this.scene.prefabs.show_player_unit.show(true);
        this.scene.prefabs.actions_menu.enable(true);
        this.scene.prefabs.show_player_unit.change_current_unit(this, this.face_texture);
    }

    receive_experience(experience) {
        this.experience += experience;
        let next_level_data = this.scene.experience_table[this.current_level];
        if (this.experience >= next_level_data.required_exp) {
            this.current_level += 1;
            this.experience = 0;
            for (let stat in next_level_data.stats_increase) {
                if (next_level_data.stats_increase.hasOwnProperty(stat)) {
                    this.stats[stat] += next_level_data.stats_increase[stat];
                }
            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (PlayerUnit);

/***/ }),

/***/ 1404:
/*!***************************************************!*\
  !*** ./src/prefabs/HUD/PhysicalAttackMenuItem.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuItem__ = __webpack_require__(/*! ./MenuItem */ 105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__battle_PhysicalAttack__ = __webpack_require__(/*! ../battle/PhysicalAttack */ 554);




class PhysicalAttackMenuItem extends __WEBPACK_IMPORTED_MODULE_1__MenuItem__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    select() {
        this.scene.current_attack = new __WEBPACK_IMPORTED_MODULE_2__battle_PhysicalAttack__["a" /* default */](this.scene, this.scene.current_unit.name + "_attack", { x: 0, y: 0 }, { group: "attacks", owner: this.scene.current_unit });

        this.scene.prefabs.actions_menu.enable(false);
        this.scene.prefabs.enemy_units_menu.enable(true);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PhysicalAttackMenuItem);

/***/ }),

/***/ 1405:
/*!**************************************************!*\
  !*** ./src/prefabs/HUD/MagicalAttackMenuItem.js ***!
  \**************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuItem__ = __webpack_require__(/*! ./MenuItem */ 105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__battle_MagicalAttack__ = __webpack_require__(/*! ../battle/MagicalAttack */ 1406);




class MagicalAttackMenuItem extends __WEBPACK_IMPORTED_MODULE_1__MenuItem__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.MANA_COST = 10;
    }

    select() {
        if (this.scene.current_unit.stats.mana >= this.MANA_COST) {
            this.scene.current_attack = new __WEBPACK_IMPORTED_MODULE_2__battle_MagicalAttack__["a" /* default */](this.scene, this.scene.current_unit.name + "_attack", { x: 0, y: 0 }, { group: "attacks", owner: this.scene.current_unit, mana_cost: this.MANA_COST });

            this.scene.prefabs.actions_menu.enable(false);
            this.scene.prefabs.enemy_units_menu.enable(true);
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (MagicalAttackMenuItem);

/***/ }),

/***/ 1406:
/*!*********************************************!*\
  !*** ./src/prefabs/battle/MagicalAttack.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class MagicalAttack extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.owner = properties.owner;
        this.mana_cost = properties.mana_cost;
    }

    hit(target) {
        let attack_multiplier = this.scene.rnd.realInRange(0.8, 1.2);
        let defense_multiplier = this.scene.rnd.realInRange(0.8, 1.2);

        let damage = Math.max(0, Math.round(attack_multiplier * this.owner.stats.magic_attack - defense_multiplier * target.stats.defense));

        target.receive_damage(damage);

        this.owner.stats.mana -= this.mana_cost;

        this.owner.anims.play(this.owner.name + "_attack2");
    }

}

/* harmony default export */ __webpack_exports__["a"] = (MagicalAttack);

/***/ }),

/***/ 1407:
/*!******************************************!*\
  !*** ./src/prefabs/HUD/EnemyMenuItem.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuItem__ = __webpack_require__(/*! ./MenuItem */ 105);



class EnemyMenuItem extends __WEBPACK_IMPORTED_MODULE_1__MenuItem__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        this.enemy = this.scene.prefabs[properties.enemy_name];
    }

    select() {
        this.scene.prefabs.enemy_units_menu.enable(false);
        this.scene.current_attack.hit(this.enemy);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (EnemyMenuItem);

/***/ }),

/***/ 1408:
/*!****************************************!*\
  !*** ./src/prefabs/HUD/RunMenuItem.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuItem__ = __webpack_require__(/*! ./MenuItem */ 105);



class RunMenuItem extends __WEBPACK_IMPORTED_MODULE_1__MenuItem__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.run_chance = properties.run_chance;
    }

    select() {
        let random_number = this.scene.rnd.frac();
        console.log(random_number);
        if (random_number < this.run_chance) {
            this.scene.back_to_world();
        } else {
            this.scene.next_turn();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (RunMenuItem);

/***/ }),

/***/ 1409:
/*!**********************************************!*\
  !*** ./src/prefabs/HUD/InventoryMenuItem.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuItem__ = __webpack_require__(/*! ./MenuItem */ 105);



class InventoryMenuItem extends __WEBPACK_IMPORTED_MODULE_1__MenuItem__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    select() {
        if (this.scene.cache.game.inventory.has_items()) {
            this.scene.prefabs.actions_menu.enable(false);
            this.scene.prefabs.items_menu.enable(true);
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (InventoryMenuItem);

/***/ }),

/***/ 1410:
/*!*********************************!*\
  !*** ./src/prefabs/HUD/Menu.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class Menu extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.menu_items = [];
        for (let menu_item_name in properties.menu_items) {
            var new_item = this.scene.create_prefab(menu_item_name, properties.menu_items[menu_item_name]);
            this.menu_items.push(new_item);
        }

        this.enable(false);
    }

    enable(enable) {
        this.menu_items.forEach(menu_item => {
            if (menu_item.active) {
                menu_item.setInteractive(enable);
                menu_item.setVisible(enable);
            }
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Menu);

/***/ }),

/***/ 1411:
/*!*******************************************!*\
  !*** ./src/prefabs/HUD/ShowPlayerUnit.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShowStatWithBar__ = __webpack_require__(/*! ./ShowStatWithBar */ 1412);



class ShowPlayerUnit extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.face_texture = properties.face_texture;

        this.unit_data = this.scene.prefabs[properties.prefab];

        this.player_unit_health = new __WEBPACK_IMPORTED_MODULE_1__ShowStatWithBar__["a" /* default */](this.scene, this.name + "_health", { x: this.x, y: this.y }, { group: "hud", anchor: { x: 0, y: 0 }, text: "HP", style: properties.text_style, prefab: properties.prefab, stat: "health", bar_texture: "healthbar_image" });

        this.player_unit_mana = new __WEBPACK_IMPORTED_MODULE_1__ShowStatWithBar__["a" /* default */](this.scene, this.name + "_mana", { x: this.x, y: this.y + 30 }, { group: "hud", anchor: { x: 0, y: 0 }, text: "MP", style: properties.text_style, prefab: properties.prefab, stat: "mana", bar_texture: "manabar_image" });

        this.face_sprite = this.scene.add.sprite(this.x + 130, this.y, properties.face_texture);
        this.face_sprite.setOrigin(0);
    }

    change_current_unit(new_prefab, new_face_texture) {
        this.unit_data = new_prefab;
        this.player_unit_health.unit_data = this.unit_data;
        this.player_unit_mana.unit_data = this.unit_data;
        this.face_sprite.setTexture(new_face_texture);
    }

    show(show) {
        this.player_unit_health.show(show);
        this.player_unit_mana.show(show);
        this.face_sprite.setVisible(show);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ShowPlayerUnit);

/***/ }),

/***/ 1412:
/*!********************************************!*\
  !*** ./src/prefabs/HUD/ShowStatWithBar.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextPrefab__ = __webpack_require__(/*! ../TextPrefab */ 148);


class ShowStatWithBar extends __WEBPACK_IMPORTED_MODULE_0__TextPrefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.unit_data = this.scene.prefabs[properties.prefab];
        this.stat = properties.stat;
        this.bar_sprite = this.scene.add.sprite(this.x, this.y + 20, properties.bar_texture);
        this.bar_sprite.setOrigin(0);
    }

    update() {
        this.current_stat = this.unit_data.stats[this.stat];
        this.bar_sprite.setScale(this.current_stat / 100, 1.0);
    }

    show(show) {
        this.setVisible(show);
        this.bar_sprite.setVisible(show);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ShowStatWithBar);

/***/ }),

/***/ 1413:
/*!***********************************!*\
  !*** ./src/priority-queue.min.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function (t) {
  if (true) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.PriorityQueue = t();
  }
}(function () {
  return function t(e, i, r) {
    function o(n, s) {
      if (!i[n]) {
        if (!e[n]) {
          var h = "function" == typeof require && require;if (!s && h) return require(n, !0);if (a) return a(n, !0);var u = new Error("Cannot find module '" + n + "'");throw u.code = "MODULE_NOT_FOUND", u;
        }var p = i[n] = { exports: {} };e[n][0].call(p.exports, function (t) {
          var i = e[n][1][t];return o(i ? i : t);
        }, p, p.exports, t, e, i, r);
      }return i[n].exports;
    }for (var a = "function" == typeof require && require, n = 0; n < r.length; n++) o(r[n]);return o;
  }({ 1: [function (t, e, i) {
      var r,
          o,
          a,
          n,
          s,
          h = function (t, e) {
        function i() {
          this.constructor = t;
        }for (var r in e) u.call(e, r) && (t[r] = e[r]);return i.prototype = e.prototype, t.prototype = new i(), t.__super__ = e.prototype, t;
      },
          u = {}.hasOwnProperty;r = t("./PriorityQueue/AbstractPriorityQueue"), o = t("./PriorityQueue/ArrayStrategy"), n = t("./PriorityQueue/BinaryHeapStrategy"), a = t("./PriorityQueue/BHeapStrategy"), s = function (t) {
        function e(t) {
          t || (t = {}), t.strategy || (t.strategy = n), t.comparator || (t.comparator = function (t, e) {
            return (t || 0) - (e || 0);
          }), e.__super__.constructor.call(this, t);
        }return h(e, t), e;
      }(r), s.ArrayStrategy = o, s.BinaryHeapStrategy = n, s.BHeapStrategy = a, e.exports = s;
    }, { "./PriorityQueue/AbstractPriorityQueue": 2, "./PriorityQueue/ArrayStrategy": 3, "./PriorityQueue/BHeapStrategy": 4, "./PriorityQueue/BinaryHeapStrategy": 5 }], 2: [function (t, e, i) {
      var r;e.exports = r = function () {
        function t(t) {
          var e;if (null == (null != t ? t.strategy : void 0)) throw "Must pass options.strategy, a strategy";if (null == (null != t ? t.comparator : void 0)) throw "Must pass options.comparator, a comparator";this.priv = new t.strategy(t), this.length = (null != t && null != (e = t.initialValues) ? e.length : void 0) || 0;
        }return t.prototype.queue = function (t) {
          this.length++, this.priv.queue(t);
        }, t.prototype.dequeue = function (t) {
          if (!this.length) throw "Empty queue";return this.length--, this.priv.dequeue();
        }, t.prototype.peek = function (t) {
          if (!this.length) throw "Empty queue";return this.priv.peek();
        }, t.prototype.clear = function () {
          return this.length = 0, this.priv.clear();
        }, t;
      }();
    }, {}], 3: [function (t, e, i) {
      var r, o;o = function (t, e, i) {
        var r, o, a;for (o = 0, r = t.length; r > o;) a = o + r >>> 1, i(t[a], e) >= 0 ? o = a + 1 : r = a;return o;
      }, e.exports = r = function () {
        function t(t) {
          var e;this.options = t, this.comparator = this.options.comparator, this.data = (null != (e = this.options.initialValues) ? e.slice(0) : void 0) || [], this.data.sort(this.comparator).reverse();
        }return t.prototype.queue = function (t) {
          var e;e = o(this.data, t, this.comparator), this.data.splice(e, 0, t);
        }, t.prototype.dequeue = function () {
          return this.data.pop();
        }, t.prototype.peek = function () {
          return this.data[this.data.length - 1];
        }, t.prototype.clear = function () {
          this.data.length = 0;
        }, t;
      }();
    }, {}], 4: [function (t, e, i) {
      var r;e.exports = r = function () {
        function t(t) {
          var e, i, r, o, a, n, s, h, u;for (this.comparator = (null != t ? t.comparator : void 0) || function (t, e) {
            return t - e;
          }, this.pageSize = (null != t ? t.pageSize : void 0) || 512, this.length = 0, h = 0; 1 << h < this.pageSize;) h += 1;if (1 << h !== this.pageSize) throw "pageSize must be a power of two";for (this._shift = h, this._emptyMemoryPageTemplate = e = [], i = r = 0, n = this.pageSize; n >= 0 ? n > r : r > n; i = n >= 0 ? ++r : --r) e.push(null);if (this._memory = [], this._mask = this.pageSize - 1, t.initialValues) for (s = t.initialValues, o = 0, a = s.length; a > o; o++) u = s[o], this.queue(u);
        }return t.prototype.queue = function (t) {
          this.length += 1, this._write(this.length, t), this._bubbleUp(this.length, t);
        }, t.prototype.dequeue = function () {
          var t, e;return t = this._read(1), e = this._read(this.length), this.length -= 1, this.length > 0 && (this._write(1, e), this._bubbleDown(1, e)), t;
        }, t.prototype.peek = function () {
          return this._read(1);
        }, t.prototype.clear = function () {
          this.length = 0, this._memory.length = 0;
        }, t.prototype._write = function (t, e) {
          var i;for (i = t >> this._shift; i >= this._memory.length;) this._memory.push(this._emptyMemoryPageTemplate.slice(0));return this._memory[i][t & this._mask] = e;
        }, t.prototype._read = function (t) {
          return this._memory[t >> this._shift][t & this._mask];
        }, t.prototype._bubbleUp = function (t, e) {
          var i, r, o, a;for (i = this.comparator; t > 1 && (r = t & this._mask, t < this.pageSize || r > 3 ? o = t & ~this._mask | r >> 1 : 2 > r ? (o = t - this.pageSize >> this._shift, o += o & ~(this._mask >> 1), o |= this.pageSize >> 1) : o = t - 2, a = this._read(o), !(i(a, e) < 0));) this._write(o, e), this._write(t, a), t = o;
        }, t.prototype._bubbleDown = function (t, e) {
          var i, r, o, a, n;for (n = this.comparator; t < this.length;) if (t > this._mask && !(t & this._mask - 1) ? i = r = t + 2 : t & this.pageSize >> 1 ? (i = (t & ~this._mask) >> 1, i |= t & this._mask >> 1, i = i + 1 << this._shift, r = i + 1) : (i = t + (t & this._mask), r = i + 1), i !== r && r <= this.length) {
            if (o = this._read(i), a = this._read(r), n(o, e) < 0 && n(o, a) <= 0) this._write(i, e), this._write(t, o), t = i;else {
              if (!(n(a, e) < 0)) break;this._write(r, e), this._write(t, a), t = r;
            }
          } else {
            if (!(i <= this.length)) break;if (o = this._read(i), !(n(o, e) < 0)) break;this._write(i, e), this._write(t, o), t = i;
          }
        }, t;
      }();
    }, {}], 5: [function (t, e, i) {
      var r;e.exports = r = function () {
        function t(t) {
          var e;this.comparator = (null != t ? t.comparator : void 0) || function (t, e) {
            return t - e;
          }, this.length = 0, this.data = (null != (e = t.initialValues) ? e.slice(0) : void 0) || [], this._heapify();
        }return t.prototype._heapify = function () {
          var t, e, i;if (this.data.length > 0) for (t = e = 1, i = this.data.length; i >= 1 ? i > e : e > i; t = i >= 1 ? ++e : --e) this._bubbleUp(t);
        }, t.prototype.queue = function (t) {
          this.data.push(t), this._bubbleUp(this.data.length - 1);
        }, t.prototype.dequeue = function () {
          var t, e;return e = this.data[0], t = this.data.pop(), this.data.length > 0 && (this.data[0] = t, this._bubbleDown(0)), e;
        }, t.prototype.peek = function () {
          return this.data[0];
        }, t.prototype.clear = function () {
          this.length = 0, this.data.length = 0;
        }, t.prototype._bubbleUp = function (t) {
          for (var e, i; t > 0 && (e = t - 1 >>> 1, this.comparator(this.data[t], this.data[e]) < 0);) i = this.data[e], this.data[e] = this.data[t], this.data[t] = i, t = e;
        }, t.prototype._bubbleDown = function (t) {
          var e, i, r, o, a;for (e = this.data.length - 1;;) {
            if (i = (t << 1) + 1, o = i + 1, r = t, e >= i && this.comparator(this.data[i], this.data[r]) < 0 && (r = i), e >= o && this.comparator(this.data[o], this.data[r]) < 0 && (r = o), r === t) break;a = this.data[r], this.data[r] = this.data[t], this.data[t] = a, t = r;
          }
        }, t;
      }();
    }, {}] }, {}, [1])(1);
});

/***/ }),

/***/ 1414:
/*!*********************************!*\
  !*** ./src/scenes/BootScene.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });

        this.levels = {
            title: { key: 'TitleScene', path: 'assets/levels/title_screen.json' },
            town: { key: 'WorldScene', path: 'assets/levels/town.json' },
            cave: { key: 'WorldScene', path: 'assets/levels/cave.json' },
            battle: { key: 'BattleScene', path: 'assets/levels/battle.json' }
        };
    }

    preload() {
        for (let level_name in this.levels) {
            let level = this.levels[level_name];
            this.load.json(level_name, level.path);
        }
    }

    create(data) {
        let scene = '';
        let extra_parameters = {};
        if (!data) {
            scene = 'title';
        } else {
            scene = data.scene;
            extra_parameters = data.extra_parameters;
        }
        let level_data = this.cache.json.get(scene);
        this.scene.start('LoadingScene', { level_data: level_data, scene: this.levels[scene].key, extra_parameters: extra_parameters });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BootScene);

/***/ }),

/***/ 1415:
/*!************************************!*\
  !*** ./src/scenes/LoadingScene.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadingScene'
        });
    }

    init(data) {
        this.level_data = data.level_data;

        let loading_message = this.add.text(320, 240, "Loading", { font: "48px Kells", fill: "#ffffff" });
    }

    preload() {
        let assets = this.level_data.assets;
        for (let asset_key in assets) {
            let asset = assets[asset_key];
            switch (asset.type) {
                case "image":
                    this.load.image(asset_key, asset.source);
                    break;
                case "spritesheet":
                    this.load.spritesheet(asset_key, asset.source, { frameWidth: asset.frame_width, frameHeight: asset.frame_height, frames: asset.frames, margin: asset.margin, spacing: asset.spacing });
                    break;
                case "tilemap":
                    this.load.tilemapTiledJSON(asset_key, asset.source);
                    break;
            }
        }

        for (let user_input_key in this.level_data.user_input) {
            let user_input_path = this.level_data.user_input[user_input_key];
            this.load.json(user_input_key, user_input_path);
        }
    }

    create(data) {
        this.scene.start(data.scene, { level_data: this.level_data, extra_parameters: data.extra_parameters });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (LoadingScene);

/***/ }),

/***/ 1416:
/*!**************************!*\
  !*** ./src/Inventory.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prefabs_battle_Item__ = __webpack_require__(/*! ./prefabs/battle/Item */ 556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prefabs_battle_Potion__ = __webpack_require__(/*! ./prefabs/battle/Potion */ 1417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prefabs_HUD_ItemMenuItem__ = __webpack_require__(/*! ./prefabs/HUD/ItemMenuItem */ 555);




class Inventory {
    constructor() {
        this.items = [];

        this.item_classes = {
            "potion": __WEBPACK_IMPORTED_MODULE_1__prefabs_battle_Potion__["a" /* default */].prototype.constructor
        };
    }

    collect_item(scene, item_object) {
        if (this.items[item_object.type]) {
            this.items[item_object.type].amount += 1;
        } else {
            let item = new this.item_classes[item_object.type](scene, item_object.type, { x: 0, y: 0 }, item_object.properties);
            this.items[item_object.type] = { prefab: item, amount: 1 };
        }
    }

    create_menu(scene, items_menu) {
        let item_position = { x: items_menu.x, y: items_menu.y };
        for (let item_type in this.items) {
            let item_prefab = this.items[item_type].prefab;
            let item_amount = this.items[item_type].amount;
            let menu_item = new __WEBPACK_IMPORTED_MODULE_2__prefabs_HUD_ItemMenuItem__["a" /* default */](scene, item_type + "_menu_item", { x: item_position.x, y: item_position.y }, { group: "hud", texture: item_prefab.item_texture, item_name: item_type, amount: item_amount });
            menu_item.setOrigin(0);
            items_menu.menu_items.push(menu_item);
        }

        items_menu.enable(false);
    }

    has_items() {
        for (let item_type in this.items) {
            if (this.items[item_type].amount > 0) {
                return true;
            }
        }
        return false;
    }

    has_item(item_type) {
        return this.items[item_type].amount > 0;
    }

    use_item(item_type, target) {
        this.items[item_type].prefab.use(target);
        this.items[item_type].amount -= 1;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Inventory);

/***/ }),

/***/ 1417:
/*!**************************************!*\
  !*** ./src/prefabs/battle/Potion.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__(/*! ./Item */ 556);


class Potion extends __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.health_power = properties.health_power;
    }

    use(target) {
        console.log("using potion");
        target.stats.health = Math.min(100, target.stats.health + this.health_power);
        console.log(target.name + " healed");
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Potion);

/***/ }),

/***/ 148:
/*!***********************************!*\
  !*** ./src/prefabs/TextPrefab.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Prefab extends Phaser.GameObjects.Text {
    constructor(scene, name, position, properties) {
        super(scene, position.x, position.y, properties.text, properties.style);

        this.scene = scene;
        this.name = name;
        this.scene.add.existing(this);
        this.scene.groups[properties.group].add(this);

        if (properties.scale) {
            this.setScale(properties.scale.x, properties.scale.y);
        }

        if (properties.anchor) {
            this.setOrigin(properties.anchor.x, properties.anchor.y);
        }

        this.scene.prefabs[name] = this;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Prefab);

/***/ }),

/***/ 191:
/*!**************************************!*\
  !*** ./src/scenes/JSONLevelScene.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plugins_UserInput__ = __webpack_require__(/*! ../plugins/UserInput */ 1393);


class JSONLevelScene extends Phaser.Scene {
    constructor(key) {
        super({
            key: key
        });
    }

    init(data) {
        this.level_data = data.level_data;
    }

    create() {
        this.groups = {};
        this.level_data.groups.forEach(function (group_name) {
            this.groups[group_name] = this.add.group();
        }, this);

        this.prefabs = {};
        for (var prefab_name in this.level_data.prefabs) {
            var prefab_data = this.level_data.prefabs[prefab_name];
            this.create_prefab(prefab_name, prefab_data);
        }

        if (this.level_data.user_input) {
            this.user_inputs = {};
            for (let user_input_key in this.level_data.user_input) {
                this.user_inputs[user_input_key] = this.cache.json.get(user_input_key);
            }

            this.user_input = new __WEBPACK_IMPORTED_MODULE_0__plugins_UserInput__["a" /* default */](this);
            this.user_input_data = this.cache.json.get(this.level_data.initial_user_input);
            this.user_input.set_input(this.user_input_data);
        }
    }

    create_prefab(prefab_name, prefab_data) {
        if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
            var prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
        }
        return prefab;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (JSONLevelScene);

/***/ }),

/***/ 295:
/*!************************************!*\
  !*** ./src/prefabs/battle/Unit.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class Unit extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        if (!this.scene.anims.anims.has(name + '_idle')) {
            this.scene.anims.create({
                key: name + '_idle',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: properties.animations.idle.frames }),
                frameRate: properties.animations.idle.fps,
                repeat: -1
            });
        }

        if (!this.scene.anims.anims.has(name + '_attack1')) {
            this.scene.anims.create({
                key: name + '_attack1',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: properties.animations.attack1.frames }),
                frameRate: properties.animations.idle.fps
            });
        }

        if (!this.scene.anims.anims.has(name + '_attack2')) {
            this.scene.anims.create({
                key: name + '_attack2',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: properties.animations.attack2.frames }),
                frameRate: properties.animations.idle.fps
            });
        }

        if (!this.scene.anims.anims.has(name + '_hit')) {
            this.scene.anims.create({
                key: name + '_hit',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: properties.animations.hit.frames }),
                frameRate: properties.animations.idle.fps
            });
        }

        this.on('animationcomplete', this.back_to_idle.bind(this));

        this.anims.play(name + '_idle');

        this.stats = properties.stats;
    }

    back_to_idle(animation) {
        this.anims.play(this.name + '_idle');
        if (animation.key == this.name + '_attack1' || animation.key == this.name + '_attack2') {
            this.scene.next_turn();
        }
    }

    receive_damage(damage) {
        let damage_text = this.scene.add.text(this.x, this.y - 50, "" + damage, { font: "bold 24px Kells", fill: "#FF0000" }, this.scene.groups.hud);
        this.timed_event = this.scene.time.addEvent({ delay: 1000, callback: damage_text.destroy, callbackScope: damage_text });

        this.stats.health -= damage;
        this.anims.play(this.name + "_hit");
        if (this.stats.health <= 0) {
            this.stats.health = 0;
            this.destroy();
        }
    }

    calculate_act_turn(current_turn) {
        this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Unit);

/***/ }),

/***/ 554:
/*!**********************************************!*\
  !*** ./src/prefabs/battle/PhysicalAttack.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class PhysicalAttack extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.owner = properties.owner;
    }

    hit(target) {
        let attack_multiplier = this.scene.rnd.realInRange(0.8, 1.2);
        let defense_multiplier = this.scene.rnd.realInRange(0.8, 1.2);

        let damage = Math.max(0, Math.round(attack_multiplier * this.owner.stats.attack - defense_multiplier * target.stats.defense));

        target.receive_damage(damage);

        this.owner.anims.play(this.owner.name + "_attack1");
    }

}

/* harmony default export */ __webpack_exports__["a"] = (PhysicalAttack);

/***/ }),

/***/ 555:
/*!*****************************************!*\
  !*** ./src/prefabs/HUD/ItemMenuItem.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuItem__ = __webpack_require__(/*! ./MenuItem */ 105);



class ItemMenuItem extends __WEBPACK_IMPORTED_MODULE_1__MenuItem__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.item_name = properties.item_name;
    }

    select() {
        if (this.scene.cache.game.inventory.has_item(this.item_name)) {
            this.scene.prefabs.items_menu.enable(false);

            this.scene.cache.game.inventory.use_item(this.item_name, this.scene.current_unit);

            if (!this.scene.cache.game.inventory.has_item(this.item_name)) {
                let scene = this.scene;
                this.destroy();
                scene.next_turn();
            } else {
                this.scene.next_turn();
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ItemMenuItem);

/***/ }),

/***/ 556:
/*!************************************!*\
  !*** ./src/prefabs/battle/Item.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Prefab__ = __webpack_require__(/*! ../Prefab */ 14);


class Item extends __WEBPACK_IMPORTED_MODULE_0__Prefab__["a" /* default */] {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.item_texture = properties.item_texture;
    }

    use() {
        console.log('using item');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Item);

/***/ }),

/***/ 557:
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */558);
module.exports = __webpack_require__(/*! C:\Users\Renan\Documents\zenva\phaser3_RPG_course\35-collecting_equipments\src\main.js */760);


/***/ }),

/***/ 558:
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Users\\Renan\\Documents\\zenva\\phaser3_RPG_course\\35-collecting_equipments\\node_modules\\babel-polyfill\\lib\\index.js'");

/***/ }),

/***/ 760:
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scenes_TitleScene__ = __webpack_require__(/*! ./scenes/TitleScene */ 1392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scenes_WorldScene__ = __webpack_require__(/*! ./scenes/WorldScene */ 1394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scenes_BattleScene__ = __webpack_require__(/*! ./scenes/BattleScene */ 1401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scenes_BootScene__ = __webpack_require__(/*! ./scenes/BootScene */ 1414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scenes_LoadingScene__ = __webpack_require__(/*! ./scenes/LoadingScene */ 1415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scenes_JSONLevelScene__ = __webpack_require__(/*! ./scenes/JSONLevelScene */ 191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Inventory__ = __webpack_require__(/*! ./Inventory */ 1416);









let bootScene = new __WEBPACK_IMPORTED_MODULE_4__scenes_BootScene__["a" /* default */]();
let loadingScene = new __WEBPACK_IMPORTED_MODULE_5__scenes_LoadingScene__["a" /* default */]();
let titleScene = new __WEBPACK_IMPORTED_MODULE_1__scenes_TitleScene__["a" /* default */]();
let worldScene = new __WEBPACK_IMPORTED_MODULE_2__scenes_WorldScene__["a" /* default */]();
let battleScene = new __WEBPACK_IMPORTED_MODULE_3__scenes_BattleScene__["a" /* default */]();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scaleMode: Phaser.ScaleModes.DEFAULT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

let game = new Phaser.Game(config);

game.inventory = new __WEBPACK_IMPORTED_MODULE_7__Inventory__["a" /* default */]();

game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.add('TitleScene', titleScene);
game.scene.add('WorldScene', worldScene);
game.scene.add('BattleScene', battleScene);
game.scene.start("BootScene");

/***/ })

},[557]);
//# sourceMappingURL=bundle.js.map