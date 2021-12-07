import {
  ColumnsForOrder,
  HilbertAlgorithm,
  Point,
  PointValue,
  PointWithPixelValue,
} from "./hilbertAlgorithm";

describe(HilbertAlgorithm.name, () => {
  describe("constructor", () => {
    it("instanciates", () => {
      new HilbertAlgorithm(1);
    });
  });
  describe("indexToPoint", () => {
    let ha = new HilbertAlgorithm(2);
    it("Negative index", () => {
      expect(() => {
        ha.indexToPoint(-1);
      }).toThrow();
    });

    describe("first order", () => {
      let ha = new HilbertAlgorithm(1);
      it("has index 0 to point (0,0)", () => {
        const point = ha.indexToPoint(0);
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
      });
      it("has index 1 to point (0,1)", () => {
        const point = ha.indexToPoint(1);
        expect(point.x).toBe(0);
        expect(point.y).toBe(1);
      });
      it("has index 2 to point (1,1)", () => {
        const point = ha.indexToPoint(2);
        expect(point.x).toBe(1);
        expect(point.y).toBe(1);
      });
      it("has index 3 to point (1,0)", () => {
        const point = ha.indexToPoint(3);
        expect(point.x).toBe(1);
        expect(point.y).toBe(0);
      });
      describe("requests for an index above the supported size", () => {
        it("throws an exception", () => {
          expect(() => {
            ha.indexToPoint(4);
          }).toThrow();
        });
      });
    });

    describe("second order", () => {
      let ha = new HilbertAlgorithm(2);
      it("has index 0 to point (0,0)", () => {
        const point = ha.indexToPoint(0);
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
      });
      it("has index 1 to point (1,0)", () => {
        const point = ha.indexToPoint(1);
        expect(point.x).toBe(1);
        expect(point.y).toBe(0);
      });
      it("has index 2 to point (1,1)", () => {
        const point = ha.indexToPoint(2);
        expect(point.x).toBe(1);
        expect(point.y).toBe(1);
      });
      it("has index 7 to point (1,2)", () => {
        const point = ha.indexToPoint(7);
        expect(point.x).toBe(1);
        expect(point.y).toBe(2);
      });
      it("has index 11 to point (3,2)", () => {
        const point = ha.indexToPoint(11);
        expect(point.x).toBe(3);
        expect(point.y).toBe(2);
      });
      it("has index 15 to point (0,3)", () => {
        const point = ha.indexToPoint(15);
        expect(point.x).toBe(3);
        expect(point.y).toBe(0);
      });
      describe("requests for an index above the supported size", () => {
        it("throws an exception", () => {
          expect(() => {
            ha.indexToPoint(16);
          }).toThrow();
        });
      });
    });

    describe("third order", () => {
      let ha = new HilbertAlgorithm(3);
      it("has index 0 to point (0,0)", () => {
        const point = ha.indexToPoint(0);
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
      });
      it("has index 1 to point (0,1)", () => {
        const point = ha.indexToPoint(1);
        expect(point.x).toBe(0);
        expect(point.y).toBe(1);
      });
      it("has index 2 to point (1,1)", () => {
        const point = ha.indexToPoint(2);
        expect(point.x).toBe(1);
        expect(point.y).toBe(1);
      });
      it("has index 7 to point (2,1)", () => {
        const point = ha.indexToPoint(7);
        expect(point.x).toBe(2);
        expect(point.y).toBe(1);
      });
      it("has index 11 to point (2,3)", () => {
        const point = ha.indexToPoint(11);
        expect(point.x).toBe(2);
        expect(point.y).toBe(3);
      });
      it("has index 15 to point (0,3)", () => {
        const point = ha.indexToPoint(15);
        expect(point.x).toBe(0);
        expect(point.y).toBe(3);
      });
      describe("requests for an index above the supported size", () => {
        it("throws an exception", () => {
          expect(() => {
            ha.indexToPoint(64);
          }).toThrow();
        });
      });
    });
  });

  describe("pointToIndex", () => {
    describe("first order", () => {
      let ha = new HilbertAlgorithm(1);
      it("has point (0,0) to index 0", () => {
        const index = ha.pointToIndex({ x: 0, y: 0 });
        expect(index).toBe(0);
      });
      it("has point (0,1) to index 1", () => {
        const index = ha.pointToIndex({ x: 0, y: 1 });
        expect(index).toBe(1);
      });
      it("has point (1,1) to index 2", () => {
        const index = ha.pointToIndex({ x: 1, y: 1 });
        expect(index).toBe(2);
      });
      it("has point (1,0) to index 3", () => {
        const index = ha.pointToIndex({ x: 1, y: 0 });
        expect(index).toBe(3);
      });
      describe("requests for a point outside the order capacity", () => {
        it("throws an exception", () => {
          expect(() => {
            ha.pointToIndex({ x: 2, y: 2 });
          }).toThrow();
        });
      });
    });

    describe("second order", () => {
      let ha = new HilbertAlgorithm(2);
      it("has point (0,0) to index 0", () => {
        const index = ha.pointToIndex({ x: 0, y: 0 });
        expect(index).toBe(0);
      });
      it("has point (1,0) to index 1", () => {
        const index = ha.pointToIndex({ x: 1, y: 0 });
        expect(index).toBe(1);
      });
      it("has point (1,1) to index 2", () => {
        const index = ha.pointToIndex({ x: 1, y: 1 });
        expect(index).toBe(2);
      });
      it("has point (1,2) to index 7", () => {
        const index = ha.pointToIndex({ x: 1, y: 2 });
        expect(index).toBe(7);
      });
      it("has point (3,2) to index 2", () => {
        const index = ha.pointToIndex({ x: 3, y: 2 });
        expect(index).toBe(11);
      });
      it("has point (3,0) to index 15", () => {
        const index = ha.pointToIndex({ x: 3, y: 0 });
        expect(index).toBe(15);
      });
      describe("requests for an index above the supported size", () => {
        it("throws an exception", () => {
          expect(() => {
            ha.pointToIndex({ x: 4, y: 4 });
          }).toThrow();
        });
      });
    });
    describe("third order", () => {
      let ha = new HilbertAlgorithm(3);
      it("point (0,0) to index 0", () => {
        const index = ha.pointToIndex({ x: 0, y: 0 });
        expect(index).toBe(0);
      });
      it("point (0,1) to index 1", () => {
        const index = ha.pointToIndex({ x: 0, y: 1 });
        expect(index).toBe(1);
      });
      it("point (1,1) to index 2", () => {
        const index = ha.pointToIndex({ x: 1, y: 1 });
        expect(index).toBe(2);
      });
      it("point (2,1) to index 7", () => {
        const index = ha.pointToIndex({ x: 2, y: 1 });
        expect(index).toBe(7);
      });
      it("point (2,3) to index 11", () => {
        const index = ha.pointToIndex({ x: 2, y: 3 });
        expect(index).toBe(11);
      });
      it("point (0,3) to index 15", () => {
        const index = ha.pointToIndex({ x: 0, y: 3 });
        expect(index).toBe(15);
      });
      describe("requests for an index above the supported size", () => {
        it("throws an exception", () => {
          expect(() => {
            ha.indexToPoint(64);
          }).toThrow();
        });
      });
    });
  });
  describe("rotate", () => {
    let ha = new HilbertAlgorithm(3);
    let point: PointWithPixelValue;
    let rx: PointValue;
    let ry: PointValue;
    let numberColumns: ColumnsForOrder;
    beforeEach(() => {
      point = { x: 0, y: 0 };
      rx = 1;
      ry = 0;
      numberColumns = 1;
    });
    describe("numberColumns at 1", () => {
      beforeEach(() => {
        numberColumns = 1;
      });
      describe("rx 0", () => {
        beforeEach(() => {
          rx = 0;
        });
        describe("ry 0", () => {
          beforeEach(() => {
            ry = 0;
          });
          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates point to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
        describe("ry 1", () => {
          beforeEach(() => {
            ry = 1;
          });
          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates point to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
      });
      describe("rx 1", () => {
        beforeEach(() => {
          rx = 1;
        });
        describe("ry 0", () => {
          beforeEach(() => {
            ry = 0;
          });
          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
          describe("point (1,1)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
        describe("ry 1", () => {
          beforeEach(() => {
            ry = 1;
          });

          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates point to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
      });
    });

    describe("numberColumns at 3", () => {
      beforeEach(() => {
        numberColumns = 8;
      });
      describe("rx 0", () => {
        beforeEach(() => {
          rx = 0;
        });
        describe("ry 0", () => {
          beforeEach(() => {
            ry = 0;
          });
          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates point to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
        describe("ry 1", () => {
          beforeEach(() => {
            ry = 1;
          });
          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates point to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
      });
      describe("rx 1", () => {
        beforeEach(() => {
          rx = 1;
        });
        describe("ry 0", () => {
          beforeEach(() => {
            ry = 0;
          });
          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates to (7,7)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(7);
              expect(point.y).toBe(7);
            });
          });
          describe("point (1,1)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates to (7,7)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(7);
              expect(point.y).toBe(7);
            });
          });
        });
        describe("ry 1", () => {
          beforeEach(() => {
            ry = 1;
          });

          describe("point (0,0)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates point to (0,0)", () => {
              ha.rotate(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
        });
      });
    });

    describe("invalid values generated point.x", () => {
      describe("point.x at 10 with a single column", () => {
        beforeEach(() => {
          point.x = 10;
          point.y = 0;
          numberColumns = 1;
        });
        it("throws an exception", () => {
          expect(() => {
            ha.rotate(point, rx, ry, numberColumns);
          }).toThrow();
        });
      });
    });
    describe("invalid values generated point.y", () => {
      describe("point.y at 10 with a single column", () => {
        beforeEach(() => {
          point.x = 0;
          point.y = 10;
          numberColumns = 1;
        });
        it("throws an exception", () => {
          expect(() => {
            ha.rotate(point, rx, ry, numberColumns);
          }).toThrow();
        });
      });
    });
  });

  describe("offsetPoint", () => {
    const ha = new HilbertAlgorithm(3);
    let projectionWidth: number = 0;
    let point: PointWithPixelValue = { x: 0, y: 3 };
    describe("projectionWidth negative", () => {
      beforeEach(() => {
        projectionWidth = -1;
      });
      it("throws an exception", () => {
        expect(() => {
          ha.offsetPoint(point, projectionWidth);
        }).toThrow();
      });
    });

    describe("projectionWidth postive", () => {
      beforeEach(() => {
        projectionWidth = 128;
      });
      it("projects the pixel", () => {
        const result = ha.offsetPoint(point, projectionWidth);
        expect(result.x).toBe(8);
        expect(result.y).toBe(56);
      });
    });
  });

  describe("deoffsetPoint", () => {
    const ha = new HilbertAlgorithm(3);
    let projectionWidth: number = 0;
    let point: PointWithPixelValue = { x: 8, y: 56 };
    describe("projectionWidth negative", () => {
      beforeEach(() => {
        projectionWidth = -1;
      });
      it("throws an exception", () => {
        expect(() => {
          ha.deoffsetPoint(point, projectionWidth);
        }).toThrow();
      });
    });

    describe("projectionWidth postive", () => {
      beforeEach(() => {
        projectionWidth = 128;
      });
      it("projects the pixel", () => {
        const result = ha.deoffsetPoint(point, projectionWidth);
        expect(result.x).toBe(0);
        expect(result.y).toBe(3);
      });
    });
  });
});
