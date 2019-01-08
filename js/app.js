// console.log('thing')

// LEVEL 1 SCRIPT

// grab canvas
let level1Canvas = document.getElementById('level1-canvas');
const ctx = level1Canvas.getContext('2d');

// empty variable
let amt;

// lazy programming
let w = level1Canvas.width;
let h = level1Canvas.height;

// CLASS

class Brick {
	constructor(x, y, color, height, width) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.height = height;
		this.width = width;
	}
	draw() {
		game.drawBricks();
	}
}

// OBJECTS

const game = {
	lives: 3,
	level: 1,
	arrayOfBricks: [],
	gameOver() {
		$('#level1').hide();
		$('#game-over').show();
	},
	loseALife() {
		--this.lives;
		$('#lives-text').text("Lives: " + this.lives);
		// $('#level1').hide();
		// $('#lost-a-life').show();
	},
	drawBricks() {
		for (let i = 50; i < w; i+=90) { // 9 across
			for (let j = 20; j < h; j+=40) { // 6 down
				if (i < 810 && j < 260) { // stops bricks from being created after certain points on the board
					let theBricks = function(){
						ctx.fillStyle = 'orange';
						ctx.strokeStyle = "black";
						ctx.beginPath();
						ctx.rect(i, j, 70, 10);
						ctx.fill();
						ctx.stroke();
					}
					this.arrayOfBricks.push(theBricks);
				}
			}
		}
	}
}

const ball = { // ball object
	x: 450,
	vx: -10,
	y: 635,
	vy: -10,
	color: 'aqua',
	radius: 15,
	drawBall() { // creating a circle
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		// ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black'
		ctx.lineWidth = 5;
		ctx.fill();
		ctx.stroke();
	},
	resetBall() {
		this.x = 450;
		this.y = 635;
	},
	movementLogic() {
		this.x += this.vx; // movement of ball horizontally
		this.y += this.vy; // movement of ball vertically
	},
	boundariesLogic() {
		if (this.y + this.vy < 0) { // top vertical boundary established by reversing the vertical movement of the ball if it meets the boundary
		this.vy = -this.vy
		}
		else if (this.y + this.vy > 700) { // bottom vertical boundary established by resetting paddle and ball if ball goes off screen
			if (game.lives > 1) { // losing a life
				paddle.resetPaddle();
				this.resetBall();
				game.loseALife();
				console.log("lives are ", game.lives, " lives");
			} else {
				game.gameOver(); // game ending
			}
		}
		else if (this.x + this.vx > w || this.x + this.vx < 0) { // horizontal boundary " " " 
			this.vx = -this.vx
		}
	},
	paddleCollisions() {
		// logic for contact between ball and paddle
		if (this.y + this.vy > 650) { // paddle y = 650
			if (this.x > paddle.x) { // if x coordinate of the ball is greater than the left edge of the paddle
				if (this.x < paddle.x + paddle.width) { // if the x coordinate of the ball is less than the right edge of the paddle
					this.vy = -this.vy // reverse direction of ball
					// paddle.velocity(pulse);
				}
			}
		}
	}
}

const paddle = { // paddle object
	x: 375,
	y: 650,
	width: 150,
	color: 'yellow',
	drawPaddle() { // creating a rectangle with a border
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.rect(this.x, this.y, 150, 30);
		ctx.fill();
		ctx.stroke();
	},
	resetPaddle() {
		this.x = 375;
		this.y = 650;
	},
	movePaddleLeft() { // method for moving paddle to the left
		this.drawPaddle();
		this.x-=80;
		while (this.x < 11) { // if paddle hits left border, it stops going left
			this.x+=1;
		}
	},
	movePaddleRight() { // method for moving paddle to the right
		this.drawPaddle();
		this.x+=80;
		while (this.x > 739) { // width of canvas is 900, but width of paddle is 150 and border is 10px, so hardcoded paddle boundary to 900 - 150
			this.x-=1;
		}
	}
}

// const brick = { // brick object
// 	x: 36,
// 	y: 20,
// 	width: 70,
// 	color: 'orange',
// 	createBricks() { // method for creating bricks --> may need updating depending on whether or not I can hardcode brick creation once logic to destroy bricks is added
// 		// for (let i = 50; i < w; i+=90) { // 9 across
// 		// 	for (let j = 20; j < h; j+=40) { // 6 down
// 		// 		if (i < 810 && j < 260) { // stops bricks from being created after certain points on the board
// 		// 			ctx.fillStyle = this.color;
// 		// 			ctx.strokeStyle = "black";
// 		// 			ctx.beginPath();
// 		// 			ctx.rect(i, j, 70, 10);
// 		// 			ctx.fill();
// 		// 			ctx.stroke();
// 		// 		}
// 		// 	}
// 		// }
// 	}
// }

// FUNCTIONS

function trailingEffect() {
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // adding a trailing effect
  	ctx.beginPath();
  	ctx.rect(0, 0, w, h);
  	ctx.fill();
}

function background() {
	ctx.strokeStyle = 'navy';
	ctx.lineWidth = 5;
	for (let i = -30; i < w; i+=140) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, h);
		ctx.stroke();
	}
	for (let i = -5; i < h; i+=40) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(w, i);
		ctx.stroke();
	}
	ctx.lineWidth = 20;
	ctx.beginPath();
	ctx.rect(0, 0, 900, 700);
	ctx.stroke();
}

function animate() { // animation function
	trailingEffect();
	background();
	ball.drawBall();
	paddle.drawPaddle();
	ball.movementLogic();
	ball.boundariesLogic();
	ball.paddleCollisions();
	amt = window.requestAnimationFrame(animate);
}

$('#level1').hide();
// $('#lost-a-life').hide();
$('#game-over').hide();

// EVENT LISTENERS

document.addEventListener('keydown', (e) => {
	let key = event.key; // determining which key was pressed
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
	ball.drawBall();
	paddle.drawPaddle();
	let bricks = new Brick();
	bricks.draw();
	animate();
	$('#start-screen').hide();
	$('#level1').show();
});

document.getElementById('end-game').addEventListener('click', (e) => {
	$('#level1').hide();
	$('#game-over').show();
})

document.getElementById('play-again').addEventListener('click', (e) => {
	// TO FIX, MAKE THE SAME AS START GAME BUTTON	
	$('#level1').show();
	$('#game-over').hide();
});

document.addEventListener('mousemove', (e) => {
	$('.start').velocity("fadeIn", {duration: 1000});
	$('.start').velocity("fadeOut", {delay: 500, duration: 1000});
	$('#play-again').velocity("fadeIn", {duration: 1000});
	$('#play-again').velocity("fadeOut", {delay: 500, duration: 1000});
});









