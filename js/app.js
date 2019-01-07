console.log('thing')

let level1Canvas = document.getElementById('level1-canvas');
const ctx = level1Canvas.getContext('2d');

// CLASSES





















// OBJECTS

const ball = {
	x: 450,
	y: 635,
	color: 'neon',
	radius: 15,
	createBall() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
		ctx.fillStyle = "aqua";
		ctx.fill();
	},
}

const paddle = {
	x: 400,
	y: 650,
	color: 'black',
	createPaddle() {
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.rect(this.x, this.y, 100, 30);
		ctx.fill();
	},
}

const brick = {
	x: 36,
	y: 20,
	color: 'yellow',
	createOneBrick() {
		
	},
	createRowOfBricks() {
		for (let i = 50; i < level1Canvas.width; i+=90) {
			for (let j = 20; j < level1Canvas.height; j+=40) {
				if (i < 810 && j < 260) {
					ctx.fillStyle = "yellow";
					ctx.beginPath();
					ctx.rect(i, j, 70, 10);
					ctx.fill();
				}
			}
		}
	}

}

ball.createBall();
paddle.createPaddle();
// brick.createOneBrick();
brick.createRowOfBricks();



















// EVENT LISTENERS















