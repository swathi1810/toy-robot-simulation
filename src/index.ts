import * as fs from 'fs';
import * as readline from 'readline';
import {Direction} from "./enums/Direction";
import {Robot} from "./models/Robot";

/**
 *Displays the welcome message with instructions on how to use the Toy Robot application.
* This includes information on the available commands and how to run the program in different modes.
*/
export const displayWelcomeMessage = (): void => {
    console.log('TOY ROBOT 🤖');
    console.log('--------------');

    console.log(
        `Welcome to Node Toy Robot! We have created a 5x5 Table and a Robot. You can issue the following commands to control the Robot on the Table:\n` +
        `  - PLACE X,Y,F : Place the robot at position (X,Y) facing F (NORTH, SOUTH, EAST, or WEST)\n` +
        `  - MOVE        : Move the robot one unit forward in the direction it is facing\n` +
        `  - LEFT        : Rotate the robot 90 degrees to the left (counterclockwise)\n` +
        `  - RIGHT       : Rotate the robot 90 degrees to the right (clockwise)\n` +
        `  - REPORT      : Output the robot's current position and facing direction\n\n` +
        `You can provide commands either through the console or from a file.\n` +
        `  - 'npm start' : Starts the program in interactive console mode.\n` +
        `  - 'npm start -- --file <filename>' : Run commands from a file.\n\n` +
        `  - 'npm start -- --test' : Run predefined test commands.\n\n` +
        `Additional options:\n` +
        `  - '--help' : Displays this help message and instructions\n` +
        `  - 'q' or 'exit' : Exits the program\n\n` +
        `Unknown or invalid commands will be safely ignored.\n`
    );
};

/**
 * Runs a predefined set of test commands on the given robot object.
 * This function simulates several moves and actions of the robot and outputs the results.
 *
 * @param robot - The robot instance on which the commands will be executed.
 */
export const runTestData = (robot: Robot): void => {
    const testCommands = [
        'PLACE 0,0,NORTH',
        'MOVE',
        'REPORT',
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'MOVE',
        'REPORT',
        'PLACE 4,4,SOUTH',
        'MOVE',
        'RIGHT',
        'MOVE',
        'REPORT'
    ];

    testCommands.forEach((command) => {
        console.log(`Executing: ${command}`);
        processCommand(command, robot);
    });
};

/**
 * Processes a single command issued to the robot.
 * Based on the command type, the robot will perform actions like PLACE, MOVE, LEFT, RIGHT, or REPORT.
 *
 * @param command - The command string entered by the user or read from a file.
 * @param robot - The robot instance on which the command will be executed.
 */
export const processCommand = (command: string, robot: Robot): void => {
    const parts = command.trim().split(' ');
    switch (parts[0]) {
        case 'PLACE': {
            const [x, y, direction] = parts[1].split(',');
            robot.place(parseInt(x), parseInt(y), direction as Direction);
            break;
        }
        case 'MOVE':
            robot.move();
            break;
        case 'LEFT':
            robot.left();
            break;
        case 'RIGHT':
            robot.right();
            break;
        case 'REPORT':
            robot.report();
            break;
        default:
            console.log('Invalid command');
    }
};

/**
 * Processes commands from a file.
 * This function reads the commands from a file, then processes each command line-by-line.
 *
 * @param filePath - The path to the file containing the commands.
 * @param robot - The robot instance on which the commands will be executed.
 */
export const processFileCommands = (filePath: string, robot: Robot): void => {
    const commands = fs.readFileSync(filePath, 'utf-8').split('\n');
    commands.forEach((command) => {
        if (command) processCommand(command, robot);
    });
};

/**
 * Processes commands entered in the console interactively.
 * This function waits for user input in the console, processes each command, and continues to prompt until 'q' or 'exit' is entered.
 *
 * @param robot - The robot instance on which the commands will be executed.
 */
export const processConsoleCommands = (robot: Robot): void => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    rl.on('line', (input) => {
        if (input === 'exit' || input === 'q') {
            rl.close();
        } else {
            processCommand(input, robot);
        }
    }).on('close', () => {
        console.log('Exiting Toy Robot... Goodbye! 🤖');
        process.exit(0);
    });
};

/**
 * Main function to start the Toy Robot program.
 * This function checks for command-line arguments to determine if the user wants to use a file, run tests, or display help.
 * Based on the arguments, it either processes commands from a file, runs predefined test commands, or runs in console mode.
 */
const main = () => {
    const robot = new Robot();
    const args = process.argv.slice(2);
    const fileArgIndex = args.indexOf('--file');

    // Display the welcome message first
    displayWelcomeMessage();

    if (args.includes('--help')) {
        displayWelcomeMessage();
        return;
    }

    // If the --test argument is passed, run the test data
    if (args.includes('--test')) {
        console.log('Running test data...');
        runTestData(robot);
        return;
    }

    // If --file is provided, use file input. Otherwise, default to console input.
    if (fileArgIndex !== -1 && args[fileArgIndex + 1]) {
        const filePath = args[fileArgIndex + 1];
        processFileCommands(filePath, robot);
    } else {
        processConsoleCommands(robot);
    }
};

main();
