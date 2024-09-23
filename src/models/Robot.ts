import {Direction} from "../enums/Direction";


export class Robot {
    private x: number| null = null;
    private y: number| null = null;
    private facing: Direction|null = null;
    private gridSize: number = 5;

    getPosition() {
        return { x: this.x, y: this.y, facing: this.facing };
    }

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

    report(): void {
        if (this.x !== null && this.y !== null && this.facing !== null) {
            console.log(`Output: ${this.x},${this.y},${this.facing}`);
        }
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x <= this.gridSize && y >= 0 && y <= this.gridSize;
    }
}