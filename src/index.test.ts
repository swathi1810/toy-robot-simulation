import {displayWelcomeMessage, runTestData, processCommand, processFileCommands} from "./index";
import {Robot} from "./models/Robot";
import {Direction} from "./enums/Direction";
import * as fs from 'fs';


// Mock `console.log` to capture its output for testing
let consoleOutput: string[] = [];
const mockedLog = (output: string) => consoleOutput.push(output);
let robot: Robot;
jest.mock('fs');
beforeEach(() => {
    consoleOutput = [];
    console.log = mockedLog;
    robot = new Robot();
});

afterEach(() => {
    jest.restoreAllMocks();
});

// Test the `displayWelcomeMessage` function
describe('displayWelcomeMessage', () => {
    test('should display the correct welcome message', () => {
        displayWelcomeMessage();

        const expectedOutput = [
            "TOY ROBOT 🤖",
            "--------------",
            `Welcome to Node Toy Robot! We have created a 5x5 Table and a Robot. You can issue the following commands to control the Robot on the Table:
  - PLACE X,Y,F : Place the robot at position (X,Y) facing F (NORTH, SOUTH, EAST, or WEST)
  - MOVE        : Move the robot one unit forward in the direction it is facing
  - LEFT        : Rotate the robot 90 degrees to the left (counterclockwise)
  - RIGHT       : Rotate the robot 90 degrees to the right (clockwise)
  - REPORT      : Output the robot's current position and facing direction

You can provide commands either through the console or from a file.
  - 'npm run start' : Starts the program in interactive console mode.
  - 'npm run start -- --file <filename>' : Run commands from a file.

  - 'npm run start -- --test' : Run predefined test commands.

Additional options:
  - '--help' : Displays this help message and instructions
  - 'q' or 'exit' : Exits the program

Unknown or invalid commands will be safely ignored.
`
        ];
        expect(consoleOutput).toEqual(expectedOutput);
    });
});

// Test `runTestData` function
describe('runTestData', () => {
    test('should run predefined test commands', () => {
        runTestData(robot);
        const expectedOutputs = [
            'Executing: PLACE 0,0,NORTH',
            'Executing: MOVE',
            'Executing: REPORT',
            'Output: 0,1,NORTH',
            'Executing: PLACE 1,2,EAST',
            'Executing: MOVE',
            'Executing: MOVE',
            'Executing: LEFT',
            'Executing: MOVE',
            'Executing: REPORT',
            'Output: 3,3,NORTH',
            'Executing: PLACE 4,4,SOUTH',
            'Executing: MOVE',
            'Executing: RIGHT',
            'Executing: MOVE',
            'Executing: REPORT',
        ];
        expectedOutputs.forEach((expected, index) => {
            expect(consoleOutput[index]).toBe(expected);
        });
    });
});

// Test `processCommand` function
describe('processCommand', () => {
    test('should handle PLACE command', () => {
        processCommand('PLACE 1,2,EAST', robot);
        const position = robot.getPosition();
        expect(position.x).toBe(1);
        expect(position.y).toBe(2);
        expect(position.facing).toBe(Direction.EAST);

    });

    test('should handle MOVE command', () => {
        processCommand('PLACE 1,2,EAST', robot);
        processCommand('MOVE', robot);
        const position = robot.getPosition();
        expect(position.x).toBe(2);
        expect(position.y).toBe(2);
    });

    test('should handle REPORT command', () => {
        processCommand('REPORT', robot);
        processCommand('PLACE 0,0,NORTH', robot);
        const spy = jest.spyOn(console, 'log');
        processCommand('REPORT', robot);
        expect(spy).toHaveBeenCalledWith('Output: 0,0,NORTH');
        spy.mockRestore();
    });

    test('should handle invalid command', () => {
        processCommand('INVALID', robot);
        expect(consoleOutput[consoleOutput.length - 1]).toBe('Invalid command');
    });
});

describe('Main logic with file and help conditions', () => {
    test('should process commands from a file (--file)', () => {
        const mockCommands = 'PLACE 1,2,EAST\nMOVE\nREPORT';
        (fs.readFileSync as jest.Mock).mockReturnValue(mockCommands);

        processFileCommands('dummy.txt', robot);

        expect(fs.readFileSync).toHaveBeenCalledWith('dummy.txt', 'utf-8');
        expect(consoleOutput[consoleOutput.length - 1]).toBe('Output: 2,2,EAST');
    });

    test('should display help and exit when --help is passed', () => {
        const args = ['--help'];
        process.argv = ['run', 'start', ...args];

        displayWelcomeMessage();
        const expectedHelpOutput = [
            "TOY ROBOT 🤖",
            "--------------",
            `Welcome to Node Toy Robot! We have created a 5x5 Table and a Robot. You can issue the following commands to control the Robot on the Table:
  - PLACE X,Y,F : Place the robot at position (X,Y) facing F (NORTH, SOUTH, EAST, or WEST)
  - MOVE        : Move the robot one unit forward in the direction it is facing
  - LEFT        : Rotate the robot 90 degrees to the left (counterclockwise)
  - RIGHT       : Rotate the robot 90 degrees to the right (clockwise)
  - REPORT      : Output the robot's current position and facing direction

You can provide commands either through the console or from a file.
  - 'npm run start' : Starts the program in interactive console mode.
  - 'npm run start -- --file <filename>' : Run commands from a file.

  - 'npm run start -- --test' : Run predefined test commands.

Additional options:
  - '--help' : Displays this help message and instructions
  - 'q' or 'exit' : Exits the program

Unknown or invalid commands will be safely ignored.
`
        ];

        expect(consoleOutput).toEqual(expectedHelpOutput);
    });

});