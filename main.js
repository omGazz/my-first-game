import { resources } from "./src/resource.js";
import { GameLoop } from "./src/GameLoop.js";
import { Sprite } from "./src/sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";
import { gridCells, isSPaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveToward.js";
import { walls } from "./src/levels/level1.js";

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
  position: new Vector2(gridCells(6), gridCells(5))
});

const heroDestinationPosition = hero.position.duplicate();

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const input = new Input();

const update = () => {

  const distance = moveTowards(hero, heroDestinationPosition, 1)
  const hasArrived = distance <= 1;
   if(hasArrived) {
    tryMove()
   }


};

const tryMove = () => {

  if(!input.direction) return;

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  switch (input.direction) {
    case DOWN:
      nextY += gridSize;
      hero.frame = 0;
      break;
    case UP:
      nextY -= gridSize;
      hero.frame = 6;
      break;
    case LEFT:
      nextX -= gridSize
      hero.frame = 9;
      break;
    case RIGHT:
      nextX += gridSize      
      hero.frame = 3;
      break;
  }

  //validating that the next destination is free
  if(isSPaceFree(walls, nextX, nextY)){
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }

}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // center the hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + heroOffset.y;
  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

// we want to be sure to load the image when it is ready
const gameLoop = new GameLoop(update, draw);
gameLoop.start();


