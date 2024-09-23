import * as fs from 'fs';
import * as readline from 'readline';
import {Direction} from "./enums/Direction";
import {Robot} from "./models/Robot";



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

// Option to process commands from a file
export const processFileCommands = (filePath: string, robot: Robot): void => {
    const commands = fs.readFileSync(filePath, 'utf-8').split('\n');
    commands.forEach((command) => {
        if (command) processCommand(command, robot);
    });
};

// Option to process commands from the console
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

// Main logic to choose between file or console input
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
