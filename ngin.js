// framework.js
import { Application, Assets, Container } from 'pixi.js';
import MyApplication from './app.js';

// Global key tracking object
export const keys = {};
function onKeyDown(e) {
    keys[e.code] = true;
}
function onKeyUp(e) {
    keys[e.code] = false;
}
export async function initializeFramework() {
  // Splash screen setup
  const menu = document.querySelector('.menu');

  const buttons  = menu.querySelectorAll('.menu-item');
  for (const button of buttons) {
      if(button.getAttribute('id') === 'start') {
          button.addEventListener('click', async () => {
             // Create base layers
              const layers = [
                  new Container()
              ];
              // Initialize PixiJS Application
              const app = new Application();
              await app.init({
                background: '#FFFFFF',
                resizeTo: window,
                autoDensity: true,
                antialias: true,
              });
              for (const layer of layers) {
                app.stage.addChild(layer);
              }

              // Initialize user application (MyApplication)
              const game = new MyApplication();
              await game.init({ app });
              game.render(layers);
              menu.remove();
              document.body.appendChild(app.canvas);

              // Handle keyboard events for movement
              addEventListener('keydown', onKeyDown);
              addEventListener('keyup', onKeyUp);

              // Add game logic to the PixiJS ticker
              app.ticker.add((time) => {
                game.tick(time);
              });
              // Handle auto-resizing if enabled
              if (game.config.autoResize) {
                let resizeTimer;
                function onResize () {
                  if (resizeTimer) clearTimeout(resizeTimer)
                  resizeTimer = setTimeout(() => {
                      console.log('resized')
                      // cleanup()
                      // init()
                  }, 200);
                }
                // Listen to resize event
                window.addEventListener('resize', onResize)
              }

          })
                   
    }
          

  }
      


  // Cleanup function for layers
  function cleanup(layer) {
    for (let i = layer.children.length - 1; i >= 0; i--) {
      const child = layer.children[i];

      // Unload or destroy asset
      if (child.texture) {
        Assets.unload(child.texture);
      }
      child.destroy({ children: true });
    }
  }

  
}
