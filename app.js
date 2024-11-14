// app.js
import { Assets, Sprite } from 'pixi.js';

import { loadSpriteFromAtlas } from './util.js'
import { keys } from './ngin.js'
export default class MyApplication {
  config = {
    renderer: {
      scaleMode: 'nearest',
    },
    autoResize: false,
  };

  speed = 2;
  sprite;

  async init({ app }) {
    const w = 34, h = 34;
    const atlasData = {
        frames: {
          // standin frames
          'standSouth': { frame: { x: 1 * w, y: 0, w: w, h: h } }, // x=34
          'standWest': { frame: { x: 4 * w, y: 0, w: w, h: h } },  // x=136
          'standEast': { frame: { x: 7 * w, y: 0, w: w, h: h } },  // x=238
          'standNorth': { frame: { x: 10 * w, y: 0, w: w, h: h } },// x=340

          // walk south frames
          'walkSouth_0': { frame: { x: 0 * w, y: 0, w: w, h: h } },// x=0
          'walkSouth_1': { frame: { x: 1 * w, y: 0, w: w, h: h } },// x=34
          'walkSouth_2': { frame: { x: 2 * w, y: 0, w: w, h: h } },// x=68

          // walk west frames
          'walkWest_0': { frame: { x: 3 * w, y: 0, w: w, h: h } },// x=102
          'walkWest_1': { frame: { x: 4 * w, y: 0, w: w, h: h } },// x=136
          'walkWest_2': { frame: { x: 5 * w, y: 0, w: w, h: h } },// x=170

          // walk east frames
          'walkEast_0': { frame: { x: 6 * w, y: 0, w: w, h: h } },// x=204
          'walkEast_1': { frame: { x: 7 * w, y: 0, w: w, h: h } },// x=238
          'walkEast_2': { frame: { x: 8 * w, y: 0, w: w, h: h } },// x=272

          // walk north frames
          'walkNorth_0': { frame: { x: 9 * w, y: 0, w: w, h: h } },// x=306
          'walkNorth_1': { frame: { x: 10 * w, y: 0, w: w, h: h } },// x=340
          'walkNorth_2': { frame: { x: 11 * w, y: 0, w: w, h: h } },// x=374
        },
        animations: {
          'standSouth': ['standSouth'],
          'standWest': ['standWest'],
          'standEast': ['standEast'],
          'standNorth': ['standNorth'],
          'walkSouth': ['walkSouth_0', 'walkSouth_1', 'walkSouth_2'],
          'walkWest': ['walkWest_0', 'walkWest_1', 'walkWest_2'],
          'walkEast': ['walkEast_0', 'walkEast_1', 'walkEast_2'],
          'walkNorth': ['walkNorth_0', 'walkNorth_1', 'walkNorth_2'],
        },
        meta: {
          image: 'spritesheet.png',
        },
    };
    Assets.add({ alias: 'mc', src: 'spritesheet.png'});
    await Assets.load('mc');
    this.app = app;
    this.sprite = await loadSpriteFromAtlas(atlasData, 'mc', 0.16);

  }

  async render(layers) {
    // Get the top layer and add the sprite to it
    const top = layers.at(-1);
    this.sprite.x = this.app.screen.width / 2;
    this.sprite.y = this.app.screen.height / 2;
    top.addChild(this.sprite);
  }

  tick(time) {
    // Update sprite position based on key inputs
    if (keys['ArrowUp'] || keys['KeyW']) {
      this.sprite.y -= this.speed;
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
      this.sprite.y += this.speed;
    }
    if (keys['ArrowLeft'] || keys['KeyA']) {
      this.sprite.x -= this.speed;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
      this.sprite.x += this.speed;
    }
  }
}

