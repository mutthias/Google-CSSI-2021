// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    colorMode, createCanvas, background, backgroundColor, random, noStroke
 *    HSB, height, width, fill, ellipse, windowWidth, windowHeight,
 *    frameRate, stroke, noFill, rect, keyCode, UP_ARROW, DOWN_ARROW,
 *    LEFT_ARROW, image, RIGHT_ARROW, keyIsDown, createAudio, loadImage, text, collideRectRect, gameIsOver, createButton, noLoop, loop, gamneRestart
 *    marioWalk, marioY, collideLineCircle, line, mouseX, mouseY, jump, collideCircleCircle, block, questionBlock, collideLineRect, textSize, collideRectRect, stroke, collideRectCircle, circle, jumpsound, fireM
 *    fireMarioRun, castle, flagPole flagX, offScreen1, theEnd, coin, fireballSound, goombaStomp, powerup, powerappearsound, marioFlagPole, levelcomplete
 */
let backgroundImage,
  marioStand,
  marioG,
  dirt,
  marioX,
  marioJump,
  backgroundMusic,
  defaultMario,
  movement,
  platform,
  movementLR,
  marioWalkLeft,
  marioMax,
  platformX,
  marioW,
  marioH,
  bricks,
  marioY,
  marioheight,
  mariowidth,
  bricks2,
  target,
  gameOver,
  goomba,
  hit2,
  jumpSound,
  questionBlockImage,
  marioHit,
  hit,
  fireFlower,
  fireBalls,
  howManyFireBalls,
  numberOfFireBalls;

let score;
let levelOne, levelTwo;
let bricksv2;
let lives,
  questionArray,
  flowerTime,
  defaultM,
  shootBall,
  fireMario,
  fireballX,
  fireballY,
  fireballW,
  fireballH,
  fireMarioW,
  fireMarioH;
let goombaX,
  goombaY,
  goombaHit,
  goombaV,
  goombaW,
  goombaGone,
  goombaH,
  goombaArray,
  goombaStomped,
  bounce;

let theEnd;

