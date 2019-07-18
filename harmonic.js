class Harmonic {
  constructor(id, wheel) {
    this.id = id;
    this.wheel = wheel;
    this.width = width / (harmonicCount-1);
    this.height = height - horiSplit;
    this.x = id * this.width;
    this.y = horiSplit;
    this.amp = wheel.radius / wheelSize;
    this.selected = false;
  }
  
  update() {
    if (this.selected) {
      this.amp = (height-mouseY) / this.height;
      this.amp = limit(this.amp, 0, 1);
      this.wheel.updateAmp(this.amp);
    }
  }
  
  draw() {
    stroke(200, 230, 255);
    noFill();
    rect(this.x, 
         this.y + this.height - (this.height * this.amp), 
         this.width, 
         height);
    
    let textRow = this.y + 20;
    noStroke();
    fill(200, 230, 255);
    textAlign(CENTER);
    textSize(15);
    text('1', 
         this.x + this.width/2, textRow);
    text('_', 
         this.x + this.width/2, textRow + 5);
    text((this.id+1), 
         this.x + this.width/2, textRow + 24);
  }
}
