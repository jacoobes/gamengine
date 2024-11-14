import { Application, Assets, Container, Sprite } from 'pixi.js'



const keys = {}
class MyApplication {

    config = {
        renderer: {
            scaleMode: 'nearest'
        },
        autoResize : true
    };
    speed = 2;
    sprite;
    async init() {
        
        Assets.add({ alias: 'gf', src: 'girlfriend.png'});
        const sprite = Sprite.from(await Assets.load('gf'))
        this.sprite = sprite;
    }

    async render(layers) {
        const top = layers.at(-1)
        this.sprite.x = app.screen.width / 2
        this.sprite.y = app.screen.height / 2
        top.addChild(this.sprite)
    }

    tick(time) {
        if (keys['ArrowUp'] || keys['KeyW']) {
            this.sprite.y -= this.speed
        }
        if (keys['ArrowDown'] || keys['KeyS']) {
            this.sprite.y += this.speed
        }
        if (keys['ArrowLeft'] || keys['KeyA']) {
            this.sprite.x -= this.speed;
        }
        if (keys['ArrowRight'] || keys['KeyD']) {
            this.sprite.x += this.speed;
        }

    }

}
const splashScreen = document.getElementById('splash-screen');

const app = new Application();
await app.init({ background: '#ffffff', resizeTo: window, antialias: true, });


const layers = [
    new Container() // base
]

for (const layer of layers) {
    app.stage.addChild(layer)
}

const game = new MyApplication();
await game.init()
game.render(layers)
splashScreen.remove();
document.body.appendChild(app.canvas)

addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
addEventListener('keyup', e => {
    keys[e.code] = false;
})

app.ticker.add((time) => {
    game.tick(time)
});

function cleanup(layer) {
    for (let i = layer.children.length - 1; i >= 0; i--) {
        const child = layer.children[i];

        // Skip elements that should persist
        if (child.uid === 'KOREAMAP' || child.uid === 'table') {
            continue;
        }

        // Unload asset if it's managed by PIXI.Assets, or destroy otherwise
        if (child.texture) {
            Assets.unload(child.texture);
        }

        child.destroy({ children: true, });
    }
}

if(game.config.autoResize) {

//addEventListener('resize', () => {
//    app.resize()
//    cleanup(app.stage)
//    game.render(layers)
//})

}

