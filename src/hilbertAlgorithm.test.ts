import {
  ColumnsForOrder,
  CoordinateValue,
  HilbertAlgorithm,
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
    const ha = new HilbertAlgorithm(2);
    it("Negative index", () => {
      expect(() => {
        ha.indexToPoint(-1);
      }).toThrow();
    });

    it("is is not an integerindex", () => {
      expect(() => {
        ha.indexToPoint(1.1);
      }).toThrow();
    });

    describe("first order", () => {
      const ha = new HilbertAlgorithm(1);
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
      const ha = new HilbertAlgorithm(2);
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
      const ha = new HilbertAlgorithm(3);
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
      const ha = new HilbertAlgorithm(1);
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
      const ha = new HilbertAlgorithm(2);
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
      const ha = new HilbertAlgorithm(3);
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
  describe("getRx", () => {
    describe("quadrant under zero", () => {
      it("throws an exception", () => {
        expect(() => {
          HilbertAlgorithm.getRx(-1);
        }).toThrow();
      });
    });
    describe("quadrant above zero", () => {
      it("alternates the values", () => {
        expect(HilbertAlgorithm.getRx(0)).toBe(0);
        expect(HilbertAlgorithm.getRx(1)).toBe(0);
        expect(HilbertAlgorithm.getRx(2)).toBe(1);
        expect(HilbertAlgorithm.getRx(3)).toBe(1);
        expect(HilbertAlgorithm.getRx(4)).toBe(0);
        expect(HilbertAlgorithm.getRx(5)).toBe(0);
        expect(HilbertAlgorithm.getRx(6)).toBe(1);
      });
    });
  });
  describe("getRy", () => {
    describe("quadrant under zero", () => {
      it("throws an exception", () => {
        expect(() => {
          HilbertAlgorithm.getRy(-1, 0);
        }).toThrow();
      });
    });
    describe("quadrant above zero", () => {
      let rx: PointValue;
      describe("rx is 0", () => {
        beforeEach(() => {
          rx = 0;
        });
        it("alternates the values starting at zero", () => {
          expect(HilbertAlgorithm.getRy(0, rx)).toBe(0);
          expect(HilbertAlgorithm.getRy(1, rx)).toBe(1);
          expect(HilbertAlgorithm.getRy(2, rx)).toBe(0);
          expect(HilbertAlgorithm.getRy(3, rx)).toBe(1);
          expect(HilbertAlgorithm.getRy(4, rx)).toBe(0);
          expect(HilbertAlgorithm.getRy(5, rx)).toBe(1);
          expect(HilbertAlgorithm.getRy(6, rx)).toBe(0);
        });
      });
      describe("rx is 1", () => {
        beforeEach(() => {
          rx = 1;
        });
        it("alternates the values starting at one", () => {
          expect(HilbertAlgorithm.getRy(0, rx)).toBe(1);
          expect(HilbertAlgorithm.getRy(1, rx)).toBe(0);
          expect(HilbertAlgorithm.getRy(2, rx)).toBe(1);
          expect(HilbertAlgorithm.getRy(3, rx)).toBe(0);
          expect(HilbertAlgorithm.getRy(4, rx)).toBe(1);
          expect(HilbertAlgorithm.getRy(5, rx)).toBe(0);
          expect(HilbertAlgorithm.getRy(6, rx)).toBe(1);
        });
      });
    });
  });
  describe("movePoint", () => {
    let point: CoordinateValue;
    let rx: PointValue;
    let ry: PointValue;
    let order: ColumnsForOrder;
    beforeEach(() => {
      point = { x: 123, y: 456 };
    });
    describe("Order 1", () => {
      beforeEach(() => {
        order = 1;
      });
      describe("rx is 0", () => {
        beforeEach(() => {
          rx = 0;
        });
        it("does not move the x coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.x).toBe(123);
        });
      });
      describe("rx is 1", () => {
        beforeEach(() => {
          rx = 1;
        });
        it("does moves the x coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.x).toBe(124);
        });
      });
      describe("ry is 0", () => {
        beforeEach(() => {
          ry = 0;
        });
        it("does not move the y coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.y).toBe(456);
        });
      });
      describe("ry is 1", () => {
        beforeEach(() => {
          ry = 1;
        });
        it("does move the y coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.y).toBe(457);
        });
      });
    });
    describe("Order 2", () => {
      beforeEach(() => {
        order = 2;
      });
      describe("rx is 0", () => {
        beforeEach(() => {
          rx = 0;
        });
        it("does not move the x coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.x).toBe(123);
        });
      });
      describe("rx is 1", () => {
        beforeEach(() => {
          rx = 1;
        });
        it("does moves the x coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.x).toBe(125); // Move 2 because += 1*2
        });
      });
      describe("ry is 0", () => {
        beforeEach(() => {
          ry = 0;
        });
        it("does not move the y coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.y).toBe(456);
        });
      });
      describe("ry is 1", () => {
        beforeEach(() => {
          ry = 1;
        });
        it("does move the y coordinate", () => {
          HilbertAlgorithm.movePoint(point, rx, ry, order);
          expect(point.y).toBe(458);
        });
      });
    });
  });

  describe(HilbertAlgorithm.getPointValueFromNumber.name, () => {
    let index: ColumnsForOrder;
    describe("Index is 1", () => {
      beforeEach(() => {
        index = 1;
      });
      describe("Four possible values of order 1", () => {
        it("returns 0 or 1", () => {
          expect(HilbertAlgorithm.getPointValueFromNumber(0, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(1, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(2, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(3, index)).toBe(1);
        });
      });
    });
    describe("Index is 2", () => {
      beforeEach(() => {
        index = 2;
      });
      describe("Eight first possible values of order 2", () => {
        it("returns 0 or 1", () => {
          expect(HilbertAlgorithm.getPointValueFromNumber(0, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(1, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(2, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(3, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(4, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(5, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(6, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(7, index)).toBe(1);
        });
      });
    });

    describe("Index is 4", () => {
      beforeEach(() => {
        index = 4;
      });
      describe("Eight first possible values of order 3", () => {
        it("returns 0 or 1", () => {
          expect(HilbertAlgorithm.getPointValueFromNumber(0, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(1, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(2, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(3, index)).toBe(0);
          expect(HilbertAlgorithm.getPointValueFromNumber(4, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(5, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(6, index)).toBe(1);
          expect(HilbertAlgorithm.getPointValueFromNumber(7, index)).toBe(1);
        });
      });
    });
  });
  describe(HilbertAlgorithm.getRxFromPoint, () => {
    let point: CoordinateValue;
    let mock: jest.Mock;
    beforeEach(() => {
      point = { x: 50, y: 100 };
      mock = jest.fn();
      HilbertAlgorithm.getPointValueFromNumber =  mock;
    });
    it("calls the getPointFromValue with the x value of the point", () => {
      HilbertAlgorithm.getRxFromPoint(point, 1);
      expect(mock.mock.calls[0][0]).toBe(50);
    });
  });
  describe(HilbertAlgorithm.getRyFromPoint, () => {
    let point: CoordinateValue;
    let mock: jest.Mock;
    beforeEach(() => {
      point = { x: 50, y: 100 };
      mock = jest.fn();
      HilbertAlgorithm.getPointValueFromNumber =  mock;
    });
    it("calls the getPointFromValue with the x value of the point", () => {
      HilbertAlgorithm.getRyFromPoint(point, 1);
      expect(mock.mock.calls[0][0]).toBe(100);
    });
  });
  describe(HilbertAlgorithm.rotatePoint.name, () => {
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
              expect(point.x).toBe(0);
              expect(point.y).toBe(0);
            });
          });
          describe("point (1,1)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates to (0,0)", () => {
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
              expect(point.x).toBe(7);
              expect(point.y).toBe(7);
            });
          });
          describe("point (1,1)", () => {
            beforeEach(() => {
              point = { x: 0, y: 0 };
            });
            it("rotates to (7,7)", () => {
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
              HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
            HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
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
            HilbertAlgorithm.rotatePoint(point, rx, ry, numberColumns);
          }).toThrow();
        });
      });
    });
  });

  describe("offsetPoint", () => {
    const ha = new HilbertAlgorithm(3);
    let projectionWidth: number = 0;
    const point: PointWithPixelValue = { x: 0, y: 3 };
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
    const point: PointWithPixelValue = { x: 8, y: 56 };
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
