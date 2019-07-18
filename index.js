let wheels = [];
let wavePts = [];
let buttons = [];
let harmonics = [];
const harmonicCount = 15;
const scrollSpeed = 2;
const spinSpeed = 0.06;
let wheelSize;
let wheelPos;
let vertSplit, horiSplit, textLevel;
let selectedHarmonic;

function setup() {
  createCanvas(window.innerWidth-6, 
               window.innerHeight-6);
  vertSplit = width/3;
  horiSplit = height/2;
  wheelPos = createVector(vertSplit/3, horiSplit/2);
  textLevel = height*0.9;
  wheelSize = vertSplit * 0.2;
  
  for (let i = 0; i < harmonicCount; i++) {
    let factor = wheels.length;
    let newWheel = new Wheel(
      wheelSize/factor + 1, 
      1/factor);
    newWheel.attachChild(wheels[factor-1]);
    wheels.push(newWheel);
    harmonics.push(new Harmonic(i-1, newWheel));
  }
  harmonics.splice(0, 1);
}

function draw() {
  background(40);
  renderHarmonics();
  renderWheel();
  let end = wheels[wheels.length-1].end;
  createWave(end);
  //Line from last wheel to wave
  if (end.x < vertSplit)
    line(end.x, end.y, vertSplit, end.y);
  renderWave();
  
  //Draw split points
  stroke(200, 230, 255, 100);
  line(vertSplit, 0, vertSplit, horiSplit);
  line(0, horiSplit, width, horiSplit);
}

//Factories
function createWave(end) {
  //Create wave points
  if (wheels.length > 0) {
    wavePts.push(createVector(
      vertSplit, 
      end.y
    ));
  }
}

//Rendering
function renderWheel() {
  fill(40);
  noStroke();
  rect(0, 0, vertSplit, horiSplit);
  
  wheels.forEach(wheel => {
    wheel.update();
    wheel.draw();
  });
  stroke(200, 230, 255, 100);
}

function renderWave() {
  fill(40);
  noStroke();
  rect(vertSplit, 0, width, horiSplit);
  
  stroke(255);
  noFill();
  //Draw the wave
  beginShape();
  wavePts.forEach(pt => {
    vertex(pt.x, pt.y);
    //Scroll to the right
    pt.x += scrollSpeed;
  });
  wavePts = wavePts.filter(pt => pt.x < width);
  endShape();
}

function renderHarmonics() {
  fill(40);
  noStroke();
  rect(0, horiSplit, width, height);
  harmonics.forEach(harmonic => {
    harmonic.update();
    harmonic.draw();
  });
}

//Input Handling
function mousePressed() {
  let clickThresh = 30;
  if (mouseY > horiSplit) {
    //Clicked a harmonic
    for (let i = 0; i < harmonics.length; i++) {
      let harmonic = harmonics[i];
      if (mouseX > harmonic.x &&
          mouseX < harmonic.x + harmonic.width) {
        selectedHarmonic = harmonic;
        harmonic.selected = true;
        break;
      }
    }
  }
}

function mouseReleased() {
  selectedHarmonic.selected = false;
  selectedHarmonic = undefined;
}

//Util
function limit(x, min, max) {
  if (x < min) x = min;
  else if (x > max) x = max;
  return x;
}