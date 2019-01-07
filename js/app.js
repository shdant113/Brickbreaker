// console.log('thing')

// LEVEL 1 JAVASCRIPT

let level1Canvas = document.getElementById('level1-canvas');
const ctx = level1Canvas.getContext('2d');
let amt;

// CLASSES

class Canvas {
	constructor() {

	}
}



















// OBJECTS

const ball = {
	x: 450,
	vx: 50,
	y: 635,
	vy: 50,
	color: 'aqua',
	radius: 15,
	createBall() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	animate() {
		this.createBall();
		this.x += this.vx;
		this.y += this.vy;
		amt = window.requestAnimationFrame(this.createBall());
	}
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
	movePaddleLeft() {

	},
	movePaddleRight() {

	}
}

const brick = {
	x: 36,
	y: 20,
	color: 'yellow',
	createBricks() {
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






// EVENT LISTENERS

document.addEventListener('keydown', (e) => {
	let key = event.key;
	// MOVE PADDLE LEFT
	if (key === "ArrowLeft") {
		// move paddle left
	}
	if (key === "a") {
		// move paddle left
	}
	// MOVE PADDLE RIGHT
	if (key === "ArrowRight") {
		// move paddle right
	}
	if (key === "d") {
		// move paddle right
	}
});

document.getElementById('start-game').addEventListener('click', (e) => {
	ball.createBall();
	paddle.createPaddle();
	brick.createBricks();
	ball.animate();
})