function setup() {
  // Canvas & color settings
  let cnv = createCanvas(600, 350);
  cnv.mousePressed(canvasPressed);
  colorMode(HSB, 360, 100, 100);
  frameRate(60);
  //images
  goomba = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F59c6738022757677cb799cfc174c326c58333485_hq.gif?v=1627924947067"
  );
  backgroundMusic = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FOverworld%20Theme%20-%20New%20Super%20Mario%20Bros..mp3?v=1627672316078"
  );
  jumpSound = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FMario%20Jump%20-%20Sound%20Effect%20(HD).mp3?v=1628019514424"
  );
  backgroundImage = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Fbush_cloud_ingame.png?v=1627671432936"
  );
  marioStand = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F129689af6922014.png?v=1627671546418"
  );
  marioWalk = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Fbea7fa407ad38787e47136b25c038d2d_w200.gif?v=1627671569359"
  );
  marioWalkLeft = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Fbea7fa407ad38787e47136b25c038d2d_w200%20(3).jpg?v=1627853161521"
  );
  marioJump = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F002251ab93aa8a09b5090fc4ad951f8c.png?v=1627671575016"
  );
  platform = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F47b85f76087810c.png?v=1627924901099"
  );
  block = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Funnamed%20(1).png?v=1627926249485"
  );
  questionBlockImage = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Fa16e719614a255f.png?v=1627926321943"
  );
  goombaStomped = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Funnamed%20(3).png?v=1627933320048"
  );
  fireFlower = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Ftenor.gif?v=1628100053457"
  );
  shootBall = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FSlipperyObedientBasil-size_restricted.gif?v=1628100589041"
  );
  fireMario = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F55ec965b385c60c.png?v=1628100678688"
  );
  fireMarioRun = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Fani_1firemario300-vgo.gif?v=1628100736672"
  );
  castle = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F3bd3e7fcf03935e331b008d1f9398f61.png?v=1628183982187"
  );
  flagPole = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2Fimageedit_3_3381164910.png?v=1628194405472"
  );
  coin = loadImage(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F73ec412cb51e29f117839d27b78c9ff9_w200.gif?v=1628199213810"
  );
  fireballSound = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FSuper%20Mario%20Bros.-Fireball%20Sound%20Effect.mp3?v=1628199259559"
  );
  goombaStomp = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2F%5BSuper%20Mario%20Bros%5D%20Goomba%20Stomp%20Sound%20Effect%20%5BFree%20Ringtone%20Download%5D.mp3?v=1628199401744"
  );
  powerup = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FSuper%20Mario%20Power%20Up%20Sound%20Effect.mp3?v=1628199628509"
  );
  powerappearsound = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FSuper%20Mario%20Power%20Up%20Appear%20Sound%20Effect.mp3?v=1628199672309"
  );
  marioFlagPole = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FSuper%20Mario%20Down%20the%20Flag%20Pole%20Sound%20Effect.mp3?v=1628204126268"
  );
  levelcomplete = createAudio(
    "https://cdn.glitch.com/429c6f68-7018-455c-952a-f55b306f0a67%2FLevel%20Complete%20-%20New%20Super%20Mario%20Bros..mp3?v=1628203690640"
  );

  //

  dirt = height - 107;
  marioX = 20;
  marioG = 0;
  marioY = dirt;
  jump = true;
  marioHit = false;
  movement = false;
  movementLR = false;
  marioMax = 100;
  var hit = false;
  platformX = 50;
  marioW = 50;
  marioH = 50;
  fireMarioW = 60;
  fireMarioH = 60;
  marioheight = 50;
  mariowidth = 50;
  bricks = [];
  bricks2 = [];
  marioCoins = [];
  theEnd = false

  flagX = 275;
  offScreen1 = false;

  var x = 50;
  bounce = false;
  for (let i = 0; i < 2; i++) {
    bricks.push(new platformS(x, 179));
    x += 25;
  }
  let x2 = 350;
  for (let i = 0; i < 5; i++) {
    bricks2.push(new platform2(x2));
    x2 += 25;
  }

  /*
  var c1 = 50
  var c2 =  150
  for (let i = 0; i <= 1; i++) {
    marioCoins.push(new coins(c1, c2))
    
  }
  */
  var platX = 150;
  var platY = 130;
  var platX2 = 250;
  for (let i = 0; i < 2; i++) {
    bricks.push(new platformS(platX, platY));
    platX += 25;
  }
  for (let i = 0; i < 3; i++) {
    bricks.push(new platformS(platX2, 90));
    platX2 += 25;
  }
  goombaArray = [];
  questionArray = [];
  questionArray.push(new questionBlock(90 - 20 + 255));
  fireBalls = [];
  defaultM = true;
  fireM = false;
  numberOfFireBalls = [];
  goombaArray.push(new goombas(250));

  // goomba stuff
  goombaX = 250;
  goombaW = 50;
  goombaH = 50;
  goombaY = dirt;
  goombaV = 1;
  goombaHit = false;
  goombaGone = false;
  //flower
  flowerTime = false;
  coinTime = false;
  //scoring
  lives = 3;
  score = 0;
  gameOver = false;
  //fireball
  fireballX = marioX + marioW;
  fireballY = marioY + marioW / 2;
  fireballW = 10;
  fireballH = 10;
  //levels
  levelOne = true;
  levelTwo = false;
}

// the dirts at height-107
function draw() {
  background(backgroundImage);

  //  var x3 = 40
  var x = 50;
  if (offScreen1 === true) {
    for (let i = 0; i < 7; i++) {
      bricks.push(new platformS(x, 179));
      x += 25;
      image(flagPole, 275, 50, 60, 245);
      image(castle, 425, 50, 150, 245);
    }
  }
  //turn levels
  /*if (marioX > width) {
    levelOne = false;
    levelTwo = true;
    marioX = 20;
  }
*/
  for (let i = 0; i < marioCoins.length; i++) {
    const coins2 = marioCoins[i];
    coins2.showself();
    coins2.collides();
  }

  for (let i = 0; i < bricks.length; i++) {
    const block = bricks[i];
    block.showSelf();
    block.collides();
  }
  for (let i = 0; i < bricks2.length; i++) {
    const block2 = bricks2[i];
    block2.showSelf();
    block2.collides();
  }

  for (let i = 0; i < goombaArray.length; i++) {
    const goomba = goombaArray[i];
    goomba.showSelf();
    goomba.moveSelf();
  }

  for (let i = 0; i < questionArray.length; i++) {
    const question = questionArray[i];
    question.showSelf();
    question.collides();
  }

  for (let i = 0; i < numberOfFireBalls.length; i++) {
    const fireball = numberOfFireBalls[i];
    fireball.showSelf();
    fireball.move();
    fireball.collide();
  }

  marioMoves();
  marioFireMoves();
  gravity();
  gameIsOver();
  offScreen();
  flag();
  if (keyIsDown(69) === true) {
    bricks.push(new platformS(mouseX - 24, mouseY - 24));
  } else if (keyIsDown(82) === true) {
    questionArray.push(new questionBlock(mouseX, mouseY));
  }
}

