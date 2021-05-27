(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Phaser"));
	else if(typeof define === 'function' && define.amd)
		define("Game", ["Phaser"], factory);
	else if(typeof exports === 'object')
		exports["Game"] = factory(require("Phaser"));
	else
		root["Game"] = factory(root["Phaser"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3200/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** external "Phaser" ***!
  \*************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/*!************************************************!*\
  !*** ../node_modules/string-template/index.js ***!
  \************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

var nargs = /\{([0-9a-zA-Z]+)\}/g
var slice = Array.prototype.slice

module.exports = template

function template(string) {
    var args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}


/***/ }),
/* 2 */
/*!*******************************!*\
  !*** ./index.ts + 28 modules ***!
  \*******************************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/string-template/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "Phaser" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// NAMESPACE OBJECT: ./configs/objects/spells.ts
var spells_namespaceObject = {};
__webpack_require__.r(spells_namespaceObject);
__webpack_require__.d(spells_namespaceObject, "fireballSpell", function() { return fireballSpell; });
__webpack_require__.d(spells_namespaceObject, "hellfireSpell", function() { return hellfireSpell; });
__webpack_require__.d(spells_namespaceObject, "frostShardSpell", function() { return frostShardSpell; });
__webpack_require__.d(spells_namespaceObject, "teleportSpell", function() { return teleportSpell; });
__webpack_require__.d(spells_namespaceObject, "teleportGate", function() { return spells_teleportGate; });
__webpack_require__.d(spells_namespaceObject, "bullet", function() { return bullet; });
__webpack_require__.d(spells_namespaceObject, "hellfireTube", function() { return hellfireTube; });
__webpack_require__.d(spells_namespaceObject, "frostShard", function() { return spells_frostShard; });

// NAMESPACE OBJECT: ./configs/objects/logic.ts
var logic_namespaceObject = {};
__webpack_require__.r(logic_namespaceObject);
__webpack_require__.d(logic_namespaceObject, "monsterController", function() { return logic_monsterController; });

// NAMESPACE OBJECT: ./configs/objects/units.ts
var units_namespaceObject = {};
__webpack_require__.r(units_namespaceObject);
__webpack_require__.d(units_namespaceObject, "player", function() { return units_player; });
__webpack_require__.d(units_namespaceObject, "summonGate", function() { return units_summonGate; });
__webpack_require__.d(units_namespaceObject, "monster", function() { return monster; });
__webpack_require__.d(units_namespaceObject, "monsterBoomer", function() { return monsterBoomer; });
__webpack_require__.d(units_namespaceObject, "monsterBoss", function() { return monsterBoss; });
__webpack_require__.d(units_namespaceObject, "monsterBoss2", function() { return monsterBoss2; });
__webpack_require__.d(units_namespaceObject, "heart", function() { return heart; });
__webpack_require__.d(units_namespaceObject, "powerup", function() { return powerup; });

// NAMESPACE OBJECT: ./configs/objects/effects.ts
var effects_namespaceObject = {};
__webpack_require__.r(effects_namespaceObject);
__webpack_require__.d(effects_namespaceObject, "mbullet", function() { return mbullet; });
__webpack_require__.d(effects_namespaceObject, "mbullet2", function() { return mbullet2; });
__webpack_require__.d(effects_namespaceObject, "blood", function() { return effects_blood; });
__webpack_require__.d(effects_namespaceObject, "bloodSpray", function() { return bloodSpray; });
__webpack_require__.d(effects_namespaceObject, "explosion", function() { return explosion; });
__webpack_require__.d(effects_namespaceObject, "monsterExplosion", function() { return monsterExplosion; });
__webpack_require__.d(effects_namespaceObject, "fog", function() { return fog; });

// NAMESPACE OBJECT: ./configs/objects/terrain.ts
var terrain_namespaceObject = {};
__webpack_require__.r(terrain_namespaceObject);
__webpack_require__.d(terrain_namespaceObject, "tree1", function() { return tree1; });
__webpack_require__.d(terrain_namespaceObject, "tree2", function() { return tree2; });
__webpack_require__.d(terrain_namespaceObject, "stones", function() { return stones; });

// NAMESPACE OBJECT: ./configs/objects/ui.ts
var ui_namespaceObject = {};
__webpack_require__.r(ui_namespaceObject);
__webpack_require__.d(ui_namespaceObject, "cursor", function() { return cursor; });
__webpack_require__.d(ui_namespaceObject, "counter", function() { return counter; });
__webpack_require__.d(ui_namespaceObject, "leftOnWaveLabel", function() { return leftOnWaveLabel; });
__webpack_require__.d(ui_namespaceObject, "level", function() { return level; });
__webpack_require__.d(ui_namespaceObject, "timer", function() { return timer; });
__webpack_require__.d(ui_namespaceObject, "bestTime", function() { return bestTime; });
__webpack_require__.d(ui_namespaceObject, "bestScore", function() { return bestScore; });

// NAMESPACE OBJECT: ./configs/rules/spells.ts
var rules_spells_namespaceObject = {};
__webpack_require__.r(rules_spells_namespaceObject);
__webpack_require__.d(rules_spells_namespaceObject, "fireball", function() { return fireball; });
__webpack_require__.d(rules_spells_namespaceObject, "hellfire", function() { return hellfire; });
__webpack_require__.d(rules_spells_namespaceObject, "slowEnemies", function() { return slowEnemies; });
__webpack_require__.d(rules_spells_namespaceObject, "teleport", function() { return teleport; });
__webpack_require__.d(rules_spells_namespaceObject, "frostShard", function() { return rules_spells_frostShard; });
__webpack_require__.d(rules_spells_namespaceObject, "bulletMonsterCollision", function() { return bulletMonsterCollision; });
__webpack_require__.d(rules_spells_namespaceObject, "hellTubeMonsterCollision", function() { return hellTubeMonsterCollision; });

// NAMESPACE OBJECT: ./configs/rules/logic.ts
var rules_logic_namespaceObject = {};
__webpack_require__.r(rules_logic_namespaceObject);
__webpack_require__.d(rules_logic_namespaceObject, "monsterController", function() { return rules_logic_monsterController; });

// NAMESPACE OBJECT: ./configs/rules/units.ts
var rules_units_namespaceObject = {};
__webpack_require__.r(rules_units_namespaceObject);
__webpack_require__.d(rules_units_namespaceObject, "playerDeath", function() { return playerDeath; });
__webpack_require__.d(rules_units_namespaceObject, "damageOnPlayerCollision", function() { return damageOnPlayerCollision; });
__webpack_require__.d(rules_units_namespaceObject, "destroyOnPlayerCollision", function() { return destroyOnPlayerCollision; });
__webpack_require__.d(rules_units_namespaceObject, "triggerOnPlayerCollision", function() { return triggerOnPlayerCollision; });
__webpack_require__.d(rules_units_namespaceObject, "meleeAttack", function() { return meleeAttack; });
__webpack_require__.d(rules_units_namespaceObject, "monsterExplosion", function() { return units_monsterExplosion; });
__webpack_require__.d(rules_units_namespaceObject, "monsterExplosionCondition", function() { return monsterExplosionCondition; });
__webpack_require__.d(rules_units_namespaceObject, "stopOnCollisionWithPlayer", function() { return stopOnCollisionWithPlayer; });
__webpack_require__.d(rules_units_namespaceObject, "resetSpeed", function() { return resetSpeed; });
__webpack_require__.d(rules_units_namespaceObject, "resetEffects", function() { return resetEffects; });
__webpack_require__.d(rules_units_namespaceObject, "moveToDirection", function() { return moveToDirection; });
__webpack_require__.d(rules_units_namespaceObject, "playerLevelUp", function() { return playerLevelUp; });
__webpack_require__.d(rules_units_namespaceObject, "monsterHealthStatus", function() { return monsterHealthStatus; });
__webpack_require__.d(rules_units_namespaceObject, "resetRangeCooldown", function() { return resetRangeCooldown; });
__webpack_require__.d(rules_units_namespaceObject, "resetMeleeCooldown", function() { return resetMeleeCooldown; });
__webpack_require__.d(rules_units_namespaceObject, "monsterBossLogic", function() { return monsterBossLogic; });
__webpack_require__.d(rules_units_namespaceObject, "monsterBoss2Logic", function() { return monsterBoss2Logic; });
__webpack_require__.d(rules_units_namespaceObject, "monsterBoss2Bullet", function() { return monsterBoss2Bullet; });
__webpack_require__.d(rules_units_namespaceObject, "moveWithKeyboard", function() { return moveWithKeyboard; });
__webpack_require__.d(rules_units_namespaceObject, "selectSpellWithKeyboard", function() { return selectSpellWithKeyboard; });
__webpack_require__.d(rules_units_namespaceObject, "triggerOnPlayerCollisionPowerUp", function() { return triggerOnPlayerCollisionPowerUp; });
__webpack_require__.d(rules_units_namespaceObject, "summonOnCooldown", function() { return summonOnCooldown; });

// NAMESPACE OBJECT: ./configs/rules/layers.ts
var layers_namespaceObject = {};
__webpack_require__.r(layers_namespaceObject);
__webpack_require__.d(layers_namespaceObject, "randomTrees", function() { return randomTrees; });
__webpack_require__.d(layers_namespaceObject, "spawnHeart", function() { return spawnHeart; });
__webpack_require__.d(layers_namespaceObject, "spawnPowerup", function() { return spawnPowerup; });
__webpack_require__.d(layers_namespaceObject, "spawnTerrain", function() { return spawnTerrain; });
__webpack_require__.d(layers_namespaceObject, "goWithPlayer", function() { return goWithPlayer; });

// NAMESPACE OBJECT: ./configs/rules/ui.ts
var rules_ui_namespaceObject = {};
__webpack_require__.r(rules_ui_namespaceObject);
__webpack_require__.d(rules_ui_namespaceObject, "countMonsterKilled", function() { return countMonsterKilled; });
__webpack_require__.d(rules_ui_namespaceObject, "timer", function() { return ui_timer; });
__webpack_require__.d(rules_ui_namespaceObject, "health", function() { return health; });
__webpack_require__.d(rules_ui_namespaceObject, "level", function() { return ui_level; });
__webpack_require__.d(rules_ui_namespaceObject, "bestTime", function() { return ui_bestTime; });
__webpack_require__.d(rules_ui_namespaceObject, "bestScore", function() { return ui_bestScore; });

// NAMESPACE OBJECT: ./configs/rules/etc.ts
var etc_namespaceObject = {};
__webpack_require__.r(etc_namespaceObject);
__webpack_require__.d(etc_namespaceObject, "bindPositionToLayer", function() { return bindPositionToLayer; });
__webpack_require__.d(etc_namespaceObject, "destroyAfterLeavingLayer", function() { return destroyAfterLeavingLayer; });
__webpack_require__.d(etc_namespaceObject, "setDirectionToPlayer", function() { return setDirectionToPlayer; });
__webpack_require__.d(etc_namespaceObject, "setDirectionToPlayerAdvance", function() { return setDirectionToPlayerAdvance; });
__webpack_require__.d(etc_namespaceObject, "wandererAI", function() { return wandererAI; });
__webpack_require__.d(etc_namespaceObject, "dynamicZIndex", function() { return dynamicZIndex; });
__webpack_require__.d(etc_namespaceObject, "collisions", function() { return etc_collisions; });
__webpack_require__.d(etc_namespaceObject, "rotateToMouse", function() { return rotateToMouse; });
__webpack_require__.d(etc_namespaceObject, "bindPositionToMouse", function() { return bindPositionToMouse; });
__webpack_require__.d(etc_namespaceObject, "removeOnCooldown", function() { return removeOnCooldown; });
__webpack_require__.d(etc_namespaceObject, "explosionOnCooldown", function() { return explosionOnCooldown; });
__webpack_require__.d(etc_namespaceObject, "explosionAfterSpriteDone", function() { return explosionAfterSpriteDone; });
__webpack_require__.d(etc_namespaceObject, "destroyAfterSpriteDone", function() { return destroyAfterSpriteDone; });
__webpack_require__.d(etc_namespaceObject, "rotateByDirection", function() { return rotateByDirection; });
__webpack_require__.d(etc_namespaceObject, "rotateByPlayer", function() { return rotateByPlayer; });

// EXTERNAL MODULE: external "Phaser"
var external_Phaser_ = __webpack_require__(0);
var external_Phaser_default = /*#__PURE__*/__webpack_require__.n(external_Phaser_);

// CONCATENATED MODULE: ./states/preloading.ts

class preloading_PreLoading extends external_Phaser_default.a.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;
        this.game.load.image('loading', '../assets/img/loading.png');
    }
    create() {
        this.game.state.start('loading');
    }
}
/* harmony default export */ var preloading = (preloading_PreLoading);

