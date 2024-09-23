import {Robot} from "./Robot";
import {Direction} from "../enums/Direction";


describe('Robot', () => {
    let robot: Robot;

    beforeEach(() => {
        robot = new Robot();
    });

    test('should ignore move when robot has not been placed', () => {
        console.log = jest.fn();

        robot.move();
        expect(console.log).toHaveBeenCalledWith('Ignoring move: Robot has not been placed.');
    });

    test('should ignore placement outside the grid boundaries', () => {
        console.log = jest.fn();

        robot.place(6, 6, Direction.NORTH);
        expect(console.log).toHaveBeenCalledWith('Ignoring placement: (6, 6) is outside the grid boundaries.');
    });

    test('should place the robot at valid coordinates', () => {
        robot.place(2, 2, Direction.NORTH);
        robot.move();
        robot.right();
        expect(robot['x']).toBe(2);
        expect(robot['y']).toBe(3);
        expect(robot['facing']).toBe(Direction.EAST);
    });

    test('should ignore invalid facing direction', () => {
        console.log = jest.fn();

        robot.place(2, 2, 'UP' as Direction);
        expect(console.log).toHaveBeenCalledWith('Ignoring placement: Invalid facing direction UP.');
    });

    test('should move north when facing north', () => {
        robot.place(1, 1, Direction.NORTH);
        robot.move();
        expect(robot['x']).toBe(1);
        expect(robot['y']).toBe(2);
    });

    test('should move east when facing east', () => {
        robot.place(1, 1, Direction.EAST);
        robot.move();
        expect(robot['x']).toBe(2);
        expect(robot['y']).toBe(1);
    });

    test('should move east when facing south', () => {
        robot.place(1, 1, Direction.SOUTH);
        robot.move();
        expect(robot['x']).toBe(1);
        expect(robot['y']).toBe(0);
    });

    test('should move east when facing west', () => {
        robot.place(1, 1, Direction.WEST);
        robot.move();
        expect(robot['x']).toBe(0);
        expect(robot['y']).toBe(1);
    });

    test('should rotate right from north to east', () => {
        robot.place(1, 1, Direction.NORTH);
        robot.right();
        expect(robot['facing']).toBe(Direction.EAST);
    });

    test('should rotate right from east to south', () => {
        robot.place(1, 1, Direction.EAST);
        robot.right();
        expect(robot['facing']).toBe(Direction.SOUTH);
    });

    test('should rotate right from south to west', () => {
        robot.place(1, 1, Direction.SOUTH);
        robot.right();
        expect(robot['facing']).toBe(Direction.WEST);
    });

    test('should rotate right from west to north', () => {
        robot.place(1, 1, Direction.WEST);
        robot.right();
        expect(robot['facing']).toBe(Direction.NORTH);
    });

    test('should rotate left from north to west', () => {
        robot.place(1, 1, Direction.NORTH);
        robot.left();
        expect(robot['facing']).toBe(Direction.WEST);
    });

    test('should rotate left from west to south', () => {
        robot.place(1, 1, Direction.WEST);
        robot.left();
        expect(robot['facing']).toBe(Direction.SOUTH);
    });

    test('should rotate left from south to east', () => {
        robot.place(1, 1, Direction.SOUTH);
        robot.left();
        expect(robot['facing']).toBe(Direction.EAST);
    });

    test('should rotate left from east to north', () => {
        robot.place(1, 1, Direction.EAST);
        robot.left();
        expect(robot['facing']).toBe(Direction.NORTH);
    });

    test('should ignore move that would place robot outside the grid boundaries', () => {
        console.log = jest.fn();

        robot.place(4, 5, Direction.NORTH);
        robot.move();
        expect(console.log).toHaveBeenCalledWith('Ignoring move: (4, 6) is outside the grid boundaries.');
        expect(robot['x']).toBe(4);
        expect(robot['y']).toBe(5);
    });
});
