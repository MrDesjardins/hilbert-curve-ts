/**
 * Supported Hilbert's order. The scope is determined with what is usable in a NodeJS environment
 * in term of performance. It is easily possible to extend the order to greater value. Caveat: if
 * new orders are introduced, the `RowsForOrder` type, below, must be adjusted as well.
 */
export type HilbertOrder = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

/**
 * Number of rows (and columns) for each order.
 * For example:
 *  Order 1: has 2 row and 2 column
 *  Order 2: has 4 rows and 4 columns
 *  Order 3: has 8 rows and 8 columns
 */
export type RowsForOrder =
  | 1 // 1 Only for the loop logic
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

/**
 * Represent the point value of the smallest entity: Single quadrant.
 * Visual:
 *  |0,0|0,1|
 *  |1,0|1,1|
 */
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

/**
 * Main class that perform the 1d to 2d and 2d to 1d with the Hilbert algorithm
 */
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
    const numberRow = 2 ** this.order; // This is the number of rows (and columns)
    const maximumDataSize = numberRow ** 2; // The maximum size of the matrix. Must be at least as big as the data from the 1d array
    if (index >= maximumDataSize) {
      throw new Error(
        "The index is above the supported amount of space the current order support. Reduce the index or increase the order."
      );
    }

    const point: CoordinateValue = { x: 0, y: 0 }; // Define the coordinate in the 2d matrix
    let rx: PointValue;
    let ry: PointValue;
    let orderIndex: RowsForOrder = 1; // Always start at the first order and move up
    let quadrant: number = index;
    while (orderIndex < numberRow) {
      // Until we reach the number of quadrant defined by the order
      // Determine the index position within the 4 points of a quadrant
      rx = HilbertAlgorithm.getRx(quadrant);
      ry = HilbertAlgorithm.getRy(quadrant, rx);
      HilbertAlgorithm.rotatePoint(point, rx, ry, orderIndex); // Rotate depending on rx and ry value
      HilbertAlgorithm.movePoint(point, rx, ry, orderIndex);
      quadrant = Math.trunc(quadrant / 4); // 4 point per quadrant, hence we jump by 4
      orderIndex = (orderIndex * 2) as RowsForOrder; // Each order double the size of element per row (and column)
    }
    return point;
  }

  /**
   * Returns a pattern of 0,0,1,1,0,0,1,1.... the quadrand is the index
   * of this pattern starting at zero.
   */
  public static getRx(quadrant: number): PointValue {
    if (quadrant < 0) {
      throw new Error("Index must be above 0");
    }

    // Uses the binary 01 to extract the number 0 and 1. Big number still
    // only have 00 or 01 for the first digit
    // Uses /2 because we want to have two numbers in a row (0,0 then 1,1)
    return (1 & Math.trunc(quadrant / 2)) as PointValue;
  }

  /**
   * Return alternate value of 0 and 1.
   * If RX is 0, the pattern is: 010101...
   * If RY is 1, the pattern is: 101010...
   */
  public static getRy(quadrant: number, rx: PointValue): PointValue {
    if (quadrant < 0) {
      throw new Error("Index must be above 0");
    }

    // The binary of "1" is "01" and is used for any quadrant to alternate.
    // The XOR operation shift the starting point of the pattern
    return (1 & (quadrant ^ rx)) as PointValue;
  }

  /**
   * Move a point (not pixel) into a Hilbert matrix.
   * First order does not do anything because there is only 1 quadrant of 4 points.
   * The second order can move from one on each axis (or not).
   */
  public static movePoint(
    point: CoordinateValue,
    rx: PointValue,
    ry: PointValue,
    orderIndex: RowsForOrder
  ): void {
    point.x += orderIndex * rx; // Move the x point from "a quadrant" size OR not (this is 0 or 1 multiplication)
    point.y += orderIndex * ry; // Move the x point from "a quadrant" size OR not (this is 0 or 1 multiplication)
  }

  /**
   * Takes a point and return an index. Hilbert algorithm is deterministic, hence
   * you can take a point from the `indexToPoint` and it returns the exact same index.
   *
   * Example: pointToIndex(indexToPoint(123)) returns 123s
   */
  public pointToIndex(point: CoordinateValue): number {
    const numberOfRow: RowsForOrder = (2 ** this.order) as RowsForOrder;

    if (point.x >= numberOfRow || point.y >= numberOfRow) {
      throw new Error("The point must be in range with the order");
    }
    let rx: PointValue;
    let ry: PointValue;
    let index: number = 0;
    for (
      let rowIndex: RowsForOrder = (numberOfRow / 2) as RowsForOrder;
      rowIndex > 0;
      rowIndex = Math.floor(rowIndex / 2) as RowsForOrder
    ) {
      rx = HilbertAlgorithm.getRxFromPoint(point, rowIndex);
      ry = HilbertAlgorithm.getRyFromPoint(point, rowIndex);
      index += HilbertAlgorithm.getNewIndexFromRows(rowIndex, rx, ry);
      HilbertAlgorithm.rotatePoint(point, rx, ry, numberOfRow);
    }
    return index;
  }

  /**
   * Return the new 1d index from the current rows index (will be called several times if order > 1)
   * Relies on the rx and ry to determine how many jumps in the 1d space to perform.
   */
  public static getNewIndexFromRows(
    rowsIndex: RowsForOrder,
    rx: PointValue,
    ry: PointValue
  ): number {
    return rowsIndex * rowsIndex * ((3 * rx) ^ ry);
  }

  /**
   * Call the `getPointValueFromNumber` function with the `x` point
   */
  public static getRxFromPoint(point: CoordinateValue, orderIndex: RowsForOrder): PointValue {
    return HilbertAlgorithm.getPointValueFromNumber(point.x, orderIndex);
  }

  /**
   * Call the `getPointValueFromNumber` function with the `y` point
   */
  public static getRyFromPoint(point: CoordinateValue, orderIndex: RowsForOrder): PointValue {
    return HilbertAlgorithm.getPointValueFromNumber(point.y, orderIndex);
  }

  /**
   * From a number and an index, return the value 0 or 1 depending of the AND value of these twos.
   */
  public static getPointValueFromNumber(numberN: number, orderIndex: RowsForOrder): PointValue {
    const andResult = numberN & orderIndex; // 0, 1, 2
    return (andResult > 0 ? 1 : 0) as PointValue;
  }

  /**
   * rx and ry give the coordinate of a 2x2 square:
   *
   * |0|3|
   * |1|2|
   *
   * Taking a point, that can be any coordinate, we determine the
   * rotating by moving the point depending of the 2x2 position.
   *
   * The rotation occurs only for the first row and has an additional
   * step when the coordinate is on the second column.
   */
  public static rotatePoint(
    point: CoordinateValue,
    rx: Readonly<PointValue>,
    ry: Readonly<PointValue>,
    numberColumns: Readonly<RowsForOrder>
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

  public offsetPoint(
    point: Readonly<CoordinateValue>,
    projectionWidth: number
  ): PointWithPixelValue {
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

  public deoffsetPoint(
    point: Readonly<PointWithPixelValue>,
    projectionWidth: number
  ): CoordinateValue {
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
