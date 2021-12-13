const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

const { HilbertAlgorithm } = require("../dist/lib/es5/hilbertAlgorithm");

// add tests
suite
  .add("Hilbert Order 2", function () {
    const h = new HilbertAlgorithm(2);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 3", function () {
    const h = new HilbertAlgorithm(3);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 4", function () {
    const h = new HilbertAlgorithm(4);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 5", function () {
    const h = new HilbertAlgorithm(5);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 6", function () {
    const h = new HilbertAlgorithm(6);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 7", function () {
    const h = new HilbertAlgorithm(7);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 8", function () {
    const h = new HilbertAlgorithm(8);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 9", function () {
    const h = new HilbertAlgorithm(9);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 10", function () {
    const h = new HilbertAlgorithm(10);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 11", function () {
    const h = new HilbertAlgorithm(11);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 12", function () {
    const h = new HilbertAlgorithm(12);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 13", function () {
    const h = new HilbertAlgorithm(13);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 14", function () {
    const h = new HilbertAlgorithm(14);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 15", function () {
    const h = new HilbertAlgorithm(15);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 16", function () {
    const h = new HilbertAlgorithm(16);
    h.indexToPoint(0);
  })
  .add("Hilbert Order 2 - Reverse", function () {
    const h = new HilbertAlgorithm(2);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 3 - Reverse", function () {
    const h = new HilbertAlgorithm(3);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 4 - Reverse", function () {
    const h = new HilbertAlgorithm(4);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 5 - Reverse", function () {
    const h = new HilbertAlgorithm(5);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 6 - Reverse", function () {
    const h = new HilbertAlgorithm(6);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 7 - Reverse", function () {
    const h = new HilbertAlgorithm(7);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 8 - Reverse", function () {
    const h = new HilbertAlgorithm(8);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 9 - Reverse", function () {
    const h = new HilbertAlgorithm(9);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 10 - Reverse", function () {
    const h = new HilbertAlgorithm(10);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 11 - Reverse", function () {
    const h = new HilbertAlgorithm(11);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 12 - Reverse", function () {
    const h = new HilbertAlgorithm(12);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 13 - Reverse", function () {
    const h = new HilbertAlgorithm(13);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 14 - Reverse", function () {
    const h = new HilbertAlgorithm(14);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 15 - Reverse", function () {
    const h = new HilbertAlgorithm(15);
    h.pointToIndex({ x: 0, y: 0 });
  })
  .add("Hilbert Order 16 - Reverse", function () {
    const h = new HilbertAlgorithm(16);
    h.pointToIndex({ x: 0, y: 0 });
  })
  // add listeners
  .on("cycle", function (event: any) {
    console.log(String(event.target));
  })
  .run();
