const rad = Math.PI / 180;
let rid = null;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = (canvas.width = window.innerWidth),
  cx = cw / 2;
let ch = (canvas.height = window.innerHeight),
  cy = ch / 2;

let balloons = [];
let balloonsMaxNum = 20;

ctx.strokeStyle = "AliceBlue";
ctx.lineCap = "round";

class Shape {
  constructor(o) {
    this.x = o.x;
    this.X = o.x;
    this.y = o.y;
    this.w = o.r * 2;
    this.h = o.r * 2;
    this.angle = o.angle || 90 - Math.random() * 180;
    this.cx = this.w / 2; //center x
    this.cy = this.h / 2; //center x
    // for the update
    this.amplitude = 10 + Math.random() * 20;
    this.frequency = Math.random() * 0.025;
    this.start = Math.random() * Math.PI;
    this.speed = 0.5 + Math.random();
    // for the hatch
    this.angleDeviation = o.angleDeviation || 1 / (~~(Math.random() * 20) + 5);
    this.lineWidth = ~~(Math.random() * 3) + 1;

    this.spacing = o.spacing || this.lineWidth * 3;
    this.hatching = new Hatch({
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      angle: this.angle % 45,
      spacing: this.spacing,
      angleDeviation: this.angleDeviation,
    });
    this.circle = new hdCircle({ r: o.r });
  }
  draw() {
    this.hatching.update();
    ctx.lineWidth = this.lineWidth;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x + this.cx, this.y + this.cy, this.circle.r, 0, 2 * Math.PI);
    ctx.clip();
    this.hatching.draw({ x: this.x, y: this.y });
    ctx.restore();

    this.circle.draw({ x: this.x + this.cx, y: this.y + this.cy });
  }
  update() {
    if (this.y > -this.h - this.circle.lineLength) {
      this.y -= this.speed;
    } else {
      this.y = ch + this.h;
      let newXPos = Math.random() * cw;
      this.x = newXPos;
      this.X = newXPos;
    }
    this.x =
      Math.sin(this.y * this.frequency + this.start) * this.amplitude + this.X;
  }
} //Shape

class Hatch {
  // the pattern size is the size of the bounding box of the shape
  constructor(o) {
    this.x = o.x;
    this.y = o.y;
    this.w = o.w;
    this.h = o.h;
    this.spacing = o.spacing;
    this.angleDeviation = o.angleDeviation;
    this.cx = this.w / 2; //center x
    this.cy = this.h / 2; //center x
    // max size of the lines == .5 * diagonal of the BBox
    this.r = 0.5 * Math.sqrt(this.w * this.w + this.h * this.h);
    this.angle = ((o.angle * rad) % Math.PI) / 2;
    // extra hatching outside the BBox
    this.extra = 0.5 * this.w * Math.tan(this.angle);
    if (this.angle < 0) {
      this.extra *= -1;
    }

    this.points = [];
    this.getPoints();
  }
  getPoints() {
    for (
      let y = /*this.y */ -this.extra;
      y < /*this.y +*/ this.h + this.extra;
      y += this.spacing
    ) {
      let a = this.angle + (0.5 - Math.random()) * this.angleDeviation;
      let dy = 0.5 - Math.random(); // y deviation
      let dx = (0.5 - Math.random()) * 5; // x deviation

      this.hatch({ x: this.cx + dx, y: y + dy }, a);
      this.hatch({ x: this.cx + dx, y: y + dy }, a + Math.PI);
    }
  }
  hatch(point, angle) {
    let x = point.x + this.r * Math.cos(angle);
    let y = point.y + this.r * Math.sin(angle);
    this.points.push(x);
    this.points.push(y);
  }
  draw(c) {
    for (let i = 0; i < this.points.length; i += 4) {
      ctx.beginPath();
      ctx.moveTo(c.x + this.points[i], c.y + this.points[i + 1]);
      ctx.lineTo(c.x + this.points[i + 2], c.y + this.points[i + 3]);
      ctx.stroke();
    }
  }

  update() {
    if (this.y < -this.h - this.extra - 150) {
      this.y = ch + this.h + this.extra;
    }
    this.y--;
  }
} //Hatch

class hdCircle {
  // hand drawn circle
  constructor(o) {
    this.r = o.r;
    this.lineLength = 50 + Math.random() * 70;
    this.circlePoints = [];
    this.stringPoints = [0, o.r];
    this.getPoints();
  }
  getPoints() {
    for (let a = -70; a < 720 - 70; a += 20) {
      let _x = this.r * Math.cos(a * rad) + Math.random() * 4;
      let _y = this.r * Math.sin(a * rad) + Math.random() * 4;
      this.circlePoints.push(_x);
      this.circlePoints.push(_y);
    }
    for (let i = 0; i < this.lineLength; i += 20) {
      let _x = this.stringPoints[0] + (4 - Math.random() * 8);
      let _y = this.stringPoints[1] + i + (4 - Math.random() * 8);
      this.stringPoints.push(_x);
      this.stringPoints.push(_y);
    }
  }
  draw(c) {
    ctx.beginPath();
    ctx.moveTo(c.x + this.circlePoints[0], c.y + this.circlePoints[1]);
    for (let i = 2; i < this.circlePoints.length; i += 2) {
      ctx.lineTo(c.x + this.circlePoints[i], c.y + this.circlePoints[i + 1]);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(c.x + this.stringPoints[0], c.y + this.stringPoints[1]);
    for (let i = 2; i < this.stringPoints.length; i += 2) {
      ctx.lineTo(c.x + this.stringPoints[i], c.y + this.stringPoints[i + 1]);
    }
    ctx.stroke();
  }
} // hdCircle

let balloon = new Shape({
  x: 50,
  y: ch + 50,
  r: 50,
  angle: -45,
  spacing: 5,
  angleDeviation: 1 / 5,
});
balloons.push(balloon);

let frames = 0;

function Draw() {
  frames++;
  if (frames % 70 == 0 && balloons.length < balloonsMaxNum) {
    let r = 10 + ~~(Math.random() * 15);
    balloons.push(
      new Shape({
        x: Math.random() * cw,
        y: ch + r,
        r: r * 2,
      })
    );
  }
  rid = requestAnimationFrame(Draw);
  ctx.clearRect(0, 0, cw, ch);
  balloons.map((b) => {
    b.update();
    b.draw();
  });
}

function Init() {
  if (rid) {
    window.cancelAnimationFrame(rid);
    rid = null;
  }
  (cw = canvas.width = window.innerWidth), (cx = cw / 2);
  (ch = canvas.height = window.innerHeight), (cy = ch / 2);
  ctx.strokeStyle = "black";
  ctx.lineCap = "round";
  Draw();
}

setTimeout(function () {
  Init();
  window.addEventListener("resize", Init, false);
}, 15);
