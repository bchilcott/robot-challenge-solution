import { beforeEach, describe, expect, it, vi } from "vitest";
import { Warehouse } from "./Warehouse.js";
import { Robot } from "./Robot.js";

describe("Initialization", () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = new Warehouse(10, 10);
  });

  it("should create a warehouse", () => {
    expect(warehouse.getSize()).toEqual({ x: 10, y: 10 });
  });

  it("should create a robot", () => {
    const robot = warehouse.createRobot();
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it("should add a robot to the warehouse", () => {
    const robot = warehouse.createRobot();
    expect(warehouse.getRobots()).toContain(robot);
  });

  it("should initialize a robot to given coordinates", () => {
    const robot = warehouse.createRobot(5, 5);
    expect(robot.getPosition()).toEqual({ x: 5, y: 5 });
  });

  it("should error when creating robot outside of warehouse bounds", () => {
    expect(() => warehouse.createRobot(11, 11)).toThrow(
      "Robot cannot be created outside of warehouse bounds"
    );
  });
});

describe("Cardinal Directions", () => {
  let robot: Robot;
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = new Warehouse(10, 10);
    robot = warehouse.createRobot();
  });

  it("should move within bounds", () => {
    warehouse.moveRobot(robot, "N E E E N S W");
    expect(robot.getPosition()).toEqual({ x: 2, y: 1 });
  });

  it("should not move below zero", () => {
    warehouse.moveRobot(robot, "S S W W");
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it("should not move past the warehouse height", () => {
    warehouse.moveRobot(robot, "N N N N N N N N N N N N");
    expect(robot.getPosition()).toEqual({ x: 0, y: 10 });
  });

  it("should not move past the warehouse width", () => {
    warehouse.moveRobot(robot, "E E E E E E E E E E E E");
    expect(robot.getPosition()).toEqual({ x: 10, y: 0 });
  });
});

describe("Crate Movement", () => {
  let robot: Robot;
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = new Warehouse(10, 10);
    robot = warehouse.createRobot();
    warehouse.placeCrate({ x: 0, y: 0 });
  });

  it("should spawn crates", () => {
    expect(warehouse.isCrateAt({ x: 0, y: 0 })).toBe(true);
  });

  it("should remove crates", () => {
    warehouse.removeCrate({ x: 0, y: 0 });
    expect(warehouse.isCrateAt({ x: 0, y: 0 })).toBe(false);
  });

  it("should move crates", () => {
    warehouse.moveRobot(robot, "G N N E E D");
    expect(warehouse.isCrateAt({ x: 2, y: 2 })).toBe(true);
    expect(warehouse.isCrateAt({ x: 0, y: 0 })).toBe(false);
  });

  it("should not place a crate it isn't holding", () => {
    expect(() => warehouse.moveRobot(robot, "D")).toThrow(
      "Robot is not holding a crate"
    );
  });

  it("should not grab a crate that does not exist", () => {
    expect(() => warehouse.moveRobot(robot, "N G")).toThrow(
      "No crate at given coordinate"
    );
  });

  it("should not grab a crate if one is already held", () => {
    warehouse.placeCrate({ x: 0, y: 1 });
    expect(() => warehouse.moveRobot(robot, "G N G")).toThrow(
      "Robot is already holding a crate"
    );
  });

  it("cannot place a crate on another", () => {
    warehouse.placeCrate({ x: 0, y: 1 });
    warehouse.moveRobot(robot, "G N N D");
    expect(warehouse.isCrateAt({ x: 0, y: 1 })).toBe(true);
  });
});

describe("Diagonal Movement", () => {
  let robot: Robot;
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = new Warehouse(10, 10);
    robot = warehouse.createRobot();
  });

  it("should move diagonally north-east", () => {
    const neSpy = vi.spyOn(robot, "moveNorthEast");
    warehouse.moveRobot(robot, "N E");
    expect(robot.getPosition()).toEqual({ x: 1, y: 1 });
    expect(neSpy).toHaveBeenCalled();
  });

  it("should move diagonally north-west", () => {
    const nwSpy = vi.spyOn(robot, "moveNorthWest");
    warehouse.moveRobot(robot, "N W");
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    expect(nwSpy).toHaveBeenCalled();
  });

  it("should move diagonally south-east", () => {
    const seSpy = vi.spyOn(robot, "moveSouthEast");
    warehouse.moveRobot(robot, "S E");
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    expect(seSpy).toHaveBeenCalled();
  });

  it("should move diagonally south-west", () => {
    const swSpy = vi.spyOn(robot, "moveSouthWest");
    warehouse.moveRobot(robot, "S W");
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    expect(swSpy).toHaveBeenCalled();
  });

  it("should move in several diagonal directions", () => {
    warehouse.moveRobot(robot, "N N E E N E S W");
    expect(robot.getPosition()).toEqual({ x: 2, y: 2 });
  });
});