// CONCATENATED MODULE: ./states/loading.ts

class loading_Loading extends external_Phaser_default.a.State {
    preload() {
        this.game.stage.backgroundColor = 0x0e0e0e;
        this.text = this.add.text(460, 250, 'LOADING', {
            fill: '#efefef',
        });
        this.game.load.setPreloadSprite(this.game.add.image(400, 300, 'loading'));
        this.game.load.spritesheet('button', '../assets/img/buttons.png', 293, 54);
        this.game.load.image('mainmenu', '../assets/img/mainmenu.jpeg');
        this.game.load.image('deathmenu', '../assets/img/deathbackground.jpg');
        this.game.load.image('bigMonsters', '../assets/img/bigMonsters.png');
        this.game.load.image('boss', '../assets/img/boss.png');
        this.game.load.image('bossSpell', '../assets/img/bossSpell.png');
        this.game.load.image('monsterBlood', '../assets/img/sblood.png');
        this.game.load.image('bloodEffect', '../assets/img/bloods.png');
        this.game.load.image('cursor', '../assets/img/cursor.png');
        this.game.load.image('darkblast', '../assets/img/darkblast.png');
        this.game.load.image('demons', '../assets/img/demons.png');
        this.game.load.image('effects', '../assets/img/effects.png');
        this.game.load.image('explosions', '../assets/img/explosions.png');
        this.game.load.image('fireball', '../assets/img/fireballsprite.png');
        this.game.load.image('hellfire', '../assets/img/hellfire.png');
        this.game.load.image('frostEffect', '../assets/img/frosteffect.png');
        this.game.load.image('pumpkin', '../assets/img/heart.png');
        this.game.load.image('hero', '../assets/img/mainhero.png');
        this.game.load.image('powerUp', '../assets/img/powerup2.png');
        this.game.load.image('arcaneGate', '../assets/img/spell.png');
        this.game.load.image('spellIcons', '../assets/img/spellicons.png');
        this.game.load.image('stone', '../assets/img/stones.png');
        this.game.load.image('terrain', '../assets/img/terrain.png');
        this.game.load.image('tree1', '../assets/img/tree1.png');
        this.game.load.image('tree2', '../assets/img/tree2.png');
        this.game.load.audio('menuTheme', '../assets/music/menu.mp3');
        this.game.load.audio('deathTheme', '../assets/music/death.mp3');
        this.game.load.audio('battleTheme', '../assets/music/battle.mp3');
    }
    create() {
        this.text.destroy();
        this.game.state.start('mainMenu');
    }
}
/* harmony default export */ var loading = (loading_Loading);

// CONCATENATED MODULE: ./states/mainMenu.ts
const INFO_TEXT = ' MOVING: WASD\n AIM: MOUSE\n CAST SPELL: MOUSE CLICK OR SPACE\n SELECT SPELL: 1, 2, 3.';

class mainMenu_MainMenu extends external_Phaser_default.a.State {
    init() {
        this.menuTheme = this.sound.add('menuTheme', 0.3, true);
        this.background = this.game.add.image(512, 768, 'mainmenu');
        this.background.anchor.set(0.5, 1);
        this.background.alpha = 0.8;
    }
    create() {
        this.generateControls();
        this.menuTheme.play();
    }
    generateControls() {
        const button = this.add.button(512, 384, 'button', this.startGame, this, 2, 0, 1, 2);
        const start = this.add.text(0, 3, 'START', {
            fill: '#efefef',
        });
        const info = this.add.text(-300, -300, INFO_TEXT, {
            fontSize: '20px',
            fill: '#efefef',
        });
        start.anchor.setTo(0.5, 0.5);
        info.anchor.setTo(0.5, 0.5);
        button.anchor.setTo(0.5, 0.5);
        button.addChild(start);
        button.addChild(info);
    }
    startGame() {
        this.game.state.start('battle');
    }
    shutdown() {
        this.menuTheme.stop();
    }
}
/* harmony default export */ var mainMenu = (mainMenu_MainMenu);

// CONCATENATED MODULE: ./engine/collisions.ts
function generate(config) {
    const n = config.n || 6;
    const width = config.width || 800;
    const height = config.height || 600;
    const sizeX = width >> n;
    const sizeY = height >> n;
    const cellGrid = new Array(sizeX * sizeY);
    generateMap();
    function generateMap() {
        for (let i = 0; i < cellGrid.length; i++) {
            cellGrid[i] = [];
        }
    }
    function getCell(point) {
        return point[0] + point[1] * sizeY;
    }
    function removeObject(object) {
        const oldCells = object.parameters.collisions.cells;
        for (let i = 0; i < oldCells.length; i++) {
            cellGrid[oldCells[i]] &&
                cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
        }
    }
    function getPointsOfObject(object) {
        const pos = object.pos;
        const size = object.size;
        const cells = [];
        const xIndex = size[0] >> n;
        const yIndex = size[1] >> n;
        for (let i = 0; i < 2 + xIndex; i++) {
            for (let j = 0; j < 2 + yIndex; j++) {
                cells.push(getCell([
                    (pos.x - size[0] / 2 + i * (size[0] / (1 + xIndex))) >> n,
                    (pos.y - size[1] / 2 + j * (size[1] / (1 + yIndex))) >> n,
                ]));
            }
        }
        return cells;
    }
    function updateObject(object) {
        const cells = getPointsOfObject(object);
        const oldCells = object.parameters.collisions.cells;
        for (let i = 0; i < cells.length; i++) {
            if (oldCells[i] !== cells[i]) {
                cellGrid[oldCells[i]] &&
                    cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
                cellGrid[cells[i]] &&
                    cellGrid[cells[i]].indexOf(object) === -1 &&
                    cellGrid[cells[i]].push(object);
                oldCells[i] = cells[i];
            }
            else {
                cellGrid[cells[i]] &&
                    cellGrid[cells[i]].indexOf(object) === -1 &&
                    cellGrid[cells[i]].push(object);
            }
        }
    }
    function checkCollisions() {
        for (let i = 0; i <= sizeX; i++) {
            for (let j = 0; j <= sizeY; j++) {
                if (cellGrid[getCell([i, j])]) {
                    const objects = cellGrid[getCell([i, j])];
                    const length = objects.length;
                    for (let k = 0; k < length; k++) {
                        for (let l = k + 1; l < length; l++) {
                            if (boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
                                objects[k].parameters.collisions.indexOf(objects[l]) === -1 &&
                                    objects[k].parameters.collisions.push(objects[l]);
                                objects[l].parameters.collisions.indexOf(objects[k]) === -1 &&
                                    objects[l].parameters.collisions.push(objects[k]);
                            }
                        }
                    }
                }
            }
        }
    }
    function boxCollides(pos, size, pos2, size2) {
        function collides(x, y, r, b, x2, y2, r2, b2) {
            return !(r >= x2 || x < r2 || b >= y2 || y < b2);
        }
        return collides(pos.x + size[0] / 2, pos.y + size[1] / 2, pos.x - size[0] / 2, pos.y - size[1] / 2, pos2.x + size2[0] / 2, pos2.y + size2[1] / 2, pos2.x - size2[0] / 2, pos2.y - size2[1] / 2);
    }
    return {
        cellGrid: cellGrid,
        updateObject: updateObject,
        removeObject: removeObject,
        check: checkCollisions,
        clear: generateMap,
    };
}
/* harmony default export */ var collisions = (generate);

// CONCATENATED MODULE: ./engine/utils.ts
const clone = (obj) => Object.assign({}, obj);

