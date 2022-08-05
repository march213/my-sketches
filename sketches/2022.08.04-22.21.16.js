const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ width, height }) => {
  const cols = 24;
  const rows = 24;
  const numCells = cols * rows;

  // grid
  const gw = width * 0.8;
  const gh = height * 0.8;

  // cell
  const cw = gw / cols;
  const ch = gh / rows;

  // margin
  const mx = (width - gw) * 0.5;
  const my = (height - gh) * 0.5;

  const points = [];

  let x, y;

  for (let i = 0; i < numCells; i++) {
    x = (i % cols) * cw;
    y = Math.floor(i / cols) * ch;

    points.push(new Point({ x, y }));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(mx, my);
    context.translate(cw * 0.5, ch * 0.5);
    context.strokeStyle = "gray";
    context.lineWidth = 4;

    // draw lines
    for (let r = 0; r < rows; r++) {
      context.beginPath();

      for (let c = 0; c < cols; c++) {
        const point = points[r * cols + c];

        if (!c) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }

      context.stroke();
    }

    points.forEach((point) => {
      point.draw(context);
    });

    context.restore();
  };
};

class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = "black";

    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

canvasSketch(sketch, settings);