import {Direction} from "../enums/Direction";


export class Robot {
    private x: number| null = null;
    private y: number| null = null;
    private facing: Direction|null = null;
    private gridSize: number = 5;

    /**
     * Returns the current position and facing direction of the robot.
     */
    getPosition() {
        return { x: this.x, y: this.y, facing: this.facing };
    }

    /**
     * Places the robot at the given x, y coordinates and facing the specified direction.
     * If the position is outside the grid or the direction is invalid, the placement is ignored.
     *
     * @param x - The x-coordinate to place the robot.
     * @param y - The y-coordinate to place the robot.
     * @param facing - The direction the robot should face (NORTH, EAST, SOUTH, WEST).
     */
    place(x: number, y: number, facing: Direction): void {
        if (!this.isValidPosition(x, y)) {
            console.log(`Ignoring placement: (${x}, ${y}) is outside the grid boundaries.`);
            return;
        }

        if (!Object.values(Direction).includes(facing)) {
            console.log(`Ignoring placement: Invalid facing direction ${facing}.`);
            return;
        }

        this.x = x;
        this.y = y;
        this.facing = facing;
    }

    /**
     * Moves the robot one unit forward in the direction it is currently facing.
     * If the move result in going outside the grid, the move is ignored.
     */
    move(): void {
        if (this.x === null || this.y === null || this.facing === null) {
            console.log('Ignoring move: Robot has not been placed.');
            return;
        }

        let newX = this.x;
        let newY = this.y;
        switch (this.facing) {
            case Direction.NORTH:
                newY += 1;
                break;
            case Direction.SOUTH:
                newY -= 1;
                break;
            case Direction.EAST:
                newX += 1;
                break;
            case Direction.WEST:
                newX -= 1;
                break;
        }

        if (this.isValidPosition(newX, newY)) {
            this.x = newX;
            this.y = newY;
        } else {
            console.log(`Ignoring move: (${newX}, ${newY}) is outside the grid boundaries.`);
        }
    }

    /**
     * Rotates the robot 90 degrees to the right (clockwise).
     */
     right() {
        switch (this.facing) {
            case Direction.NORTH:
                this.facing =  Direction.EAST;
                break;
            case Direction.EAST:
                this.facing =  Direction.SOUTH;
                break;
            case Direction.SOUTH:
                this.facing =  Direction.WEST;
                break;
            case Direction.WEST:
                this.facing =  Direction.NORTH;
                break;
        }
    }

    /**
     * Rotates the robot 90 degrees to the left (counterclockwise).
     */
     left() {
        switch (this.facing) {
            case Direction.NORTH:
                this.facing =  Direction.WEST;
                break;
            case Direction.WEST:
                this.facing =  Direction.SOUTH;
                break;
            case Direction.SOUTH:
                this.facing =  Direction.EAST;
                break;
            case Direction.EAST:
                this.facing =  Direction.NORTH;
                break;
        }
    }

    /**
     * Outputs the current position and facing direction of the robot.
     * If the robot has not been placed, this method does nothing.
     */
    report(): void {
        if (this.x !== null && this.y !== null && this.facing !== null) {
            console.log(`Output: ${this.x},${this.y},${this.facing}`);
        }
    }

    /**
     * Checks if the given x and y coordinates are within the boundaries of the grid.
     *
     * @param x - The x-coordinate to check.
     * @param y - The y-coordinate to check.
     * @returns boolean - True if the position is valid, otherwise false.
     */
    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x <= this.gridSize && y >= 0 && y <= this.gridSize;
    }
}