// CONCATENATED MODULE: ./configs/objects/spells.ts
const fireballSpell = {
    zIndex: 5000,
    sprite: ['spellIcons', [0, 0], [32, 32]],
    pos: [449, 748],
    size: [32, 32],
    render: 'spell',
    parameters: {
        bulletsFired: 0,
        cooldown: 20,
    },
    type: 'spell',
    rules: ['fireball'],
};
const hellfireSpell = {
    zIndex: 5000,
    sprite: ['spellIcons', [96, 0], [32, 32]],
    pos: [491, 748],
    size: [32, 32],
    render: 'spell',
    parameters: {
        bulletsFired: 0,
        cooldown: 800,
    },
    type: 'spell',
    rules: ['hellfire'],
};
const frostShardSpell = {
    zIndex: 5000,
    sprite: ['spellIcons', [224, 96], [32, 32]],
    pos: [533, 748],
    size: [32, 32],
    render: 'spell',
    parameters: {
        shardsFired: 0,
        cooldown: 500,
    },
    type: 'spell',
    rules: ['frostShard'],
};
const teleportSpell = {
    zIndex: 5000,
    sprite: ['spellIcons', [64, 32], [32, 32]],
    pos: [575, 748],
    size: [32, 32],
    render: 'spell',
    parameters: {
        power: 200,
        teleportGates: 0,
        cooldown: 200,
    },
    type: 'spell',
    rules: ['teleport'],
};
const spells_teleportGate = {
    zIndex: 0,
    render: 'object',
    sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
    pos: [466, 580],
    size: [32, 32],
    parameters: {
        cooldown: 200,
    },
    type: 'spellElement',
    rules: ['removeOnCooldown', 'dynamicZIndex'],
};
const bullet = {
    zIndex: 3,
    collisions: true,
    render: 'object',
    sprite: ['fireball', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
    size: [25, 25],
    type: 'spellElement',
    parameters: {
        power: 10,
        cooldown: 100,
        speed: 300,
    },
    conditions: ['bulletMonsterCollision'],
    rules: [
        'destroyAfterLeavingLayer',
        'moveToDirection',
        'dynamicZIndex',
        'explosionOnCooldown',
    ],
};
const hellfireTube = {
    zIndex: 3,
    collisions: true,
    render: 'object',
    sprite: [
        'hellfire',
        [0, 0],
        [21, 58],
        14,
        [2, 3, 4, 4, 3, 2, 2, 3, 4, 4, 3, 2, 2, 3, 4, 4, 3, 2],
        null,
        false,
    ],
    size: [50, 50],
    type: 'spellElement',
    parameters: {
        power: 10,
        cooldown: 150,
        speed: 300,
    },
    conditions: ['hellTubeMonsterCollision'],
    rules: ['dynamicZIndex', 'explosionOnCooldown'],
};
const spells_frostShard = {
    zIndex: 3,
    render: 'object',
    collisions: true,
    sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
    type: 'spellElement',
    size: [500, 500],
    parameters: {
        power: 60,
        cooldown: 200,
    },
    conditions: ['slowEnemies'],
    rules: ['removeOnCooldown', 'dynamicZIndex'],
};

// CONCATENATED MODULE: ./configs/objects/logic.ts
const logic_monsterController = {
    render: false,
    collisions: false,
    type: 'monsterController',
    rules: ['monsterController'],
    parameters: {
        monsterCount: [10, 25, 50, 75, 100, 150, 200, 500, 1000, 2500, 5000, 10000],
        monsterCooldown: 7,
    },
};

// CONCATENATED MODULE: ./configs/objects/units.ts
const units_player = {
    zIndex: 20,
    sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
    pos: [662, 534],
    size: [25, 32],
    render: 'unit',
    collisions: true,
    parameters: {
        speed: 150,
        health: 50,
        spellPower: 1,
        level: 1,
        exp: 0,
        effects: [],
        currentSpell: 'fireball',
        direction: {},
        levelTable: {
            1: 600,
            2: 1200,
            3: 2000,
            4: 3000,
            5: 4500,
            6: 6500,
            7: 9000,
            8: 13000,
            9: 20000,
        },
    },
    type: 'player',
    conditions: ['selectSpellWithKeyboard'],
    rules: [
        'moveWithKeyboard',
        'rotateToMouse',
        'bindPositionToLayer',
        'playerDeath',
        'moveToDirection',
        'dynamicZIndex',
        'resetSpeed',
        'resetEffects',
        'playerLevelUp',
    ],
};
const units_summonGate = {
    zIndex: 0,
    render: 'object',
    sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
    pos: [466, 580],
    size: [25, 30],
    collisions: true,
    parameters: {
        cooldown: 80,
        exp: 3,
        chanceOfBoss: 5,
        chanceOfBoss2: 8,
        chanceOfBoomer: 20,
        health: 10,
    },
    conditions: ['monsterHealthStatus'],
    type: 'monster',
    rules: ['summonOnCooldown', 'dynamicZIndex'],
};
const monster = {
    zIndex: 1,
    sprite: ['demons', [0, 128], [32, 32], 6, [0, 1, 2]],
    size: [20, 28],
    collisions: true,
    render: 'unit',
    parameters: {
        speed: 25,
        cooldown: 70,
        scentSpeed: 120,
        scentRange: 600,
        exp: 15,
        wanderCooldown: 500,
        effects: [],
        health: 20,
        power: 5,
    },
    conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
    type: 'monster',
    rules: [
        'moveToDirection',
        'wandererAI',
        'rotateByDirection',
        'meleeAttack',
        'dynamicZIndex',
        'resetEffects',
        'resetMeleeCooldown',
    ],
};
const monsterBoomer = {
    zIndex: 1,
    sprite: ['demons', [96, 128], [32, 32], 6, [0, 1, 2]],
    size: [20, 28],
    collisions: true,
    render: 'unit',
    parameters: {
        speed: 100,
        exp: 30,
        effects: [],
        health: 10,
        power: 10,
    },
    conditions: ['monsterHealthStatus', 'monsterExplosionCondition'],
    type: 'monster',
    rules: [
        'moveToDirection',
        'rotateByPlayer',
        'setDirectionToPlayerAdvance',
        'dynamicZIndex',
        'resetSpeed',
        'resetEffects',
    ],
};
const monsterBoss = {
    zIndex: 1,
    collisions: true,
    sprite: ['bigMonsters', [0, 0], [32, 50], 6, [0, 1, 2]],
    size: [25, 40],
    render: 'unit',
    parameters: {
        speed: 50,
        exp: 60,
        cooldown: 75,
        power: 10,
        health: 50,
        effects: [],
    },
    conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
    type: 'monster',
    rules: [
        'setDirectionToPlayer',
        'monsterBossLogic',
        'moveToDirection',
        'rotateByDirection',
        'dynamicZIndex',
        'resetSpeed',
        'resetEffects',
        'resetRangeCooldown',
    ],
};
const monsterBoss2 = {
    zIndex: 1,
    collisions: true,
    sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
    size: [40, 45],
    render: 'unit',
    parameters: {
        speed: 15,
        cooldown: 200,
        exp: 120,
        fireRange: 300,
        power: 10,
        health: 30,
        effects: [],
    },
    conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
    type: 'monster',
    rules: [
        'setDirectionToPlayer',
        'monsterBoss2Logic',
        'rotateByDirection',
        'dynamicZIndex',
        'resetSpeed',
        'resetEffects',
        'resetRangeCooldown',
    ],
};
const heart = {
    zIndex: 3,
    render: 'object',
    collisions: true,
    size: [25, 25],
    sprite: ['pumpkin', [0, 0], [32, 32], 5, [0, 1]],
    conditions: ['triggerOnPlayerCollision'],
    rules: ['dynamicZIndex'],
    parameters: {
        power: 10,
    },
};
const powerup = {
    zIndex: 2,
    size: [25, 25],
    collisions: true,
    sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
    conditions: ['triggerOnPlayerCollisionPowerUp'],
    parameters: {
        exp: 250,
    },
};

// CONCATENATED MODULE: ./configs/objects/effects.ts
const mbullet = {
    zIndex: 3,
    collisions: true,
    sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
    type: 'monsterSpellElement',
    render: 'object',
    size: [32, 32],
    conditions: ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
    parameters: {
        power: 8,
        speed: 100,
    },
    rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex'],
};
const mbullet2 = {
    zIndex: 3,
    collisions: true,
    sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
    type: 'monsterSpellElement',
    render: 'object',
    size: [28, 24],
    conditions: ['monsterBoss2Bullet'],
    parameters: {
        power: 15,
        cooldown: 100,
        speed: 200,
    },
    rules: [
        'destroyAfterLeavingLayer',
        'setDirectionToPlayer',
        'rotateByDirection',
        'moveToDirection',
        'dynamicZIndex',
    ],
};
const effects_blood = {
    zIndex: 2,
    sprite: ['monsterBlood', [0, 0], [32, 13]],
    parameters: {
        cooldown: 500,
    },
    rules: ['removeOnCooldown'],
};
const bloodSpray = {
    zIndex: 2,
    sprite: [
        'bloodEffect',
        [0, 0],
        [64, 64],
        15,
        [0, 1, 2, 3, 4],
        null,
        true,
        0.785,
    ],
    rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};
const explosion = {
    render: 'object',
    size: [39, 39],
    sprite: [
        'explosions',
        [0, 0],
        [39, 39],
        16,
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        null,
        true,
    ],
    rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};
const monsterExplosion = {
    render: 'object',
    collisions: true,
    type: 'spellEffect',
    conditions: ['monsterExplosion'],
    size: [39, 39],
    sprite: [
        'explosions',
        [0, 0],
        [39, 39],
        16,
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        null,
        true,
    ],
    rules: ['destroyAfterSpriteDone', 'dynamicZIndex'],
};
const fog = {
    render: 'fog',
    zIndex: 2500,
    type: 'effect',
};

// CONCATENATED MODULE: ./configs/objects/terrain.ts
const tree1 = {
    sprite: ['tree1', [0, 0], [62, 87]],
    size: [62, 88],
    rules: ['dynamicZIndex'],
};
const tree2 = {
    sprite: ['tree2', [0, 0], [59, 87]],
    size: [60, 88],
    rules: ['dynamicZIndex'],
};
const stones = {
    render: 'object',
    sprite: ['stone', [0, 0], [25, 22]],
    size: [15, 22],
    rules: ['dynamicZIndex'],
};

// CONCATENATED MODULE: ./configs/objects/ui.ts
const cursor = {
    zIndex: 3000,
    render: 'ui',
    pos: [400, 350],
    sprite: ['cursor', [0, 0], [30, 30]],
    rules: ['bindPositionToMouse'],
};
const counter = {
    zIndex: 3000,
    pos: [5, 13],
    render: 'text',
    parameters: {
        weight: 'bold',
        color: '#DAA520',
        template: 'SCORE: {kills}',
        size: 14,
    },
    rules: ['countMonsterKilled'],
};
const leftOnWaveLabel = {
    zIndex: 3000,
    pos: [5, 100],
    render: 'text',
    parameters: {
        weight: 'bold',
        color: '#DAA520',
        template: 'LEFT ON THIS WAVE: {count}',
        size: 14,
    },
};
const level = {
    zIndex: 3000,
    pos: [35, 45],
    render: 'expBar',
    parameters: {
        weight: 'bold',
        color: '#EFEFEF',
        template: 'LEVEL: {level}',
        size: 14,
    },
    rules: ['level'],
};
const timer = {
    zIndex: 3000,
    pos: [5, 23],
    render: 'text',
    parameters: {
        weight: 'bold',
        color: '#DAA520',
        template: 'TIMER: {time}',
        size: 14,
    },
    rules: ['timer'],
};
const bestTime = {
    pos: [5, 370],
    zIndex: 3000,
    render: 'text',
    parameters: {
        weight: 'bold',
        color: '#DAA520',
        size: 14,
        template: 'BEST TIME: {time}',
    },
    rules: ['bestTime'],
};
const bestScore = {
    pos: [5, 380],
    zIndex: 3000,
    render: 'text',
    parameters: {
        weight: 'bold',
        color: '#DAA520',
        size: 14,
        template: 'BEST SCORE: {score}',
    },
    rules: ['bestScore'],
};

// CONCATENATED MODULE: ./configs/objects/index.ts






const objects_objects = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, logic_namespaceObject), spells_namespaceObject), units_namespaceObject), effects_namespaceObject), ui_namespaceObject), terrain_namespaceObject);
/* harmony default export */ var configs_objects = (objects_objects);

