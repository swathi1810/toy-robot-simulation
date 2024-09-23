# Toy Robot Simulation

This project is a **Node.js** console application that simulates a toy robot moving on a 5x5 grid. The robot can be placed, moved, rotated, and report its current position and orientation. Invalid commands, such as moving the robot off the grid, are ignored.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
    - [Console Input Mode](#console-input-mode)
    - [File Input Mode](#file-input-mode)
    - [Test Mode](#test-mode)
    - [Help](#help)
- [Commands](#commands)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)

## Features

- **Robot Movement**: The robot can move in four directions (`NORTH`, `EAST`, `SOUTH`, `WEST`).
- **Commands**: Supports commands such as `PLACE`, `MOVE`, `LEFT`, `RIGHT`, and `REPORT`.
- **Command Input**: Commands can be provided via the console, through a file, or by running predefined test commands.
- **Safety**: The robot does not fall off the table, and invalid commands are ignored.

## Prerequisites

Ensure you have the following software installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/toy-robot.git
   cd toy-robot
   
2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```
   
## Usage

You can run the Toy Robot simulation in several modes: interactive console input, file input, or predefined test mode.

### Console Input Mode
This is the default mode where you interactively enter commands in the console.

1. Start the program:

   ```bash
   npm start
   ```
   
2. Enter commands like PLACE, MOVE, LEFT, RIGHT, and REPORT. For example:

   ```
   PLACE 0,0,NORTH
   MOVE
   REPORT
   ```
   
3. Type q or exit to quit the program.

### File Input Mode

To run commands from a file:

1. Create a text file with the commands. For example, `commands.txt`:

   ```
   PLACE 0,0,NORTH
   MOVE
   REPORT
   ```

2. Run the program with the file input:

   ```bash
   npm run start -- --file path/to/commands.txt
   ```

### Test Mode

To run predefined test commands:

  ```bash
    npm run start -- --test
   ```

### Help

To display usage instructions and options:

```bash
npm run start -- --help
```

## Commands
Here are the supported commands to control the robot:

- PLACE X,Y,F: Place the robot on the table at position (X,Y) facing direction F (NORTH, EAST, SOUTH, WEST).
- MOVE: Move the robot one unit forward in the direction it is currently facing.
- LEFT: Rotate the robot 90 degrees counterclockwise.
- RIGHT: Rotate the robot 90 degrees clockwise.
- REPORT: Output the current position and direction of the robot.


## Running Tests
Unit tests have been written using Jest. You can run the tests as follows:

```bash
npm run test
```

This will run the test suite and display the results, including coverage information.

## Project Structure

The project is structured as follows:

```
├── src
│   ├── enums
│   │   └── Direction.ts     # Enum for directions (NORTH, EAST, SOUTH, WEST)
│   ├── models
│   │   └── Robot.ts         # Robot class that handles the robot's state and actions
│   └── index.ts      
      └── index.test.ts      # Main entry point for the application
├── dist                     # Compiled JavaScript output from TypeScript
├── commands.txt             # Example commands file (if using file input)
├── jest.config.js           # Jest configuration
├── package.json             # Project configuration and dependencies
└── tsconfig.json            # TypeScript configuration
```
