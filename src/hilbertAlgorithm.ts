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

/**
 * Coordinate in the 2d array
 * It is an integer, from 0 to x for the value x and y that represent the row/column
 */
export type CoordinateValue = { x: number; y: number };

/**
 * Similar to the coordinate value but can be any value since it is a pixel.
 */
export type PointWithPixelValue = { x: number; y: number };
export class HilbertAlgorithm {
  /**
   * The order defines the level of point that can be handle. It determines
   * the length of the 1d array which correspond to the length of point in
   * the 2d matrix.
   *
   * The number of row/column are defined by computing 2 at the power of the order
   *
   * For example:
   * - An order of 1, 2^1 rows/columns, gives a 2x2 matrix, or 4 point (or an array of 4 spaces).
   * - An order of 2, 2^2 rows/columns, gives a 4x4 matrix, or 16 point (or an array of 16 spaces).
   * - An order of 3, 2^3 rows/columns, gives a 8x8 matrix, or 64 point (or an array of 64 spaces).
   */
  private readonly order: HilbertOrder;

  /**
   * The order is defined on the construction because it cannot change.
   */
  public constructor(order: HilbertOrder) {
    this.order = order;
  }

  /**
   * Translate the position of a 1d index into a 2d space.
   *
   * The result of the function is a coordinate, a point, that contain
   * a x and y value of the position. The point is not a pixel, it is
   * an index in a 2d matrix.
   */
  public indexToPoint(index: number): CoordinateValue {
    // Array index to 2d requires to be an integer
    if (!Number.isInteger(index)) {
      throw new Error("Index must be an integer");
    }

    // Array index starts at 0
    if (index < 0) {
      throw new Error("Index represents a position in an array and must be positive");
    }

    // Array index must fit in the space provided by the order
    const quadrantPerRow = 2 ** this.order; // This is the number of rows (and columns)
    const size = quadrantPerRow ** 2; // The maximum size of the matrix. Must be at least as big as the data from the 1d array
    if (index >= size) {
      throw new Error(
        "The index is above the supported amount of space the current order support. Reduce the index or increase the order."
      );
    }

    const point: CoordinateValue = { x: 0, y: 0 }; // Define the coordinate in the 2d matrix
    let rx: PointValue;
    let ry: PointValue;
    let quadrant: ColumnsForOrder = 1; // Always start at the first order and move up
    let t: number = index;
    while (quadrant < quadrantPerRow) {
      // Until we reach the number of quadrant defined by the order
      rx = (1 & Math.trunc(t / 2)) as PointValue; // Two possible values
      ry = (1 & (t ^ rx)) as PointValue; // Two possible values
      this.rotatePoint(point, rx, ry, quadrant); // Rotate depending on rx and ry value
      point.x += quadrant * rx; // Move the x point from "a quadrant" size OR not (this is 0 or 1 multiplication)
      point.y += quadrant * ry; // Move the x point from "a quadrant" size OR not (this is 0 or 1 multiplication)
      t = Math.trunc(t / 4); // 4 point per quadrant, hence we jump by 4
      quadrant = (quadrant * 2) as ColumnsForOrder; // Each order double the size of element per row (and column)
    }
    return point;
  }

  /**
   * Takes a point and return an index. Hilbert algorithm is deterministic, hence
   * you can take a point from the `indexToPoint` and it returns the exact same index
   * 
   * Example: pointToIndex(indexToPoint(123)) returns 123s
   */
  public pointToIndex(point: CoordinateValue): number {
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
      this.rotatePoint(point, rx, ry, n);
    }
    return index;
  }

  public rotatePoint(
    point: CoordinateValue,
    rx: Readonly<PointValue>,
    ry: Readonly<PointValue>,
    numberColumns: Readonly<ColumnsForOrder>
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

  public offsetPoint(point: CoordinateValue, projectionWidth: number): PointWithPixelValue {
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

  public deoffsetPoint(point: PointWithPixelValue, projectionWidth: number): CoordinateValue {
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