// CONCATENATED MODULE: ./configs/rules/utils.ts

function moveWithSpeed(point, destination, speed) {
    if (!point || !destination) {
        return null;
    }
    const _destination = destination
        .clone()
        .normalize()
        .multiply(speed, speed);
    return external_Phaser_default.a.Point.add(point, _destination);
}

// CONCATENATED MODULE: ./configs/rules/spells.ts



const fireball = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        const fireCooldown = obj.parameters.fireCooldown;
        const spellPower = player.parameters.spellPower;
        function createBullet(direction, destination) {
            const bulletConfig = configs.getConfig('bullet');
            bulletConfig.pos = player.pos.clone();
            const bull = obj.layer.addObject(bulletConfig);
            bull.parameters.direction = direction;
            bull.parameters.power = bull.parameters.power + 5 * (spellPower - 1);
            bull.sprite.setDegree(player.pos.angle(destination));
        }
        if (player.parameters.currentSpell == 'fireball') {
            if (obj.layer.game.input.mousePointer.isDown ||
                obj.layer.game.input.keyboard.isDown(32)) {
                if (!fireCooldown) {
                    const destination = new external_Phaser_default.a.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                    let startDegree = 10 * (spellPower - 1);
                    destination.x -= obj.layer.translate.x;
                    destination.y -= obj.layer.translate.y;
                    for (let i = 0; i < spellPower; i++) {
                        let movedPoint = destination
                            .clone()
                            .rotate(player.pos.x, player.pos.y, startDegree, true);
                        createBullet(external_Phaser_default.a.Point.subtract(movedPoint, player.pos), movedPoint.clone());
                        startDegree -= 20;
                    }
                    obj.parameters.cooldown = obj.defaultParameters.cooldown;
                    obj.parameters.fireCooldown = obj.parameters.cooldown;
                }
            }
        }
        fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
};
const hellfire = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        const fireCooldown = obj.parameters.fireCooldown;
        function createTube(pos) {
            const spellPower = player.parameters.spellPower;
            const tubeConfig = configs.getConfig('hellfireTube');
            tubeConfig.pos = pos;
            const tube = obj.layer.addObject(tubeConfig);
            tube.parameters.power = tube.parameters.power + 5 * (spellPower - 1);
        }
        if (player.parameters.currentSpell == 'hellfire') {
            if (obj.layer.game.input.mousePointer.isDown ||
                obj.layer.game.input.keyboard.isDown(32)) {
                if (!fireCooldown) {
                    const destination = new external_Phaser_default.a.Point(0, 1), point1 = moveWithSpeed(player.pos, destination, 100);
                    for (let i = -10; i < 10; i++) {
                        let movedPoint = point1
                            .clone()
                            .rotate(player.pos.x, player.pos.y, 18 * i, true);
                        createTube(movedPoint);
                    }
                    obj.parameters.cooldown = obj.defaultParameters.cooldown;
                    obj.parameters.fireCooldown = obj.parameters.cooldown;
                }
            }
        }
        fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
};
const slowEnemies = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == 'monster') {
                const speed = objects[i].parameters.speed;
                const power = obj.parameters.power;
                const effects = objects[i].parameters.effects || [];
                if (speed < power) {
                    objects[i].parameters.speed = 0;
                }
                else {
                    objects[i].parameters.speed = speed - power;
                }
                if (effects.indexOf('frozen') == -1) {
                    effects.push('frozen');
                }
            }
        }
    },
};
const teleport = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        const fireCooldown = obj.parameters.fireCooldown;
        if (player.parameters.currentSpell == 'teleport') {
            if (obj.layer.game.input.mousePointer.isDown ||
                obj.layer.game.input.keyboard.isDown(32)) {
                if (!fireCooldown) {
                    const mouse = new external_Phaser_default.a.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                    mouse.x -= obj.layer.translate.x;
                    mouse.y -= obj.layer.translate.y;
                    const direction = external_Phaser_default.a.Point.subtract(mouse, player.pos);
                    const spellPower = player.parameters.spellPower;
                    const destination = moveWithSpeed(player.pos, direction, obj.parameters.power);
                    const cooldown = obj.defaultParameters.cooldown - 30 * (spellPower - 1);
                    let teleportGate;
                    teleportGate = configs.getConfig('teleportGate');
                    teleportGate.pos = player.pos.clone();
                    obj.layer.addObject(teleportGate);
                    teleportGate = configs.getConfig('teleportGate');
                    teleportGate.pos = destination.clone();
                    obj.layer.addObject(teleportGate);
                    player.setPosition(destination);
                    obj.parameters.cooldown = cooldown > 50 ? cooldown : 50;
                    obj.parameters.fireCooldown = obj.parameters.cooldown;
                }
            }
        }
        fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
};
const rules_spells_frostShard = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        const fireCooldown = obj.parameters.fireCooldown;
        if (player.parameters.currentSpell == 'frostShard') {
            if (obj.layer.game.input.mousePointer.isDown ||
                obj.layer.game.input.keyboard.isDown(32)) {
                if (!fireCooldown) {
                    const frostShard = configs.getConfig('frostShard');
                    const mousePosition = new external_Phaser_default.a.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                    const spellPower = player.parameters.spellPower;
                    const destination = mousePosition.clone();
                    destination.x -= obj.layer.translate.x;
                    destination.y -= obj.layer.translate.y;
                    frostShard.pos = destination.clone();
                    let spellPowerBoost = 0;
                    for (let i = 1; i < spellPower; i++) {
                        spellPowerBoost += 50;
                    }
                    const fs = obj.layer.addObject(frostShard);
                    fs.parameters.cooldown = fs.parameters.cooldown + spellPowerBoost;
                    obj.parameters.fireCooldown = obj.parameters.cooldown;
                }
            }
        }
        fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
};
const bulletMonsterCollision = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0, l = objects.length; i < l; i++) {
            if (objects[i].type == 'monster') {
                objects[i].parameters.health =
                    objects[i].parameters.health - obj.parameters.power;
                const blood = configs.getConfig('bloodSpray');
                blood.pos = objects[i].pos.clone();
                blood.pos.x += 2;
                blood.pos.y += -10;
                obj.layer.addObject(blood);
                obj.layer.removeObjectOnNextTick(obj.id);
                break;
            }
        }
    },
};
const hellTubeMonsterCollision = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0, l = objects.length; i < l; i++) {
            if (objects[i].type == 'monster') {
                objects[i].parameters.health =
                    objects[i].parameters.health - obj.parameters.power;
                const blood = configs.getConfig('bloodSpray');
                blood.pos = objects[i].pos.clone();
                blood.pos.x += 2;
                blood.pos.y += -10;
                obj.layer.addObject(blood);
                break;
            }
        }
    },
};

// EXTERNAL MODULE: ../node_modules/string-template/index.js
var string_template = __webpack_require__(1);
var string_template_default = /*#__PURE__*/__webpack_require__.n(string_template);

// CONCATENATED MODULE: ./configs/rules/logic.ts



const monsterCount = [
    10,
    25,
    50,
    75,
    100,
    150,
    200,
    500,
    1000,
    2500,
    5000,
    10000,
];
const monsterCooldown = 10;
const rules_logic_monsterController = {
    init: function (obj) {
        obj.parameters.currentWave = 1;
        obj.parameters.monsterOnWave = monsterCount[obj.parameters.currentWave - 1];
        obj.parameters.monsterKilled = 0;
        obj.parameters.monsterSpawned = 0;
        this.leftOnWave = obj.layer.addObject(configs.getConfig('leftOnWaveLabel'));
    },
    update: function (obj) {
        function createSpawn() {
            const rect = new external_Phaser_default.a.Rectangle(100 - obj.layer.translate.x, 100 - obj.layer.translate.y, 800 - obj.layer.translate.x, 550 - obj.layer.translate.y);
            const summonGate = configs.getConfig('summonGate');
            summonGate.pos = new external_Phaser_default.a.Point(rect.randomX, rect.randomY);
            summonGate.pos.x = Math.min(1100, Math.max(50, summonGate.pos.x));
            summonGate.pos.y = Math.min(900, Math.max(50, summonGate.pos.y));
            obj.layer.addObject(summonGate);
        }
        if (obj.parameters.monsterSpawned < obj.parameters.monsterOnWave) {
            if (!obj.parameters.currentMonsterCooldown) {
                createSpawn();
                obj.parameters.monsterSpawned = obj.parameters.monsterSpawned + 1;
                obj.parameters.currentMonsterCooldown = monsterCooldown;
            }
            else {
                obj.parameters.currentMonsterCooldown &&
                    obj.parameters.currentMonsterCooldown--;
            }
        }
        if (!obj.layer.getObjectsByType('monster').length &&
            obj.parameters.monsterKilled < obj.parameters.monsterSpawned) {
            obj.parameters.monserSpawned = obj.parameters.monsterKilled;
        }
        else {
            if (obj.parameters.monsterKilled >= obj.parameters.monsterOnWave) {
                obj.parameters.currentWave = obj.parameters.currentWave + 1;
                obj.parameters.monsterSpawned = 0;
                obj.parameters.monsterOnWave =
                    monsterCount[obj.parameters.currentWave - 1];
                obj.parameters.monsterKilled = 0;
            }
        }
        this.leftOnWave.parameters.text = string_template_default()(this.leftOnWave.parameters.template, {
            count: obj.parameters.monsterKilled + '/' + obj.parameters.monsterOnWave,
        });
    },
};

