import { Coordinate } from "./Coordinate.js";
import { Robot } from "./Robot.js";

export class Warehouse {
  private size: Coordinate;
  private robots: Robot[];
  private crates: Coordinate[];

  constructor(width: number, height: number) {
    this.size = { x: width, y: height };
    this.robots = [];
    this.crates = [];
  }

  public createRobot(x = 0, y = 0): Robot {
    if (!this.isWithinBounds({ x, y })) {
      throw new Error("Robot cannot be created outside of warehouse bounds");
    }

    const robot = new Robot(x, y, this.size);
    this.robots.push(robot);
    return robot;
  }
  public getRobots() {
    return this.robots;
  }

  public getSize() {
    return this.size;
  }

  public moveRobot(robot: Robot, input: string) {
    this.parseInput(input).forEach((direction) => {
      switch (direction) {
        case "N":
          robot.moveNorth();
          break;
        case "S":
          robot.moveSouth();
          break;
        case "E":
          robot.moveEast();
          break;
        case "W":
          robot.moveWest();
          break;
        case "NE":
          robot.moveNorthEast();
          break;
        case "NW":
          robot.moveNorthWest();
          break;
        case "SE":
          robot.moveSouthEast();
          break;
        case "SW":
          robot.moveSouthWest();
          break;
        case "G":
          robot.grabCrate();
          this.removeCrate(robot.getPosition());
          break;
        case "D":
          robot.dropCrate();
          this.placeCrate(robot.getPosition());
          break;
      }
    });
  }

  public moveAll(directions: string) {
    this.robots.forEach((robot) => {
      this.moveRobot(robot, directions);
    });
  }

  public isCrateAt(coordinate: Coordinate) {
    const result = this.crates.some(
      (crate) => crate.x === coordinate.x && crate.y === coordinate.y
    );
    if (coordinate.x === 0 && coordinate.y === 1) {
      console.log(this.crates);
      console.log(result);
    }
    return result;
  }

  public removeCrate(coordinate: Coordinate) {
    if (!this.isCrateAt(coordinate)) {
      throw new Error("No crate at given coordinate");
    }
    this.crates = this.crates.filter(
      (crate) => crate.x !== coordinate.x || crate.y !== coordinate.y
    );
  }

  public placeCrate(coordinate: Coordinate) {
    if (this.isCrateAt(coordinate)) {
      throw new Error("Crate already at given coordinate");
    }
    if (!this.isWithinBounds(coordinate)) {
      throw new Error("Crate cannot be created outside of warehouse bounds");
    }
    this.crates.push(coordinate);
  }

  private isWithinBounds(coordinate: Coordinate) {
    return (
      coordinate.x >= 0 &&
      coordinate.x <= this.size.x &&
      coordinate.y >= 0 &&
      coordinate.y <= this.size.y
    );
  }

  private parseInput(input: string): string[] {
    const directions = input.split(" ");
    for (let i = 0; i < directions.length; i++) {
      const current = directions[i];
      const next = directions[i + 1];

      if (
        (current === "N" && next === "E") ||
        (current === "E" && next === "N")
      ) {
        directions.splice(i, 2, "NE");
      }

      if (
        (current === "N" && next === "W") ||
        (current === "W" && next === "N")
      ) {
        directions.splice(i, 2, "NW");
      }

      if (
        (current === "S" && next === "E") ||
        (current === "E" && next === "S")
      ) {
        directions.splice(i, 2, "SE");
      }

      if (
        (current === "S" && next === "W") ||
        (current === "W" && next === "S")
      ) {
        directions.splice(i, 2, "SW");
      }
    }
    return directions;
  }
}
