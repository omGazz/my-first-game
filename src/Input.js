export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class Input {
    constructor() {
        this.heldDirections = [];

        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case "ArrowUp" || "KeyW": return this.onArrowPressed(UP);
                case "ArrowDown" || "KeyS": return this.onArrowPressed(DOWN);
                case "ArrowLeft" || "KeyA": return this.onArrowPressed(LEFT);
                case "ArrowRight" || "KeyD": return this.onArrowPressed(RIGHT);
            }
        })

        document.addEventListener('keyup', (e) => {
            switch (e.code) {
                case "ArrowUp" || "KeyW": return this.onArrowReleased(UP);
                case "ArrowDown" || "KeyS": return this.onArrowReleased(DOWN);
                case "ArrowLeft" || "KeyA": return this.onArrowReleased(LEFT);
                case "ArrowRight" || "KeyD": return this.onArrowReleased(RIGHT);
            }
        })
    }

    get direction() {
        return this.heldDirections[0];
    }

    onArrowPressed(direction){
        if(this.heldDirections.indexOf(direction) === -1){
            this.heldDirections.unshift(direction);
        }
    }

    onArrowReleased(direction){
        const index = this.heldDirections.indexOf(direction);
        if(index === -1) return;

        this.heldDirections.splice(index, 1);
    }
}