// CONCATENATED MODULE: ./configs/rules/units.ts



const playerDeath = {
    update: function (obj) {
        if (obj.parameters.health <= 0) {
            obj.layer.state.stopBattle();
        }
    },
};
const damageOnPlayerCollision = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == 'player') {
                objects[i].parameters.health =
                    objects[i].parameters.health - obj.parameters.power;
                break;
            }
        }
    },
};
const destroyOnPlayerCollision = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == 'player') {
                const explosionConfig = configs.getConfig('explosion');
                explosionConfig.pos = obj.pos.clone();
                obj.layer.addObject(explosionConfig);
                obj.layer.removeObjectOnNextTick(obj.id);
                break;
            }
        }
    },
};
const triggerOnPlayerCollision = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == 'player') {
                if (objects[i].parameters.health < objects[i].defaultParameters.health) {
                    if (objects[i].parameters.health + obj.parameters.power <=
                        objects[i].defaultParameters.health) {
                        objects[i].parameters.health =
                            objects[i].parameters.health + obj.parameters.power;
                    }
                    else {
                        objects[i].parameters.health = objects[i].defaultParameters.health;
                    }
                }
                obj.layer.removeObjectOnNextTick(obj.id);
                break;
            }
        }
    },
};
const meleeAttack = {
    update: function (obj) {
        if (!obj.parameters.meleeCooldown) {
            const objects = obj.parameters.collisions;
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    objects[i].parameters.health =
                        objects[i].parameters.health - obj.parameters.power;
                    const blood = configs.getConfig('bloodSpray');
                    blood.pos = objects[i].pos.clone();
                    blood.pos.x += 2;
                    blood.pos.y += -10;
                    obj.layer.addObject(blood);
                    obj.parameters.meleeCooldown = obj.parameters.cooldown;
                    break;
                }
            }
        }
    },
};
const units_monsterExplosion = {
    update: function (obj) {
        if (!obj.parameters.exploded) {
            const objects = obj.parameters.collisions;
            for (let i = 0, l = objects.length; i < l; i++) {
                if (objects[i].parameters.health) {
                    objects[i].parameters.health =
                        objects[i].parameters.health - obj.parameters.power;
                    break;
                }
            }
            obj.parameters.exploded = true;
        }
    },
};
const monsterExplosionCondition = {
    update: function (obj) {
        function generateExplosions() {
            const pos = obj.pos.clone();
            let explosionConfig;
            const power = obj.parameters.power;
            let expl;
            obj.layer.removeObjectOnNextTick(obj.id);
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x - obj.size[0], pos.y - obj.size[1]);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x + obj.size[0], pos.y - obj.size[1]);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x - obj.size[0], pos.y + obj.size[1]);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x + obj.size[0], pos.y + obj.size[1]);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x - (3 / 2) * obj.size[0], pos.y);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x + (3 / 2) * obj.size[0], pos.y);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
        }
        if (obj.parameters.health <= 0) {
            generateExplosions();
        }
        else {
            const objects = obj.parameters.collisions;
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].type == 'player') {
                    generateExplosions();
                    break;
                }
            }
        }
    },
};
const stopOnCollisionWithPlayer = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0, l = objects.length; i < l; i++) {
            if (objects[i].type == 'player') {
                obj.parameters.speed = 0;
                break;
            }
        }
    },
};
const resetSpeed = {
    update: function (obj) {
        obj.parameters.speed = obj.defaultParameters.speed;
    },
};
const resetEffects = {
    update: function (obj) {
        obj.parameters.effects.splice(0);
    },
};
const moveToDirection = {
    update: function (obj, dt) {
        const direction = obj.parameters.direction;
        if (direction) {
            obj.setPosition(moveWithSpeed(obj.pos, direction, obj.parameters.speed * dt));
        }
    },
};
const playerLevelUp = {
    update: function (obj) {
        const levelExp = obj.parameters.levelTable[obj.parameters.level];
        if (obj.parameters.levelTable[obj.parameters.level]) {
            if (obj.parameters.exp > obj.parameters.levelTable[obj.parameters.level]) {
                obj.parameters.exp = obj.parameters.exp - levelExp;
                obj.parameters.level = obj.parameters.level + 1;
                obj.parameters.spellPower = obj.parameters.spellPower + 1;
            }
        }
        else {
            obj.parameters.level = 'MAX';
        }
    },
};
const monsterHealthStatus = {
    update: function (obj) {
        if (obj.parameters.health <= 0) {
            obj.layer.removeObjectOnNextTick(obj.id);
            const explosionConfig = configs.getConfig('explosion');
            explosionConfig.pos = obj.pos.clone();
            obj.layer.addObject(explosionConfig);
            const blood = configs.getConfig('blood');
            blood.pos = obj.pos.clone();
            obj.layer.addObject(blood);
            if (!obj.layer.state.parameters.monstersKilled) {
                obj.layer.state.parameters.monstersKilled = 0;
            }
            const monsterController = obj.layer.getObjectsByType('monsterController')[0];
            monsterController.parameters.monsterKilled =
                monsterController.parameters.monsterKilled + 1;
            obj.layer.state.parameters.monstersKilled++;
            const player = obj.layer.getObjectsByType('player')[0];
            player.parameters.exp = player.parameters.exp + obj.parameters.exp;
        }
    },
};
const resetRangeCooldown = {
    update: function (obj) {
        const fireCooldown = obj.parameters.fireCooldown;
        fireCooldown && (obj.parameters.fireCooldown = fireCooldown - 1);
    },
};
const resetMeleeCooldown = {
    update: function (obj) {
        const meleeCooldown = obj.parameters.meleeCooldown;
        meleeCooldown && (obj.parameters.meleeCooldown = meleeCooldown - 1);
    },
};
const monsterBossLogic = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        if (!obj.parameters.fireCooldown) {
            var bulletConfig = configs.getConfig('mbullet');
            const direction = external_Phaser_default.a.Point.subtract(player.pos, obj.pos);
            bulletConfig.pos = obj.pos.clone();
            const bull = obj.layer.addObject(bulletConfig);
            bull.parameters.direction = direction;
            bull.sprite.setDegree(obj.pos.angle(player.pos));
            obj.parameters.fireCooldown = obj.parameters.cooldown;
        }
    },
};
const monsterBoss2Logic = {
    update: function (obj, dt) {
        const player = obj.layer.getObjectsByType('player')[0];
        const directionToPlayer = obj.parameters.direction;
        if (external_Phaser_default.a.Point.distance(obj.pos, player.pos) < obj.parameters.fireRange) {
            if (!obj.parameters.fireCooldown) {
                var bulletConfig = configs.getConfig('mbullet2');
                bulletConfig.pos = obj.pos.clone();
                const bull = obj.layer.addObject(bulletConfig);
                bull.parameters.direction = directionToPlayer;
                obj.parameters.fireCooldown = obj.parameters.cooldown;
            }
        }
        else {
            obj.setPosition(moveWithSpeed(obj.pos, directionToPlayer, obj.parameters.speed * dt));
        }
    },
};
const monsterBoss2Bullet = {
    update: function (obj) {
        const cooldown = obj.parameters.cooldown;
        const objects = obj.parameters.collisions;
        if (cooldown == 0) {
            obj.layer.removeObjectOnNextTick(obj.id);
            createExplosion();
            return;
        }
        else {
            obj.parameters.cooldown = cooldown - 1;
        }
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == 'player') {
                obj.layer.removeObjectOnNextTick(obj.id);
                createExplosion();
                break;
            }
        }
        function createExplosion() {
            const pos = obj.pos.clone();
            let explosionConfig;
            const power = obj.parameters.power;
            let expl;
            explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(pos.x, pos.y);
            expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = power;
        }
    },
};
const moveWithKeyboard = {
    update: function (obj) {
        const pos = obj.pos.clone();
        const direction = {};
        direction.left = obj.layer.game.input.keyboard.isDown(65);
        direction.up = obj.layer.game.input.keyboard.isDown(87);
        direction.down = obj.layer.game.input.keyboard.isDown(83);
        direction.right = obj.layer.game.input.keyboard.isDown(68);
        if (direction.right) {
            pos.x = obj.pos.x + 1;
        }
        if (direction.left) {
            pos.x = obj.pos.x - 1;
        }
        if (direction.down) {
            pos.y = obj.pos.y + 1;
        }
        if (direction.up) {
            pos.y = obj.pos.y - 1;
        }
        if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
            obj.parameters.direction = null;
        }
        else {
            obj.parameters.direction = external_Phaser_default.a.Point.subtract(pos, obj.pos);
        }
    },
};
const selectSpellWithKeyboard = {
    update: function (obj) {
        obj.layer.game.input.keyboard.isDown(49) &&
            (obj.parameters.currentSpell = 'fireball');
        obj.layer.game.input.keyboard.isDown(50) &&
            (obj.parameters.currentSpell = 'hellfire');
        obj.layer.game.input.keyboard.isDown(51) &&
            (obj.parameters.currentSpell = 'frostShard');
        obj.layer.game.input.keyboard.isDown(52) &&
            (obj.parameters.currentSpell = 'teleport');
    },
};
const triggerOnPlayerCollisionPowerUp = {
    update: function (obj) {
        const objects = obj.parameters.collisions;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == 'player') {
                //objects[i].parameters.spellPower', objects[i].parameters.spellPower') + obj.parameters.power'));
                objects[i].parameters.exp =
                    objects[i].parameters.exp + obj.parameters.exp;
                obj.layer.removeObjectOnNextTick(obj.id);
                break;
            }
        }
    },
};
const summonOnCooldown = {
    update: function (obj) {
        const cooldown = obj.parameters.cooldown;
        function getProperMonster() {
            let random = Math.random() * 100;
            let config;
            if (random <= obj.parameters.chanceOfBoss) {
                config = configs.getConfig('monsterBoss');
            }
            else {
                random -= obj.parameters.chanceOfBoss;
            }
            if (!config && random <= obj.parameters.chanceOfBoss2) {
                config = configs.getConfig('monsterBoss2');
            }
            else {
                random -= obj.parameters.chanceOfBoss2;
            }
            if (!config && random <= obj.parameters.chanceOfBoomer) {
                config = configs.getConfig('monsterBoomer');
            }
            else {
                random -= obj.parameters.monsterBoomer;
            }
            if (!config) {
                config = configs.getConfig('monster');
            }
            return config;
        }
        if (cooldown == 0) {
            let monsterConfig = getProperMonster();
            let player = obj.layer.getObjectsByType('player')[0];
            monsterConfig.pos = obj.pos.clone();
            const monster = obj.layer.addObject(monsterConfig);
            if (player.parameters.level > 1) {
                monster.parameters.health =
                    monster.parameters.health * 0.75 * player.parameters.level;
            }
            obj.layer.removeObjectOnNextTick(obj.id);
        }
        else {
            obj.parameters.cooldown = cooldown - 1;
        }
    },
};

