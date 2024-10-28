let verse;
let words = [];
let exploded = false;
let sunPositions = [];
let sunEmojis = [];
let explodeImage;

function preload() {
  verse = loadStrings('verse.txt');
  explodeImage = loadImage('explode.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Great Vibes');
  textAlign(CENTER, CENTER);

  verse = join(verse, ' ');
  
  words = verse.split(' ');
}

function draw() {
  if (!exploded) {
    background(200);
    fill(0);
    let middleIndex = Math.floor(words.length / 2);
    let firstLine = words.slice(0, middleIndex).join(' ');
    let secondLine = words.slice(middleIndex).join(' ');
    textSize(60);
    text(firstLine, width / 2, height / 2 - 40);
    text(secondLine, width / 2, height / 2);

    push();
    textSize(100);
    text('💣', width / 2, height / 2 + 100);
    pop();

  } else {

    background(explodeImage);

    for (let i = 0; i < words.length; i++) {
      fill(0);
      push(); 
      textSize(60);
      text(words[i], sunPositions[i].x, sunPositions[i].y);
      pop();
    }

    for (let i = 0; i < sunEmojis.length; i++) {
      textSize(60);
      text('☀️', sunEmojis[i].x, sunEmojis[i].y);
    }
  }
}

function mousePressed() {
  
  if (!exploded) {
    exploded = true;
    sunPositions = []; 

    
    for (let i = 0; i < words.length; i++) {
      let x = random(width * 0.1, width * 0.9);
      let y = random(height * 0.1, height * 0.9);
      sunPositions.push(createVector(x, y));
    }
  } else {
    
    for (let i = 0; i < sunPositions.length; i++) {
      let d = dist(mouseX, mouseY, sunPositions[i].x, sunPositions[i].y);
      if (d < 50) { 

        for (let j = 0; j < 4; j++) { 
          let x = random(width);
          let y = random(height);
          sunEmojis.push(createVector(x, y));
        }

      }
    }
  }
}
