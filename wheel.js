class Wheel {
  constructor(r, freq) {
    this.end = this.calcEnd();
    this.origin = wheelPos;
    this.radius = r;
    this.angle = 0;
    this.freq = freq;
    this.child;
  }
  
  update() {
    if (this.child) {
      this.origin = this.child.end;
    }
    this.end = this.calcEnd();
    
    this.angle += spinSpeed / this.freq;
  }
  
  draw() {
    stroke(255, 100);
    noFill();
    strokeWeight(2);
    ellipse(this.origin.x, 
            this.origin.y, 
            this.radius*2, 
            this.radius*2);
    stroke(255, 200);
    line(this.origin.x, 
         this.origin.y,
         this.end.x,
         this.end.y);
  }
  
  calcEnd() {
    let x = cos(this.angle);
    let y = sin(this.angle);
    let end = createVector(x, y);
    if (this.radius < Infinity)
      end.mult(this.radius);
    end.add(this.origin);
    return end;
  }
  
  attachChild(child) {
    this.child = child;
  }
  
  updateAmp(amp) {
    this.radius = wheelSize * amp;
  }
}

