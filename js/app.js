// LEVEL 1 SCRIPT

// grab canvas
const level1Canvas = document.getElementById('level1-canvas');
const ctxLevel1 = level1Canvas.getContext('2d');

// empty variable
let amt;

// lazy programming
const w = level1Canvas.width;
const h = level1Canvas.height;

// color array
const colors = ['#edb3f6', '#41027d', '#82e0b0', '#2b9a53', '#8287d4', '#9702ec', '#85cb71', '#903934', '#1730c8', '#995f86'];

// CLASS

class Brick {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = colors[parseInt(Math.random() * colors.length)];
		this.width = 70;
		this.height = 20;
	}
	draw() { 
		// canvas -- just draw one brick
		ctxLevel1.beginPath();
		ctxLevel1.rect(this.x, this.y, this.width, this.height);
		ctxLevel1.strokeStyle = 'black';
		ctxLevel1.fillStyle = this.color; // random color generation from array
		ctxLevel1.lineWidth = 1;
		ctxLevel1.shadowColor = 'black';
		ctxLevel1.shadowBlur = 3;
		ctxLevel1.fill();
		ctxLevel1.stroke();
	}
}

// OBJECTS

const game = {
	lives: 3,
	level: 1,
	rows: 6,
	columns: 9,
	bricksArray: [],
	gameOver() {
		$('#level1').hide();
		$('#game-over').show();
	},
	playAgain() {
		$('#game-over').hide();
		$('#level1').show();
		this.level = 1;
		this.lives = 3;
		$('#lives-text').text("Lives: " + this.lives);
		$('#level-text').text("Level: " + this.level);
	},
	loseALife() {
		--this.lives;
		$('#lives-text').text("Lives: " + this.lives);
		// $('#level1').hide();
		// $('#lost-a-life').show();
	},
	drawBricks() { 
		// iterater over this.bricks
		// call brick.draw for each brick
		this.bricksArray.forEach((brick) => {
			brick.draw();
		})
	},
	removeBricks() {
	// collision
	// while ball x value > upper left edge of brick - brick height && if ball y value > upper left edge of brick {
		for (let i = 0; i < this.bricksArray.length; i++) {
			if (ball.x > this.bricksArray[i].x && ball.x < (this.bricksArray[i].x + this.bricksArray[i].width) && ball.y > this.bricksArray[i].y && ball.y < (this.bricksArray[i].y + this.bricksArray[i].height)) {
				ball.vx = -ball.vx;
				ball.vy = -ball.vy;
				console.log('brick collision');
			};
		}
	},
	// 			// if ball x value < left edge of brick + width && if ball y value < upper left edge + height
	// 				// reverse direction of ball
	// 				// remove brick from displayed array .pop
	// },
	createBricks(x, y) {
		// loop for up to num of bricks
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				let x = i * (70 + 70) + 50; // x  = index * (width + space)
				let y = j * (40 + 10) + 30; // y  = index * (height + space)
				let brick = new Brick(x, y);
				this.bricksArray.push(brick);
			}
		}
		this.drawBricks();
		// console.log(this.bricksArray)
	},
	trailingEffect() {
		ctxLevel1.fillStyle = 'rgba(255, 255, 255, 0.5)'; // adding a trailing effect
	  	ctxLevel1.beginPath();
	  	ctxLevel1.rect(0, 0, w, h);
	  	ctxLevel1.fill();
	},
	background() {
		ctxLevel1.strokeStyle = 'navy';
		ctxLevel1.lineWidth = 5;
		ctxLevel1.shadowColor = 'navy';
		ctxLevel1.shadowBlur = 20;
		for (let i = -38.5; i < w; i+=140) {
			ctxLevel1.beginPath();
			ctxLevel1.moveTo(i, 0);
			ctxLevel1.lineTo(i, h);
			ctxLevel1.stroke();
		}
		for (let i = -5; i < h; i+=40) {
			ctxLevel1.beginPath();
			ctxLevel1.moveTo(0, i);
			ctxLevel1.lineTo(w, i);
			ctxLevel1.stroke();
		}
		ctxLevel1.shadowBlur = 0;
		ctxLevel1.lineWidth = 20;
		ctxLevel1.beginPath();
		ctxLevel1.rect(0, 0, 900, 700);
		ctxLevel1.stroke();
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
		ctxLevel1.beginPath();
		ctxLevel1.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctxLevel1.fillStyle = this.color;
		ctxLevel1.shadowBlur = 0;
		ctxLevel1.strokeStyle = 'black'
		ctxLevel1.lineWidth = 5;
		ctxLevel1.fill();
		ctxLevel1.stroke();
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
			} else {
				game.gameOver(); // game ending
			}
		}
		else if (this.x + this.vx > w || this.x + this.vx < 0) { // horizontal boundary " " " 
			this.vx = -this.vx
		}
		game.removeBricks();
	},
	paddleCollisions() {
		// logic for contact between ball and paddle
		if (this.y + this.vy > 650) { // paddle y = 650
			if (this.x > paddle.x) { // if x coordinate of the ball is greater than the left edge of the paddle
				if (this.x < paddle.x + paddle.width) { // if the x coordinate of the ball is less than the right edge of the paddle
					this.vy = -this.vy // reverse direction of ball
				}
			}
		}
	}
	// brickCollisions() {
	// 	for (let i = 0; i < game.brickArray.length; i++) {
	// 		if ((ball.x > game.brickArray[i].x) {

	// 		}
	// 	}
	// 	-this.vy;
	// }
}

const paddle = { // paddle object
	x: 375,
	y: 650,
	width: 150,
	color: 'yellow',
	drawPaddle() { // creating a rectangle with a border
		ctxLevel1.fillStyle = this.color;
		ctxLevel1.strokeStyle = 'black';
		ctxLevel1.lineWidth = 3;
		ctxLevel1.shadowColor = 'black';
		ctxLevel1.shadowBlur = 20;
		ctxLevel1.beginPath();
		ctxLevel1.rect(this.x, this.y, 150, 30);
		ctxLevel1.fill();
		ctxLevel1.stroke();
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

// FUNCTIONS

function animate() { // animation function
	game.trailingEffect();
	game.background();
	game.drawBricks();
	ball.drawBall();
	paddle.drawPaddle();
	ball.movementLogic();
	ball.boundariesLogic();
	ball.paddleCollisions();
	// console.log('animaation running');
	amt = window.requestAnimationFrame(animate);
}

$('#level1').hide();
// $('#lost-a-life').hide();
$('#game-over').hide();

// EVENT LISTENERS

$(document).on('keydown', (e) => {
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

$('#start-game').on('click', (e) => {
	ball.drawBall();
	paddle.drawPaddle();
	game.createBricks();
	animate();
	$('#start-screen').hide();
	$('#level1').show();
});

$('#end-button').on('click', (e) => {
	$('#level1').hide();
	$('#game-over').show();
})

$('#play-again').on('click', (e) => {
	// ANIMATION SLOWS DOWN DRAMATICALLY EVERY TIME THIS RUNS
	game.playAgain();
	paddle.resetPaddle();
	// paddle.drawPaddle();
	ball.resetBall();
	// ball.drawBall();
	game.createBricks();
	$('#level1').show();
});

$(document).on('mousemove', (e) => {
	$('.start').velocity("fadeOut", {delay: 500, duration: 1000});
	$('.start').velocity("fadeIn", {duration: 1000});
	$('#play-again').velocity("fadeOut", {delay: 500, duration: 1000});
	$('#play-again').velocity("fadeIn", {duration: 1000});
});