function flag() {
  if (
    collideRectRect(flagX, 50, 60, 345, marioX, marioY, marioW, marioH) &&
    offScreen1 === true
  ) {
    marioX = 275;
    marioY += 1.7;
    marioG = 0;
    backgroundMusic.volume(0);
    setTimeout(flagsound, 1000);
    setTimeout(end1, 3000);
  }
}

function end1() {
  flagX = -100;
  levelcomplete.play();
  levelcomplete.volume(0.1);
  image(marioWalk, marioX, marioY, marioheight, mariowidth);
  marioX += 1.3;
  setTimeout(disappear, 2500);
}

function flagsound() {
  marioFlagPole.play();
  marioFlagPole.volume(0.1);
}

function disappear() {
  marioX = -700;
  marioY = -700;
  
}
function gameIsOver() {
  text(`Lives:${lives}`, 10, 20);
  text(`Score:${score}`, 10, 40);
  if (lives <= 0) {
    textSize(20);
    text("GAMEOVER", width / 2 - 100, height / 2 - 30);
    goombaV = 0;
    gameOver = true;
  }
}

class platformS {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
  }
  showSelf() {
    image(platform, this.x, this.y, this.w, this.h);
    line(
      this.x + 15,
      this.y + this.h / 2,
      this.x + this.w - 15,
      this.y + this.h / 2
    );
  }
  //TEST
  collides() {
    for (let i = 0; i < numberOfFireBalls.length; i++) {
      if (
        collideLineCircle(
          this.x + 15,
          this.y + this.h / 2,
          this.x + this.w - 15,
          this.y + this.h / 2,
          numberOfFireBalls[i].x,
          numberOfFireBalls[i].y,
          10
        )
      ) {
        bounce = true;
      } else {
        bounce = false;
      }
    }
    //TEST

    if (
      collideLineRect(
        this.x + 15,
        this.y + this.h / 2,
        this.x + this.w - 15,
        this.y + this.h / 2,
        marioX,
        marioY,
        marioW,
        marioH
      )
    ) {
      marioG = 3.1;
    } else if (
      collideLineRect(
        this.x + 15,
        this.y + 10,
        this.x + this.w - 5,
        this.y + 10,
        marioX,
        marioY,
        marioW,
        marioH
      )
    ) {
      marioG = 0;
      marioMax = 10;
    }
  }
}

class platform2 {
  constructor(platformX) {
    this.x = platformX;
    this.y = 190;
    this.w = 50;
    this.h = 50;
  }
  showSelf() {
    image(platform, this.x, this.y, this.w, this.h);
  }
  collides() {
    if (
      collideLineRect(
        this.x + 15,
        this.y + this.h / 2,
        this.x + this.w - 15,
        this.y + this.h / 2,
        marioX,
        marioY,
        marioW,
        marioH
      )
    ) {
      marioG = 3.1;
    } else if (
      collideLineRect(
        this.x + 15,
        this.y + 10,
        this.x + this.w - 5,
        this.y + 10,
        marioX,
        marioY,
        marioW,
        marioH
      )
    ) {
      marioG = 0;
      marioMax = 10;
    }
  }
}

class questionBlock {
  constructor(x, y) {
    this.x = x;
    this.y = 71 + 18;
    this.w = 51;
    this.h = 51;
    this.flowerY = 115;
    this.flowerX = this.x + 15;
    this.flowerW = 5;
    this.flowerH = 5;
  }
  showSelf() {
    if (flowerTime === false) {
      image(fireFlower, this.flowerX, this.flowerY, this.flowerW, this.flowerH);
    }
    image(questionBlockImage, this.x, this.y, this.w, this.h);
  }
  collides() {
    if (
      collideRectRect(
        this.flowerX,
        this.flowerY,
        this.flowerW,
        this.flowerH,
        marioX,
        marioY,
        marioW,
        marioH
      ) &&
      flowerTime === false
    ) {
      fireM = true;
      powerup.play();
      powerup.volume(0.1);
      setTimeout(flowerDisappear, 100);
      image(fireMario, marioX, marioY, fireMarioW, fireMarioH);
      defaultM = false;
    }
    if (
      collideRectRect(
        this.x + 11,
        this.y + 25,
        this.w - 10,
        this.h - 40,
        marioX,
        marioY,
        marioW,
        marioH
      )
    ) {
      powerappearsound.play();
      powerappearsound.volume(0.1);
      marioG = 3.1;
      this.flowerW = 20;
      this.flowerH = 20;
      this.flowerY = 115 - 37;
    } else if (
      collideRectRect(
        this.x + 5,
        this.y + 10,
        this.w - 10,
        this.h - 45,
        marioX,
        marioY,
        marioW,
        marioH
      )
    ) {
      marioG = 0;
      marioMax = 0;
    }
  }
}

