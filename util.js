import { Texture, Spritesheet, Sprite, AnimatedSprite, Assets } from 'pixi.js';

export async function loadSpriteFromAtlas(atlasData, spriteName, animationSpeed = 0.1) {
    // Create Spritesheet instance from the atlas metadata
    const spritesheet = new Spritesheet(
        await Assets.load(atlasData.meta.image),
        atlasData
    );

    // Parse the spritesheet asynchronously
    await spritesheet.parse();

    // Check if the spriteName is an animation or a single frame
    if (atlasData.animations) {
        const animatedSprite = new AnimatedSprite(spritesheet.animations['standSouth']);
        animatedSprite.animationSpeed = animationSpeed;
        animatedSprite.play();
        return animatedSprite;
    } else if (spritesheet.textures[spriteName]) {
        // Return a single frame Sprite
        return new Sprite(spritesheet.textures[spriteName]);
    } else {
        throw new Error(`Sprite name "${spriteName}" not found in the atlas data.`);
    }
}
