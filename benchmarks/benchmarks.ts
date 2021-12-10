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
  // add listeners
  .on("cycle", function (event: any) {
    console.log(String(event.target));
  })
  .run();