function flowerDisappear() {
  flowerTime = true;
}

function coinDisappear() {
  coinTime = true;
}

class goombas {
  constructor(x) {
    this.x = x;
    this.y = dirt;
    this.w = 50;
    this.h = 50;
    this.v = 1.5;
  }

  showSelf() {
    if (goombaHit === false && goombaGone === false) {
      image(goomba, this.x, this.y, this.w, this.h);
    } else if (goombaHit === true && goombaGone == false) {
      image(goombaStomped, this.x, this.y, this.w, this.h);
      goombaStomp.play();
      goombaStomp.volume(0.5);
      score = 100;
      this.v = 0;
      setTimeout(goombaTime, 1000);
    }
  }

  moveSelf() {
    this.x += this.v;
    if (this.x > width || this.x < 0 + 20 + marioW) {
      this.v *= -1;
    }
    if (gameOver === true) {
      this.v = 0;
    }
    if (
      collideLineRect(
        this.x + 15,
        this.y + this.h / 2,
        this.x + this.w - 15,
        this.y + this.h / 2,
        marioX,
        marioY,
        marioW,
        marioH
      ) &&
      goombaGone === false &&
      fireM === true
    ) {
      fireM = false;
      marioX = this.x - 150;
      defaultM = true;
      goombaV *= -1.5;

      goombaHit = false;
    } else if (
      collideLineRect(
        this.x + 15,
        this.y + this.h / 2,
        this.x + this.w - 15,
        this.y + this.h / 2,
        marioX,
        marioY,
        marioW,
        marioH
      ) &&
      goombaGone === false
    ) {
      lives -= 1;
      marioX = 20;
      marioY = dirt;
      goombaV *= -1.5;

      goombaHit = false;
    } else if (
      collideRectRect(
        this.x,
        this.y - 10,
        50,
        10,
        marioX,
        marioY + marioW - 10,
        marioW,
        20
      ) &&
      goombaGone == false
    ) {
      goombaHit = true;
      marioY -= 50;
      marioX += 20;
    }
  }
}

function goombaTime() {
  goombaHit = false;
  goombaGone = true;
}

function marioMoves() {
  marioY += marioG;
  if (
    keyIsDown(UP_ARROW) &&
    keyIsDown(RIGHT_ARROW) &&
    defaultM === true &&
    !gameOver
  ) {
    marioY -= 3;
    marioX += 1.6;
    movement = true;
    jumpSound.play();
    jumpSound.volume(0.03);
    image(marioJump, marioX, marioY, marioheight, mariowidth);
  } else if (
    keyIsDown(UP_ARROW) &&
    keyIsDown(LEFT_ARROW) &&
    defaultM === true &&
    !gameOver
  ) {
    marioY -= 3;
    marioX -= 1.6;
    movement = true;
    jumpSound.play();
    jumpSound.volume(0.03);
    image(marioJump, marioX, marioY, marioheight, mariowidth);
  } else if (keyIsDown(RIGHT_ARROW) && defaultM === true && !gameOver) {
    marioX += 1.6;
    movement = true;
    image(marioWalk, marioX, marioY, marioheight, mariowidth);

    //background(backgroundImage);
  } else if (keyIsDown(LEFT_ARROW) && defaultM === true && !gameOver) {
    marioX -= 1.6;
    movement = true;
    image(marioWalk, marioX, marioY, marioheight, mariowidth);
    //background(backgroundImage);
  } else if (keyIsDown(UP_ARROW) && defaultM === true && !gameOver) {
    marioY -= 3;
    movement = true;
    jumpSound.play();
    jumpSound.volume(0.03);

    image(marioJump, marioX, marioY, marioheight, 50);
    //background(backgroundImage);
  } else {
    movement = false;
  }

  if (movement === false && defaultM === true) {
    image(marioStand, marioX, marioY, marioheight, mariowidth);
  }

  if (marioY > dirt) {
    marioY = dirt;
    marioMax = 100;
  }
}