// CONCATENATED MODULE: ./configs/rules/layers.ts


const trees = 100;
const layers_stones = 100;
const randomTrees = {
    init: function (obj) {
        function getRandomPointInArea() {
            return [
                Math.round(Math.random() * obj.size[0]),
                Math.round(Math.random() * obj.size[1]),
            ];
        }
        for (let i = 0; i < trees; i++) {
            const config = configs.getConfig('tree' + (Math.round(Math.random()) + 1));
            const point = getRandomPointInArea();
            config.pos = new external_Phaser_default.a.Point(point[0], point[1]);
            obj.addObject(config);
        }
        for (let i = 0; i < layers_stones; i++) {
            const config = configs.getConfig('stones');
            const point = getRandomPointInArea();
            config.pos = new external_Phaser_default.a.Point(point[0], point[1]);
            obj.addObject(config);
        }
    },
};
const spawnHeartCooldown = 400;
const spawnHeart = {
    update: function (obj) {
        if (!obj.parameters.spawnHeartCurrentCooldown) {
            const config = configs.getConfig('heart');
            const rect = new external_Phaser_default.a.Rectangle(50, 50, 1104, 868);
            config.pos = new external_Phaser_default.a.Point(rect.randomX, rect.randomY);
            obj.addObject(config);
            obj.parameters.spawnHeartCurrentCooldown = spawnHeartCooldown;
        }
        else {
            obj.parameters.spawnHeartCurrentCooldown--;
        }
    },
};
const spawnPowerupCooldown = 400;
const spawnPowerup = {
    update: function (obj) {
        if (!obj.parameters.spawnPowerupCurrentCooldown) {
            const config = configs.getConfig('powerup');
            const rect = new external_Phaser_default.a.Rectangle(100, 100, 1000, 750);
            config.pos = new external_Phaser_default.a.Point(rect.randomX, rect.randomY);
            obj.addObject(config);
            obj.parameters.spawnPowerupCurrentCooldown = spawnPowerupCooldown;
        }
        else {
            obj.parameters.spawnPowerupCurrentCooldown--;
        }
    },
};
const spawnTerrain = {
    init: function (obj) {
        const gateConfig = configs.getConfig('gate');
        let wallConfig;
        for (let i = 0; i < 7; i++) {
            wallConfig = configs.getConfig('wall');
            wallConfig.pos = [
                wallConfig.size[0] * i + wallConfig.size[0] / 2,
                wallConfig.size[1] / 2,
            ];
            obj.addObject(wallConfig);
        }
        gateConfig.pos = [
            wallConfig.pos.x + wallConfig.size[0] / 2 + gateConfig.size[0] / 2,
            (gateConfig.size[1] - 3) / 2,
        ];
        const gate = obj.addObject(gateConfig);
    },
};
const goWithPlayer = {
    update: function (obj, dt) {
        const player = obj.getObjectsByType('player')[0];
        const px = ((player.pos.x + obj.translate.x) / 1024) * 100;
        const py = ((player.pos.y + obj.translate.y) / 768) * 100;
        if (px < 30) {
            if (obj.translate.x < 0) {
                obj.translate.x += Math.round(player.parameters.speed * dt);
            }
        }
        if (px > 70) {
            if (obj.translate.x > -300) {
                obj.translate.x -= Math.round(player.parameters.speed * dt);
            }
        }
        if (py < 25) {
            if (obj.translate.y < 0) {
                obj.translate.y += Math.round(player.parameters.speed * dt);
            }
        }
        if (py > 75) {
            if (obj.translate.y > -300) {
                obj.translate.y -= Math.round(player.parameters.speed * dt);
            }
        }
    },
};

// CONCATENATED MODULE: ./configs/rules/ui.ts

const countMonsterKilled = {
    update: function (obj) {
        const template = obj.parameters.template;
        obj.parameters.text = string_template_default()(template, {
            kills: obj.layer.state.parameters.monstersKilled || 0,
        });
    },
};
const ui_timer = {
    update: function (obj) {
        const template = obj.parameters.template;
        obj.parameters.text = string_template_default()(template, {
            time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2),
        });
    },
};
const health = {
    update: function (obj) {
        const template = obj.parameters.template;
        obj.parameters.text = string_template_default()(template, {
            health: obj.layer.getObjectsByType('player')[0].parameters.health,
        });
    },
};
const ui_level = {
    update: function (obj) {
        const template = obj.parameters.template;
        const player = obj.layer.getObjectsByType('player')[0];
        obj.parameters.text = string_template_default()(template, {
            level: player.parameters.level,
            exp: player.parameters.exp,
            levelExp: player.parameters.levelTable[player.parameters.level],
        });
    },
};
const ui_bestTime = {
    init: function (obj) {
        const template = obj.parameters.template;
        obj.parameters.text = string_template_default()(template, {
            time: (obj.layer.state.parameters.bestTime / 60).toFixed(2),
        });
    },
};
const ui_bestScore = {
    init: function (obj) {
        const template = obj.parameters.template;
        obj.parameters.text = string_template_default()(template, {
            score: obj.layer.state.parameters.bestScore,
        });
    },
};

// CONCATENATED MODULE: ./configs/rules/etc.ts



const bindPositionToLayer = {
    update: function (obj) {
        if (obj.pos.x - obj.sprite.size[0] / 2 < 0) {
            obj.pos.x = obj.sprite.size[0] / 2;
        }
        else if (obj.pos.x + obj.sprite.size[0] / 2 > obj.layer.size[0]) {
            obj.pos.x = obj.layer.size[0] - obj.sprite.size[0] / 2;
        }
        if (obj.pos.y - obj.sprite.size[1] / 2 < 0) {
            obj.pos.y = obj.sprite.size[1] / 2;
        }
        else if (obj.pos.y + obj.sprite.size[1] / 2 > obj.layer.size[1]) {
            obj.pos.y = obj.layer.size[1] - obj.sprite.size[1] / 2;
        }
    },
};
const destroyAfterLeavingLayer = {
    update: function (obj) {
        if (obj.pos.y < -100 ||
            obj.pos.y - obj.sprite.size[1] - 100 > obj.layer.size[1] ||
            obj.pos.x - obj.sprite.size[0] - 100 > obj.layer.size[0] ||
            obj.pos.x < -100) {
            obj.layer.removeObjectOnNextTick(obj.id);
            return false;
        }
    },
};
const setDirectionToPlayer = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        obj.parameters.direction = external_Phaser_default.a.Point.subtract(player.pos, obj.pos);
    },
};
const setDirectionToPlayerAdvance = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        const playerDirection = player.parameters.direction;
        let oldDirection = obj.parameters.direction;
        if (!oldDirection) {
            oldDirection = external_Phaser_default.a.Point.subtract(player.pos, obj.pos);
        }
        if (playerDirection == null) {
            obj.parameters.direction = external_Phaser_default.a.Point.subtract(player.pos, obj.pos);
        }
        else {
            let speed = Math.abs(Math.min(player.parameters.speed, external_Phaser_default.a.Point.distance(obj.pos, player.pos)) - 10);
            let playerNextPlace = moveWithSpeed(player.pos, playerDirection, speed);
            let _dv = external_Phaser_default.a.Point.subtract(playerNextPlace, obj.pos).normalize();
            let _odv = oldDirection.clone().normalize();
            let _ndv = external_Phaser_default.a.Point.add(_odv, _dv).normalize();
            obj.parameters.direction = _ndv;
        }
    },
};
const wandererAI = {
    init: function (obj) {
        const rect = new external_Phaser_default.a.Rectangle(100, 100, 1000, 750);
        obj.parameters.direction = new external_Phaser_default.a.Point(rect.randomX, rect.randomY);
    },
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        const distance = external_Phaser_default.a.Point.distance(obj.pos, player.pos);
        if (distance <= obj.parameters.scentRange) {
            obj.parameters.scent = true;
            obj.parameters.speed = obj.defaultParameters.scentSpeed;
            obj.parameters.wanderCooldown = 0;
            obj.parameters.direction = external_Phaser_default.a.Point.subtract(player.pos, obj.pos);
        }
        else {
            obj.parameters.speed = obj.defaultParameters.speed;
            if (!obj.parameters.wanderCooldown) {
                const rect = new external_Phaser_default.a.Rectangle(100, 100, 1000, 750);
                obj.parameters.direction = external_Phaser_default.a.Point.subtract(new external_Phaser_default.a.Point(rect.randomX, rect.randomY), obj.pos);
                obj.parameters.wanderCooldown = Math.round(Math.random() * (obj.defaultParameters.wanderCooldown - 100) + 100);
            }
            else {
                obj.parameters.wanderCooldown &&
                    (obj.parameters.wanderCooldown = obj.parameters.wanderCooldown - 1);
            }
        }
    },
};
const dynamicZIndex = {
    update: function (obj) {
        let newZIndex = 0;
        obj.pos && (newZIndex += obj.pos.y);
        obj.sprite && (newZIndex += obj.sprite.size[1] / 2);
        obj.zIndex = obj.pos.y > 0 ? Math.round(newZIndex) : 0;
    },
};
const etc_collisions = {
    init: function (obj) {
        const collisions = [];
        obj.parameters.collisions = collisions;
        collisions.cells = [];
        obj.layer.state.collisions.updateObject(obj);
    },
    update: function (obj) {
        obj.parameters.collisions.splice(0);
        obj.layer.state.collisions.updateObject(obj);
    },
};
const rotateToMouse = {
    update: function (obj) {
        const destination = new external_Phaser_default.a.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
        destination.x -= obj.layer.translate.x;
        destination.y -= obj.layer.translate.y;
        const directionToMouse = external_Phaser_default.a.Point.subtract(destination, obj.pos);
        obj.sprite.rotateToDirection(directionToMouse);
    },
};
const bindPositionToMouse = {
    update: function (obj) {
        const mousePosition = new external_Phaser_default.a.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
        obj.setPosition(mousePosition.clone());
    },
};
const removeOnCooldown = {
    update: function (obj) {
        const cooldown = obj.parameters.cooldown;
        if (cooldown == 0) {
            obj.layer.removeObjectOnNextTick(obj.id);
        }
        else {
            obj.parameters.cooldown = cooldown - 1;
        }
    },
};
const explosionOnCooldown = {
    update: function (obj) {
        const cooldown = obj.parameters.cooldown;
        if (cooldown == 0) {
            obj.layer.removeObjectOnNextTick(obj.id);
            const explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(obj.pos.x, obj.pos.y);
            const expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = obj.parameters.power;
        }
        else {
            obj.parameters.cooldown = cooldown - 1;
        }
    },
};
const explosionAfterSpriteDone = {
    update: function (obj) {
        if (obj.sprite.done) {
            obj.layer.removeObjectOnNextTick(obj.id);
            const explosionConfig = configs.getConfig('monsterExplosion');
            explosionConfig.pos = new external_Phaser_default.a.Point(obj.pos.x, obj.pos.y);
            const expl = obj.layer.addObject(explosionConfig);
            expl.parameters.power = obj.parameters.power;
        }
    },
};
const destroyAfterSpriteDone = {
    update: function (obj) {
        if (obj.sprite.done) {
            obj.layer.removeObjectOnNextTick(obj.id);
        }
    },
};
const rotateByDirection = {
    update: function (obj) {
        obj.sprite.rotateToDirection(obj.parameters.direction);
    },
};
const rotateByPlayer = {
    update: function (obj) {
        const player = obj.layer.getObjectsByType('player')[0];
        obj.sprite.rotateToDirection(external_Phaser_default.a.Point.subtract(player.pos, obj.pos));
    },
};

