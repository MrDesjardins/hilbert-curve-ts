[![Build, Test and Coverage](https://github.com/MrDesjardins/hilbert-curve-ts/actions/workflows/action.yml/badge.svg)](https://github.com/MrDesjardins/hilbert-curve-ts/actions/workflows/action.yml)
[![codecov](https://codecov.io/gh/MrDesjardins/hilbert-curve-ts/branch/master/graph/badge.svg?token=0HGGX9Z9OW)](https://codecov.io/gh/MrDesjardins/hilbert-curve-ts)

# Hilbert Curve Algorithm

This library is a port of the [Hilbert Curve algorithm from Wikipedia](https://en.wikipedia.org/wiki/Hilbert_curve). 


> The library is not a drawing library, hence if you want to generate a visual for the value you will need to take the output of the algorithm and use another drawing library.

# Goal

The goal of this library is to map a 1d array to a 2d array in a continious fractal space-filling way. The library also perform the opposite of bringing a 2d coordinate back to a 1d array.

# Extra

The library has two function that allows to offset the coordinate and bringing it back to its original values. The offset feature allows to bring the coordinate into a bigger scale. For example, to drawa 4x4 grid (Hilbert Curve of order 2) to a 1024x1024 canvas pixel size.

# How to use?

## Constructor

Call the constructor and specify the order. The order is strongly typed allowing specific order from 1 to 16.

```
const h = new HilbertAlgorithm(2);
```

## 1d to 2d

The function `indexToPoint` brings an index to a specific coordinate. The goal is not to set a value to the coordinate but to compute where a specific index is located in a 2d space. The set a value, for example a color or a number you would read the value from your array at that index and set the value to the computed coordinate.

```
const h = new HilbertAlgorithm(2);
const point = ha.indexToPoint(1); //x = 0, y = 1
```

In the code above, if you have an array of `["Test"1, "Test2"]` then you would put the `Test2` string at the coordinate `(0,1)`.

## 2d to 1d

The function `pointToIndex` is the reverse of `indexToPoint`. It takes a point and return the position in 1d.

```
const h = new HilbertAlgorithm(2);
const index = ha.pointToIndex({ x: 0, y: 1 }); // 1
```

The function can be useful if you need to map something in a 2d space (latitude, longitude) into a single space (1d array).

## Offset

The result of `indexToPoint` is a grid of coordinate that are all close to each other. For example `const h = new HilbertAlgorithm(2);` produce an array of 4 by 4 :

```
0,0
0,1
0,2
0,3
1,0
1,1
1,2
1,3
2,0
2,1
2,2
2,3
3,0
3,1
3,2
3,3
```

In your application, you might want to distance the point to draw into a canvas and have each cell 10 pixel wide and high. Thus, it is possible to call `offsetPoint` on a point to get the data projected properly. The parameter of `offsetPoint` is the expected grid width (and height) because it is a square. Hence, called `offsetPoint({x:3, y:3}, 40)` gives `{x: 35, y: 35}`. The reason is that we have 4 cells by 4 cells with a width of 40 hence each cell being 10x10 pixel. The coordinate produced is the center of the cell. Since the `(3,3)` points if the last cell it means it spans from 30 to 40 in each direction with a center point at `35,35`.

The opposite is possible as well using `deoffsetPoint`. `deoffsetPoint` takes a point, for example `{x:35, y:35}` and gives back the point `{x:3, y:3}`.

# Examples

Here is an example where we are using the Hilbert Curve with an order of `3` where we draw the index into a 2d HTML Canvas.

```
<html>
  <body>
    <canvas id="myCanvas" width="40" height="40" style="border: 1px solid #000000;"></canvas>
    <script src="index.js"></script>
  </body>
</html>
```

Each cell is a point. To make it better, the example relies on the offset function.

```
const width = 1024;
const c = document.getElementById("myCanvas");
c.width = width;
c.height = c.width;
const ctx = c.getContext("2d");

const h = new HilbertAlgorithm(3);

for (let i = 0; i < totalVertex; i++) {
  vertexCoordinate[i] = h.indexToPoint(i); // 1d to 2d
  vertexCoordinate[i] = h.offsetPoint(vertexCoordinate[i], width);
}

draw();
let debouncing = false;
document.getElementById("myCanvas").addEventListener("mousemove", function (e) {
  if (!debouncing) {
    debouncing = true;
    setTimeout(function () {
      const x = e.clientX;
      const y = e.clientY;

      console.log(h.deoffsetPoint({ x: x, y: y }, width));
      console.log(h.pointToIndex(h.deoffsetPoint({ x: x, y: y })));
      debouncing = false;
    }, 200);
  }
});

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  // Draw the quadrant
  ctx.beginPath();
  for (let i = 1; i < numberOfRows; i++) {
    // Draw horizontal lines

    ctx.strokeStyle = "rgba(100,100,100, 0.2)";
    ctx.moveTo(0, i * len);
    ctx.lineTo(width, i * len);

    // Draw vertical lines
    ctx.moveTo(i * len, 0);
    ctx.lineTo(i * len, width);
  }

  // Draw edge between vertex
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  for (let i = 1; i < totalVertex; i++) {
    ctx.moveTo(vertexCoordinate[i].x, vertexCoordinate[i].y);
    ctx.lineTo(vertexCoordinate[i - 1].x, vertexCoordinate[i - 1].y);
  }
  ctx.stroke();

  // Dot
  if (order < 8) {
    for (let i = 0; i < totalVertex; i++) {
      ctx.beginPath();
      ctx.arc(
        vertexCoordinate[i].x,
        vertexCoordinate[i].y,
        3,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = "rgba(250, 105, 255, 0.7)";
      ctx.fill();
    }
  }

  // Text
  if (order < 5) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    for (let i = 0; i < vertexCoordinate.length; i++) {
      ctx.fillText(i, vertexCoordinate[i].x + 5, vertexCoordinate[i].y + 5); // Offset the text a little bit from the vertex
    }
  }
}
```

![](documentationAssets/hilbert_curve_order3.png)

When the user mouse over the grid, the console writes the value (index) and the coordinate. This is possible using the offset functions.
