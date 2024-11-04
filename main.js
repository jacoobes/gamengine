import { Application, Assets, Container, Sprite } from 'pixi.js'


const app = new Application()
await app.init({ background: '#1099bb', resizeTo: window });

document.body.appendChild(app.canvas);

const layers = [
    new Container() // base
]

for (const layer of layers) {
    app.stage.addChild(layer)
}

class MyApplication {

    config = {
        renderer: {
            scaleMode: 'nearest'
        },
        autoResize : true
    };

    async render(layers) {
        const top = layers.at(-1)
        const asset = await Assets.load('girlfriend.png' )
        const sprite = Sprite.from(asset)
        sprite.x = app.screen.width / 2
        sprite.y = app.screen.height / 2
        top.addChild(sprite)
    }

    tick(time) {

    }

}


const game = new MyApplication();
game.render(layers)
app.ticker.add((time) => {
    game.tick(time)
});

if(game.config.autoResize) {
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
addEventListener('resize', () => {
    app.resize()
    cleanup(app.stage)
    game.render(layers)
})

}