function marioFireMoves() {
  //marioY += marioG;
  if (
    keyIsDown(UP_ARROW) &&
    keyIsDown(RIGHT_ARROW) &&
    fireM === true &&
    !gameOver
  ) {
    marioY -= 3;
    marioX += 1.6;
    jumpSound.play();
    jumpSound.volume(0.03);
    movement = true;
    image(marioJump, marioX, marioY, marioheight, mariowidth);
  } else if (
    keyIsDown(UP_ARROW) &&
    keyIsDown(LEFT_ARROW) &&
    fireM === true &&
    !gameOver
  ) {
    marioY -= 3;
    marioX -= 1.6;
    jumpSound.play();
    movement = true;
    jumpSound.volume(0.03);
    image(marioJump, marioX, marioY, marioheight, mariowidth);
  } else if (keyIsDown(RIGHT_ARROW) && fireM === true && !gameOver) {
    marioX += 1.6;
    movement = true;
    image(fireMarioRun, marioX, marioY, marioheight, mariowidth);
  } else if (keyIsDown(LEFT_ARROW) && fireM === true && !gameOver) {
    marioX -= 1.6;
    movement = true;
    image(fireMarioRun, marioX, marioY, marioheight, mariowidth);
  } else if (keyIsDown(UP_ARROW) && fireM === true && !gameOver) {
    marioY -= 3;
    movement = true;
    jumpSound.play();
    jumpSound.volume(0.03);

    image(marioJump, marioX, marioY, marioheight, 50);
  } else {
    movement = false;
  }

  if (movement === false && fireM === true) {
    image(fireMario, marioX, marioY, fireMarioW, fireMarioH);
  }

  if (marioY > dirt) {
    marioY = dirt;
    marioMax = 100;
  }
}

function keyPressed() {
  if (keyCode === 32 && fireM === true) {
    numberOfFireBalls.push(new fireballz());
    fireballSound.play();
    fireballSound.volume(0.1);
  }
}

function marioImage() {
  if (marioY < dirt) {
    image(marioJump, marioX, marioY, marioheight, mariowidth);
  }
}

function gravity() {
  if (marioY === dirt) {
    marioG = 0;
    marioY = dirt;
  }
  if (marioY <= marioMax) {
    marioG = 6.2;
  } else if (
    marioY <= 242 &&
    keyIsDown(UP_ARROW) === false &&
    goombaHit === false
  ) {
    marioG = 3.1;
  }
}

function canvasPressed() {
  backgroundMusic.play();
  backgroundMusic.volume(0.04);
}

class fireballz {
  constructor() {
    this.x = marioX;
    this.y = marioY + 20;
    this.w = 10;
    this.h = 10;
    //this.number
    this.speed = 2;
    this.fallspeed = 0;
  }
  move() {
    if (fireM) {
      this.x += this.speed;
      this.y += this.fallspeed;
      if (this.y < dirt + 35) {
        this.fallspeed += 1;
      } else if (this.y > dirt + 35) {
        // this.fallspeed += 1;
        this.fallspeed *= -1;
      } else if (this.y > dirt + 30) {
        //this.fallspeed *= -1;
      }
    }

    if (bounce === true) {
      this.fallspeed *= -1;
    }
  } //goombaArray[0].x
  collide() {
    //numberOfFireBalls[1].x
    //fireballs[]

    for (let i = 0; i < numberOfFireBalls.length; i++) {
      const fireball = numberOfFireBalls[i];
      hit = collideCircleCircle(
        fireball.x,
        fireball.y,
        40,
        goombaArray[0].x,
        goombaArray[0].y,
        45
      );
    }

    //hit = collideCircleCircle(
    //  this.x,
    // this.y,
    // 40,
    // goombaArray[0].x,
    // goombaArray[0].y,
    // 45
    //);

    if (hit) {
      goombaHit = true;
      goombaStomp.play();
      goombaStomp.volume(0.5);
    } else {
      //goombaHit = false;
    }
  }
  // I CANT TURN ON
  showSelf() {
    if (fireM) {
      image(shootBall, this.x, this.y, this.w, this.h);
    }
  }
}

function offScreen() {
  if (marioX > width || marioY > width) {
    offScreen1 = true;
    questionArray[0].x = -100;
    bricks2[0].x = -1000;
    bricks2[1].x = -1000;
    bricks2[2].x = -1000;
    bricks2[3].x = -1000;
    bricks2[4].x = -1000;
    bricks[3].x = -1000;
    bricks[4].x = -1000;
    bricks[5].x = -1000;
    bricks[6].x = -1000;
    bricks[2].x = -1000;
    goombaArray[0].x;

    marioX = 10;
  }
}

class coins {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
  }

  showself() {
    if (coinTime === false) {
      image(coin, this.x, this.y, this.w, this.h);
    }
  }
  collides() {
    if (
      collideRectRect(
        this.x,
        this.y,
        this.w,
        this.h,
        marioX,
        marioY,
        marioW,
        marioH && coinTime == false
      )
    ) {
      setTimeout(coinDisappear, 0.01);
      score = score + 100;
    }
  }
}
