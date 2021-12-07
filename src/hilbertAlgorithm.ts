export type HilbertOrder = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
export type ColumnsForOrder =
  | 1
  | 2
  | 4
  | 8
  | 16
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048
  | 4096
  | 8192
  | 16384
  | 32768
  | 65636;
export type PointValue = 0 | 1;
export type PointWithPixelValue = { x: number; y: number };
export type Point = { x: PointValue; y: PointValue };
export class HilbertAlgorithm {
  private order: HilbertOrder;
  public constructor(order: HilbertOrder) {
    this.order = order;
  }

  public indexToPoint(index: number): PointWithPixelValue {
    index = Math.trunc(index);
    const quadrantPerRow = 2 ** this.order;

    if (index < 0) {
      throw new Error("Index represents a position in an array and must be positive");
    }

    if (index >= quadrantPerRow ** 2) {
      throw new Error(
        "The index is above the supported amount of space the current order support. Reduce the index or increase the order."
      );
    }
    const point: PointWithPixelValue = { x: 0, y: 0 };
    let rx: PointValue;
    let ry: PointValue;
    let quadrant: ColumnsForOrder = 1;
    let t: number = index;
    while (quadrant < quadrantPerRow) {
      rx = (1 & (t / 2)) as PointValue;
      ry = (1 & (t ^ rx)) as PointValue;
      this.rotate(point, rx, ry, quadrant);
      point.x += quadrant * rx;
      point.y += quadrant * ry;
      t /= 4;
      quadrant = (quadrant * 2) as ColumnsForOrder;
    }
    return point;
  }

  public pointToIndex(point: PointWithPixelValue) {
    const n: ColumnsForOrder = (2 ** this.order) as ColumnsForOrder;

    if (point.x >= n || point.y >= n) {
      throw new Error("The point must be in range with the order");
    }
    let rx: PointValue;
    let ry: PointValue;
    let index: number = 0;
    for (let s = n / 2; s > 0; s = Math.floor(s / 2)) {
      rx = ((point.x & s) > 0 ? 1 : 0) as PointValue;
      ry = ((point.y & s) > 0 ? 1 : 0) as PointValue;
      index += s * s * ((3 * rx) ^ ry);
      this.rotate(point, rx, ry, n);
    }
    return index;
  }

  public rotate(
    point: PointWithPixelValue,
    rx: PointValue,
    ry: PointValue,
    numberColumns: ColumnsForOrder
  ): void {
    if (ry === 0) {
      if (rx === 1) {
        point.x = numberColumns - 1 - point.x;
        point.y = numberColumns - 1 - point.y;
        if (point.x < 0) {
          throw Error("Number of columns must be at leat 1 above x");
        }
        if (point.y < 0) {
          throw Error("Number of columns must be at leat 1 above y");
        }
      }
      [point.x, point.y] = [point.y, point.x];
    }
  }

  public offsetPoint(point: PointWithPixelValue, projectionWidth: number): PointWithPixelValue {
    if (projectionWidth < 0) {
      throw new Error("Projecting a point must be on a positive width");
    }
    const numberOfRows = Math.pow(2, this.order);
    const len = projectionWidth / numberOfRows; // Len of each edge between vertex of each cell (1 cell has 4 vertex)
    return {
      x: point.x * len + len / 2,
      y: point.y * len + len / 2,
    };
  }

  public deoffsetPoint(point: PointWithPixelValue, projectionWidth: number): PointWithPixelValue {
    if (projectionWidth < 0) {
      throw new Error("Projecting a point must be on a positive width");
    }
    const numberOfRows = Math.pow(2, this.order);
    const len = projectionWidth / numberOfRows; // Len of each edge between vertex of each cell (1 cell has 4 vertex)
    return {
      x: Math.trunc(point.x / len),
      y: Math.trunc(point.y / len),
    };
  }
}
