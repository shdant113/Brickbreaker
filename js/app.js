console.log('thing')

let level1Canvas = document.getElementById('level1-canvas');
const ctx = level1Canvas.getContext('2d');

// CLASSES





















// OBJECTS

const ball = {
	x: 400,
	y: 735,
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
	x: 350,
	y: 750,
	color: 'black',
	createPaddle() {
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.rect(this.x, this.y, 100, 30);
		ctx.fill();
	},
}

const brick = {
	x: 30,
	y: 20,
	color: 'yellow',
	createBricks() {
		ctx.fillStyle = "yellow";
		ctx.beginPath();
		ctx.rect(this.x, this.y, 60, 10);
		ctx.fill();
	}
}

ball.createBall();
paddle.createPaddle();
brick.createBricks();



















// EVENT LISTENERS















