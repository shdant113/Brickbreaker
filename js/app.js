// console.log('thing')

// LEVEL 1 JAVASCRIPT

let level1Canvas = document.getElementById('level1-canvas');
const ctx = level1Canvas.getContext('2d');
let amt;
let w = level1Canvas.width;
let h = level1Canvas.height;

// CLASSES

// class Canvas {
// 	constructor() {
// 		$('level1Canvas').css('background-color', 'blue');
// 	}
// }

// let newCanvas = new Canvas;

















// OBJECTS

const ball = {
	x: 450,
	vx: -10,
	y: 635,
	vy: -10,
	color: 'aqua',
	radius: 15,
	createBall() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
}

function animate() {
	ctx.clearRect(0, 0, w, h);
	ball.createBall();
	ball.x += ball.vx;
	ball.y += ball.vy;
	if (ball.y + ball.vy > h || ball.y + ball.vy < 0) {
		ball.vy = -ball.vy
	}
	if (ball.x + ball.xy > w || ball.x + ball.xy < 0) {
		ball.xy = -ball.xy
	}
	amt = window.requestAnimationFrame(animate);
}


const paddle = {
	x: 400,
	y: 650,
	color: 'red',
	createPaddle() {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.rect(this.x, this.y, 100, 30);
		ctx.fill();
		ctx.stroke();
	},
	movePaddleLeft() {
		this.createPaddle();
		this.x-=40;
		while (this.x < 0) {
			this.x+=1;
		}
	},
	movePaddleRight() {
		this.createPaddle();
		this.x+=40;
		while (this.x > 800) {
			this.x-=1;
		}
	}
}

const brick = {
	x: 36,
	y: 20,
	color: 'yellow',
	createBricks() {
		for (let i = 50; i < w; i+=90) {
			for (let j = 20; j < h; j+=40) {
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
	if (key === "ArrowLeft" || key === "a") {
		paddle.movePaddleLeft();
	}
	// MOVE PADDLE RIGHT
	if (key === "ArrowRight" || key === "d") {
		paddle.movePaddleRight();
	}
});

document.getElementById('start-game').addEventListener('click', (e) => {
	ball.createBall();
	paddle.createPaddle();
	brick.createBricks();
	animate();
});