// CONCATENATED MODULE: ./configs/rules/index.ts






const rules_rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, rules_logic_namespaceObject), rules_spells_namespaceObject), rules_units_namespaceObject), layers_namespaceObject), rules_ui_namespaceObject), etc_namespaceObject);
/* harmony default export */ var configs_rules = (rules_rules);

// CONCATENATED MODULE: ./configs/index.ts


function getRuleConfig(id) {
    return configs_rules[id];
}
function getConfig(id) {
    const config = JSON.parse(JSON.stringify(configs_objects[id]));
    !config.id && (config.id = id);
    return config;
}
/* harmony default export */ var configs = ({
    getRuleConfig,
    getConfig,
});

// CONCATENATED MODULE: ./engine/core/rule.ts
class GameRule {
    constructor(config) {
        this._update = config.update;
        this._init = config.init;
        this.inited = false;
    }
    init(obj) {
        if (!this.inited) {
            this._init && this._init(obj);
            this.inited = true;
        }
    }
    update(obj, dt) {
        this._update && this._update(obj, dt);
    }
}

// CONCATENATED MODULE: ./engine/sprite.ts

class sprite_Sprite {
    constructor({ cache, pos, size, speed, frames, url, dir, once, degree, }) {
        this.cache = cache;
        this.pos = pos;
        this.defaultPosition = this.pos.clone();
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this.frameIndex = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.degree = degree || 0;
    }
    update(dt) {
        this.frameIndex += this.speed * dt;
    }
    setDegree(degree) {
        this.degree = degree;
    }
    rotateToDirection(direction) {
        const angle = direction.angle(new external_Phaser_default.a.Point(0, 0), true);
        const { x: defaultX, y: defaultY } = this.defaultPosition;
        if (angle > 135 || angle < -135) {
            this.pos.setTo(defaultX, defaultY + 2 * this.size[1]);
        }
        else if (angle < 135 && angle > 45) {
            this.pos.setTo(defaultX, defaultY + 3 * this.size[1]);
        }
        else if (angle < 45 && angle > -45) {
            this.pos.setTo(defaultX, defaultY + this.size[1]);
        }
        else {
            this.pos.setTo(defaultX, defaultY);
        }
    }
    render(ctx) {
        let frame;
        let x = this.pos.x;
        let y = this.pos.y;
        if (this.speed > 0) {
            const max = this.frames.length;
            const idx = Math.floor(this.frameIndex);
            frame = this.frames[idx % max];
            if (this.once && idx >= max) {
                this.done = true;
                return;
            }
        }
        else {
            frame = 0;
        }
        if (this.dir === 'vertical') {
            y += frame * this.size[1];
        }
        else {
            x += frame * this.size[0];
        }
        ctx.rotate(this.degree);
        ctx.drawImage(this.cache.getImage(this.url), x, y, this.size[0], this.size[1], Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2), this.size[0], this.size[1]);
    }
}

// CONCATENATED MODULE: ./engine/renderers.ts
function renderers_fog(obj) {
    const ctx = obj.layer.ctx;
    const x = obj.layer.getObjectsByType('player')[0].pos.x;
    const y = obj.layer.getObjectsByType('player')[0].pos.y;
    const grad = obj.layer.ctx.createRadialGradient(x, y, 0, x, y, 700);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.97)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 2000, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}
function healthBar(obj) {
    const ctx = obj.layer.ctx;
    const x = Math.round(-obj.sprite.size[0] / 2);
    const y = Math.round(-obj.sprite.size[1] / 2 - 7);
    const width = obj.sprite.size[0];
    const height = 3;
    ctx.globalAlpha = 0.5;
    if (obj.parameters.health > 0 &&
        obj.defaultParameters.health > obj.parameters.health) {
        ctx.fillStyle = 'rgb(250, 0, 0)';
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = 'rgb(0, 250, 0)';
        ctx.fillRect(x, y, Math.round(width * (obj.parameters.health / obj.defaultParameters.health)), height);
    }
    ctx.globalAlpha = 1;
}
function expBar(obj) {
    const x = -22;
    const y = 17;
    const width = 200;
    const height = 40;
    const ctx = obj.layer.ctx;
    const player = obj.layer.getObjectsByType('player')[0];
    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgb(220, 220, 220)';
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#DAA520';
    if (player.parameters.levelTable[player.parameters.level]) {
        ctx.fillRect(x, y, Math.min(width, Math.round(width *
            (player.parameters.exp /
                player.parameters.levelTable[player.parameters.level]))), height);
    }
    else {
        ctx.fillRect(x, y, width, height);
    }
    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
    textRender(obj);
}
function sprite(obj, dt) {
    const ctx = obj.layer.ctx;
    ctx.globalAlpha = 1;
    obj.sprite.update(dt);
    obj.sprite.render(ctx);
}
function ellipse(context, cx, cy, rx, ry, rot, aStart, aEnd) {
    context.save();
    context.translate(cx, cy);
    context.rotate(rot);
    context.translate(-rx, -ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, aStart, aEnd, false);
    context.restore();
}
function shadow(obj) {
    if (obj.size) {
        const ctx = obj.layer.ctx;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ellipse(ctx, 0, +obj.sprite.size[1] / 2 - 3, Math.min(obj.sprite.size[0], obj.size[0]) / 2 + 8, 5, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}
function effects(obj) {
    const ctx = obj.layer.ctx;
    const effects = obj.parameters.effects;
    for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];
        if (effect === 'frozen') {
            ctx.globalAlpha = 0.8;
            ctx.drawImage(obj.layer.game.cache.getImage('frostEffect'), -16, +(obj.sprite.size[1] / 2) - 32, 32, 32);
            ctx.globalAlpha = 1;
        }
    }
}
function objectRenderer(obj, dt) {
    shadow(obj);
    sprite(obj, dt);
}
function unitRenderer(obj, dt) {
    shadow(obj);
    healthBar(obj);
    sprite(obj, dt);
    effects(obj);
}
function spellRenderer(obj, dt) {
    const ctx = obj.layer.ctx;
    const x = Math.round(-obj.sprite.size[0] / 2 - 4);
    const y = Math.round(-obj.sprite.size[1] / 2 - 4);
    const width = obj.sprite.size[0] + 8;
    const height = obj.sprite.size[1] + 8;
    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    if (obj.id.indexOf(obj.layer.getObjectsByType('player')[0].parameters.currentSpell) !== -1) {
        ctx.fillStyle = 'rgb(0, 250, 0)';
        ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    }
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1;
    sprite(obj, dt);
    if (obj.parameters.fireCooldown > 0) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'rgb(20, 20, 20)';
        ctx.fillRect(x, Math.round(y +
            height -
            height * (obj.parameters.fireCooldown / obj.parameters.cooldown)), width, height);
        ctx.globalAlpha = 1;
    }
    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}
function ui(obj, dt) {
    const ctx = obj.layer.ctx;
    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    sprite(obj, dt);
    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}
function textRender(obj) {
    const ctx = obj.layer.ctx;
    let fontConfig = '';
    ctx.translate(-obj.layer.translate.x, -obj.layer.translate.y);
    obj.parameters.style && (fontConfig += obj.parameters.style + ' ');
    obj.parameters.weight && (fontConfig += obj.parameters.weight + ' ');
    fontConfig += (obj.parameters.size || 30) + 'pt ';
    fontConfig += obj.parameters.font || 'Arial';
    if (obj.parameters.align) {
        ctx.textAlign = obj.parameters.align;
    }
    ctx.font = fontConfig;
    ctx.fillStyle = obj.parameters.color || '#FFF';
    ctx.fillText(obj.parameters.text, obj.pos.x, obj.pos.y);
    ctx.translate(obj.layer.translate.x, obj.layer.translate.y);
}
const renders = {
    shadow,
    fog: renderers_fog,
    expBar,
    healthBar,
    sprite,
    effects,
    ui,
    object: objectRenderer,
    text: textRender,
    spell: spellRenderer,
    unit: unitRenderer,
};
/* harmony default export */ var renderers = (renders);

// CONCATENATED MODULE: ./engine/core/object.ts





