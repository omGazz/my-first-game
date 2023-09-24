import { resources } from "./src/resource.js";
import { GameLoop } from "./src/GameLoop.js";
import { Sprite } from "./src/sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";


const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");


const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1, // this is the frame on the image we want to show
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPos = new Vector2(16 * 3, 16 * 5);
const input = new Input();

const update = () => {
  console.log(input.direction);
  switch (input.direction) {
    case DOWN:
      heroPos.y += 1;
      hero.frame = 0;
      break;
    case UP:
      heroPos.y -= 1;
      hero.frame = 6;
      break;
    case LEFT:
      heroPos.x -= 1;
      hero.frame = 9;
      break;
    case RIGHT:
      heroPos.x += 1;
      hero.frame = 3;
      break;
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // center the hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x + heroOffset.x;
  const heroPosY = heroPos.y + heroOffset.y;
  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

// we want to be sure to load the image when it is ready
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
