import { Coordinate } from "./Coordinate.js";

export class Robot {
  private warehouseSize: Coordinate;
  private position: Coordinate;
  private isHoldingCrate: boolean = false;

  constructor(x: number, y: number, warehouseSize: Coordinate) {
    this.position = { x, y };
    this.warehouseSize = warehouseSize;
  }

  public getPosition(): Coordinate {
    return this.position;
  }

  public moveNorth(): void {
    if (this.position.y < this.warehouseSize.y && this.position.y >= 0) {
      this.position.y++;
    }
  }

  public moveSouth(): void {
    if (this.position.y > 0 && this.position.y <= this.warehouseSize.y) {
      this.position.y--;
    }
  }

  public moveEast(): void {
    if (this.position.x < this.warehouseSize.x && this.position.x >= 0) {
      this.position.x++;
    }
  }

  public moveWest(): void {
    if (this.position.x > 0 && this.position.x <= this.warehouseSize.x) {
      this.position.x--;
    }
  }

  public moveNorthEast(): void {
    if (
      this.position.x < this.warehouseSize.x &&
      this.position.x >= 0 &&
      this.position.y < this.warehouseSize.y &&
      this.position.y >= 0
    ) {
      this.position.x++;
      this.position.y++;
    }
  }

  public moveNorthWest(): void {
    if (
      this.position.x > 0 &&
      this.position.x <= this.warehouseSize.x &&
      this.position.y < this.warehouseSize.y &&
      this.position.y >= 0
    ) {
      this.position.x--;
      this.position.y++;
    }
  }

  public moveSouthEast(): void {
    if (
      this.position.x < this.warehouseSize.x &&
      this.position.x >= 0 &&
      this.position.y > 0 &&
      this.position.y <= this.warehouseSize.y
    ) {
      this.position.x++;
      this.position.y--;
    }
  }

  public moveSouthWest(): void {
    if (
      this.position.x > 0 &&
      this.position.x <= this.warehouseSize.x &&
      this.position.y > 0 &&
      this.position.y <= this.warehouseSize.y
    ) {
      this.position.x--;
      this.position.y--;
    }
  }

  public grabCrate(): void {
    if (this.isHoldingCrate) {
      throw new Error("Robot is already holding a crate");
    }
    this.isHoldingCrate = true;
  }

  public dropCrate(): void {
    if (!this.isHoldingCrate) {
      throw new Error("Robot is not holding a crate");
    }
    this.isHoldingCrate = false;
  }
}