class object_GameObject {
    constructor(config) {
        this.layer = config.layer;
        if (config.pos instanceof Phaser.Point) {
            this.pos = config.pos.clone();
        }
        else {
            if (config.pos) {
                this.pos = new Phaser.Point(config.pos[0], config.pos[1]);
            }
            else {
                this.pos = new Phaser.Point();
            }
        }
        this.id = config.id;
        if (config.sprite) {
            this.sprite = new sprite_Sprite({
                cache: this.layer.game.cache,
                url: config.sprite[0],
                pos: new Phaser.Point(...config.sprite[1]),
                size: config.sprite[2],
                speed: config.sprite[3],
                frames: config.sprite[4],
                dir: config.sprite[5],
                once: config.sprite[6],
                degree: config.sprite[7],
            });
        }
        this.type = config.type || 'default';
        if (config.size || this.sprite) {
            this.size = config.size || this.sprite.size;
        }
        this.shouldCheckCollisions = config.collisions;
        this.zIndex = config.zIndex || 0;
        this.parameters = (config.parameters && clone(config.parameters)) || {};
        this.defaultParameters = clone(this.parameters);
        this.size = config.size;
        this.rules = config.rules || [];
        this.conditions = config.conditions || [];
        if (config.render) {
            if (renderers[config.render]) {
                this.customRender = renderers[config.render];
            }
            else {
                this.customRender = config.render;
            }
        }
        else {
            if (config.render === false) {
                this.noRender = true;
            }
        }
        this.inited = false;
    }
    render(dt) {
        if (!this.noRender) {
            if (this.customRender) {
                if (Array.isArray(this.customRender)) {
                    this.customRender.forEach(renderer => renderer(this, dt));
                }
                else {
                    this.customRender(this, dt);
                }
            }
            else {
                renderers.sprite(this, dt);
            }
        }
    }
    init() {
        if (!this.inited) {
            const rules = this.rules;
            const conditions = this.conditions;
            this.rules = [];
            this.conditions = [];
            if (this.shouldCheckCollisions) {
                this.collisions = new GameRule(configs.getRuleConfig('collisions'));
                this.collisions.init(this);
            }
            for (let i = 0, l = rules.length; i < l; i++) {
                this.addRule(configs.getRuleConfig(rules[i]));
            }
            for (let i = 0, l = conditions.length; i < l; i++) {
                this.addCondition(configs.getRuleConfig(conditions[i]));
            }
            this.inited = true;
        }
    }
    update(dt) {
        this.rules.forEach(rule => rule.update(this, dt));
    }
    updateConditions(dt) {
        this.conditions.forEach(condition => condition.update(this, dt));
    }
    updateCollisions(dt) {
        this.collisions && this.collisions.update(this, dt);
    }
    setPosition(point) {
        this.pos.x = point.x;
        this.pos.y = point.y;
    }
    addRule(config) {
        const rule = new GameRule(config);
        rule.init(this);
        this.rules.push(rule);
    }
    addCondition(config) {
        const condition = new GameRule(config);
        condition.init(this);
        this.conditions.push(condition);
    }
}

// CONCATENATED MODULE: ./engine/core/layer.ts




class layer_GameLayer {
    constructor(config) {
        this.objectsToBeRemoved = [];
        this.config = config;
        this.id = config.id;
        this.state = config.state;
        this.game = this.state.game;
        this.ctx = config.ctx;
        this.initList = config.initList;
        this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
        this.size = config.size || [this.ctx.canvas.width, this.ctx.canvas.height];
        this.sortedObjects = {
            default: [],
        };
        this.objects = {};
        this.inited = false;
        this.parameters = {};
    }
    init() {
        if (!this.inited) {
            this.translate = this.config.translate
                ? clone(this.config.translate)
                : { x: 0, y: 0 };
            this.config.initList.forEach(objectID => this.addObject(configs.getConfig(objectID)));
            this.config.init && this.config.init();
            this.rules = [];
            this.config.rules.forEach(ruleID => this.addRule(configs.getRuleConfig(ruleID)));
            this.inited = true;
        }
    }
    render(dt) {
        if (!this.inited)
            return;
        const arr = {};
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, this.size[0], this.size[1]);
        ctx.clip();
        ctx.translate(this.translate.x, this.translate.y);
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5);
        for (let i in this.objects) {
            if (this.objects.hasOwnProperty(i)) {
                arr[this.objects[i].zIndex] || (arr[this.objects[i].zIndex] = []);
                arr[this.objects[i].zIndex].push(this.objects[i]);
            }
        }
        for (let i in arr) {
            if (arr[i]) {
                for (let j = 0, k = arr[i].length; j < k; j++) {
                    ctx.save();
                    ctx.translate(Math.round(arr[i][j].pos.x), Math.round(arr[i][j].pos.y));
                    arr[i][j].render(dt);
                    ctx.restore();
                }
            }
        }
        ctx.translate(-this.translate.x, -this.translate.y);
        ctx.restore();
    }
    update(dt) {
        if (!this.inited)
            return;
        for (let i in this.rules) {
            this.rules.hasOwnProperty(i) && this.rules[i].update(this, dt);
        }
        for (let i in this.objects) {
            this.objects[i].update(dt);
        }
        for (let i in this.objects) {
            this.objects[i].updateCollisions(dt);
        }
        this.state.collisions.check();
        for (let i in this.objects) {
            this.objects[i].updateConditions(dt);
        }
        while (this.objectsToBeRemoved.length) {
            const id = this.objectsToBeRemoved.pop();
            const obj = this.objects[id];
            if (obj) {
                obj.shouldCheckCollisions && this.state.collisions.removeObject(obj);
                this.removeObject(id);
            }
        }
    }
    removeObjectOnNextTick(id) {
        this.objectsToBeRemoved.push(id);
    }
    addRule(config) {
        const rule = new GameRule(config);
        rule.init(this);
        this.rules.push(rule);
    }
    removeObject(id) {
        if (this.objects.hasOwnProperty(id)) {
            this.objects[id].layer = null;
            this.sortedObjects[this.objects[id].type].splice(this.sortedObjects[this.objects[id].type].indexOf(id), 1);
            this.objects[id] = null;
            delete this.objects[id];
        }
    }
    addObject(config) {
        config.layer = this;
        config.id += Math.round(new Date().getTime() + Math.random() * 1000001);
        const obj = new object_GameObject(config);
        obj.init();
        if (config.type && config.type !== 'default') {
            !this.sortedObjects[config.type] &&
                (this.sortedObjects[config.type] = []);
            this.sortedObjects[config.type].push(obj.id);
        }
        else {
            this.sortedObjects['default'].push(obj.id);
        }
        this.objects[obj.id] = obj;
        return this.objects[obj.id];
    }
    getObjectsByType(type) {
        const objectsId = this.sortedObjects[type] || [];
        const result = [];
        for (let i = 0, l = objectsId.length; i < l; i++) {
            result.push(this.objects[objectsId[i]]);
        }
        return result;
    }
    clearLayer() {
        this.objects = {};
        this.sortedObjects = {
            default: [],
        };
        this.rules = [];
        this.inited = false;
    }
}

// CONCATENATED MODULE: ./states/battle.ts



const LAYER_CONFIG = {
    id: 'mainLayer',
    size: [1324, 1068],
    background: 'terrain',
    initList: [
        'player',
        'cursor',
        'counter',
        'timer',
        'bestTime',
        'fireballSpell',
        'hellfireSpell',
        'frostShardSpell',
        'teleportSpell',
        'bestScore',
        'level',
        'fog',
        'monsterController',
    ],
    translate: {
        x: -150,
        y: -150,
    },
    rules: ['randomTrees', 'spawnHeart', 'spawnPowerup', 'goWithPlayer'],
};
class battle_GameState extends external_Phaser_default.a.State {
    init() {
        this.battleTheme = this.sound.add('battleTheme', 0.3, true);
        this.deathTheme = this.sound.add('deathTheme', 0.3, true);
    }
    create() {
        this.pauseFlag = false;
        this.collisions = collisions({
            n: 6,
            width: 1500,
            height: 1200,
        });
        this.initGameParameters();
        this.initGameLayer();
        this.initControls();
        this.battleTheme.play();
    }
    initControls() {
        this.restartButton = this.add.button(512, 384, 'button', this.restart, this, 2, 0, 1, 2);
        this.restartButton.addChild(this.add.text(-65, -15, 'RESTART', {
            fill: '#efefef',
        }));
        this.restartButton.addChild(this.add.text(-70, -70, 'YOU DIED!', {
            fill: '#EF0000',
        }));
        this.restartButton.anchor.setTo(0.5, 0.5);
        this.restartButton.kill();
    }
    initGameParameters() {
        this.parameters = {
            monstersKilled: 0,
            gameTimer: 0,
            bestTime: parseInt(localStorage.getItem('bestTime')) || 0,
            bestScore: parseInt(localStorage.getItem('bestScore')) || 0,
        };
    }
    initGameLayer() {
        this.bitmap = this.add.bitmapData(this.game.canvas.width, this.game.canvas.height, 'battleBitmap');
        this.add.image(0, 0, this.bitmap);
        this.gameLayer = new layer_GameLayer(Object.assign(Object.assign({}, LAYER_CONFIG), { init: function () {
                this.state.parameters.monstersKilled = 0;
                this.state.parameters.gameTimer = 0;
            }, state: this, ctx: this.bitmap.ctx }));
        this.gameLayer.init();
    }
    stopBattle() {
        this.updateBestScores();
        this.battleTheme.stop();
        this.deathTheme.play();
        this.restartButton.revive();
        this.pauseFlag = true;
    }
    updateBestScores() {
        if (this.parameters.gameTimer > this.parameters.bestTime) {
            this.parameters.bestTime = this.parameters.gameTimer;
            localStorage.setItem('bestTime', this.parameters.bestTime.toString());
        }
        if (this.parameters.monstersKilled > this.parameters.bestScore) {
            this.parameters.bestScore = this.parameters.monstersKilled;
            localStorage.setItem('bestScore', this.parameters.bestScore.toString());
        }
    }
    prepareForRender() {
        if (this.pauseFlag === true) {
            this.gameLayer.render(0);
            this.bitmap.rect(0, 0, this.game.canvas.width, this.game.canvas.height, 'rgba(10,0,0,0.5)');
        }
        else {
            this.gameLayer.update(this.game.time.physicsElapsed);
            this.gameLayer.render(this.game.time.physicsElapsed);
        }
    }
    restart() {
        this.pauseFlag = false;
        this.battleTheme.play();
        this.deathTheme.stop();
        this.collisions.clear();
        this.restartButton.kill();
        this.gameLayer.clearLayer();
        this.gameLayer.init();
    }
    update() {
        this.prepareForRender();
    }
}
/* harmony default export */ var battle = (battle_GameState);

// CONCATENATED MODULE: ./states/index.ts




/* harmony default export */ var states = ({
    preLoading: preloading,
    loading: loading,
    mainMenu: mainMenu,
    battle: battle,
});

// CONCATENATED MODULE: ./index.ts


const game = new external_Phaser_default.a.Game(1024, 768, external_Phaser_default.a.CANVAS, 'main', null, false, false);
window.game = game;
game.state.add('preloading', states.preLoading, true);
game.state.add('loading', states.loading);
game.state.add('battle', states.battle);
game.state.add('mainMenu', states.mainMenu);


/***/ })
/******/ ]);
});