// console.log('thing')

// LEVEL 1 SCRIPT

// grab canvas
let level1Canvas = document.getElementById('level1-canvas');
const ctxLevel1 = level1Canvas.getContext('2d');

// empty variable
let amt;

// lazy programming
let w = level1Canvas.width;
let h = level1Canvas.height;

// brick variables

// CLASS

class Brick {
	constructor(x, y, color, width, height) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;
	}
	draw() {
		// canvas -- just draw one brick
		ctxLevel1.strokeStyle = 'black';
		ctxLevel1.fillStyle = this.color; // random color generation from array
		ctxLevel1.lineWidth = 1;
		ctxLevel1.shadowColor = 'black';
		ctxLevel1.shadowBlur = 3;
		ctxLevel1.beginPath();
		ctxLevel1.rect(this.x, this.y, this.width, this.height);
		ctxLevel1.fill();
		ctxLevel1.stroke();
	}
}

// OBJECTS

const game = {
	lives: 3,
	level: 1,
	bricks: [],
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
	drawBricks(numOfBricks) {
		for (let i = 0; i < numOfBricks; i++) {
			this.drawBoard();
		}
		// iterater over this.bricks
		// call brick.draw for each brick
	},
	removeBricks() {

	},
	createBrick(x, y, color, width, height) {
		// loop up to how ever many bricks you want
		// instantiate push them into this.bricks
		let brick = new Brick(x, y, color, width, height);
		console.log(brick);
		this.bricks.push(brick);
		brick.draw();
	},
	drawBoard() {
		const betweenX = 100; // space between Xs
		const betweenY = 40; // space between Ys
		let x = 50; // initial X on first brick
		let y = 0; // initial Y
		if (this.bricks.length > 0) { // if not first brick
			x = this.bricks[this.bricks.length - 1].x; // x = value of x of last indexed brick 
			y = this.bricks[this.bricks.length - 1].y; // y = y value of last indexed brick
			if (this.bricks[this.bricks.length - 1].x > w - 70) { // if the last x (top left) value is higher than the width of the canvas minus the width of a brick, stop making bricks
				x = 50;
				y += betweenY; // go to building next row
			} else {
				x += betweenX; // if not going to next row, space between next brick
			}
		}
		console.log(x, y, 'red', 70, 20);
		this.createBrick(x, y, 'red', 70, 20);
	},
		// for (let i = 0; i < level1Bricks.rows; i++) { // 9 across
		// 	for (let j = 0; j < level1Bricks.columns; j++) { // 6 down
		// 		let brick = new Brick(x, y, color, width, height);
		// 		level1Bricks.x = [i] * (level1Bricks.width + level1Bricks.spaceBetween) + 50;
		// 		// x = the width of the brick + the set space between bricks + 50 (space between first brick and wall)
		// 		// multiply by i because each brick is evenly spaced, so each index * the result spaces the bricks properly
		// 		level1Bricks.y = [j] * (level1Bricks.height + level1Bricks.spaceBetween) + 10;
		// 		this.theBricks.push(brick);
		// 	}
		// }
	// drawBricks() {
		/*
		this.pushtoArray();
		this.pullXFromArray();
		this.pullYFromArray();
		ctxLevel1.strokeStyle = 'black';
		ctxLevel1.fillStyle = level1Bricks.color[level1Bricks.index]; // random color generation from array
		ctxLevel1.lineWidth = 1;
		ctxLevel1.shadowColor = 'black';
		ctxLevel1.shadowBlur = 3;
		ctxLevel1.beginPath();
		ctxLevel1.rect(level1Bricks.x, level1Bricks.y, level1Bricks.width, level1Bricks.height);
		ctxLevel1.fill();
		ctxLevel1.stroke();
		*/

		// for (let i = 0; i < level1Bricks.rows; i++) {
		// 	this.theBricks[i].push();
		// 	for (let j = 0; j < level1Bricks.columns; j++) {
		// 		this.theBricks[i][j].push();
		// 	}
	// },
	// pushtoArray() {
	// 	for (let i = 0; i < level1Bricks.rows; i++) { // 9 across
	// 		for (let j = 0; j < level1Bricks.columns; j++) { // 6 down
	// 			level1Bricks.x = [i] * (level1Bricks.width + level1Bricks.spaceBetween) + 50;
	// 			// x = the width of the brick + the set space between bricks + 50 (space between first brick and wall)
	// 			// multiply by i because each brick is evenly spaced, so each index * the result spaces the bricks properly
	// 			level1Bricks.y = [j] * (level1Bricks.height + level1Bricks.spaceBetween) + 10;
	// 			this.theBricks.push(level1Bricks.x, level1Bricks.y);
	// 		}
	// 	}
	// }
}
				// collision
					// if ball x value > upper left edge of brick && if ball y value > upper left edge of brick
						// if ball x value < left edge of brick + width && if ball y value < upper left edge + height
							// reverse direction of ball
							// remove brick from displayed array

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

const level1Bricks = { // brick object
	x: 0,
	y: 0,
	columns: 9,
	rows: 6,
	height: 10,
	width: 70,
	spaceBetween: 20,
	spaceAbove: 20,
	index: Math.random(10),
	color: ['#edb3f6', '#41027d', '#82e0b0', '#2b9a53', '#8287d4', '#9702ec', '#85cb71', '#903934', '#1730c8', '#995f86']
}
	// createBricks() { // method for creating bricks --> may need updating depending on whether or not I can hardcode brick creation once logic to destroy bricks is added
		// for (let i = 50; i < w; i+=90) { // 9 across
		// 	for (let j = 20; j < h; j+=40) { // 6 down
		// 		if (i < 810 && j < 260) { // stops bricks from being created after certain points on the board
		// 			ctxLevel1.fillStyle = this.color;
		// 			ctxLevel1.strokeStyle = "black";
		// 			ctxLevel1.beginPath();
		// 			ctxLevel1.rect(i, j, 70, 10);
		// 			ctxLevel1.fill();
		// 			ctxLevel1.stroke();
		// 		}
		// 	}
		// }
	// }

// FUNCTIONS

function trailingEffect() {
	ctxLevel1.fillStyle = 'rgba(255, 255, 255, 0.5)'; // adding a trailing effect
  	ctxLevel1.beginPath();
  	ctxLevel1.rect(0, 0, w, h);
  	ctxLevel1.fill();
}

function background() {
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
	game.drawBricks(54);
	// let bricks = new Brick();
	// bricks.draw();
	// game.createBricks()
	// game.drawBricks()
	animate();
	$('#start-screen').hide();
	$('#level1').show();
});

document.getElementById('end-button').addEventListener('click', (e) => {
	$('#level1').hide();
	$('#game-over').show();
})

document.getElementById('play-again').addEventListener('click', (e) => {
	// TO FIX, MAKE THE SAME AS START GAME BUTTON	
	game.playAgain();
	paddle.resetPaddle();
	ball.resetBall();
});

document.addEventListener('mousemove', (e) => {
	$('.start').velocity("fadeOut", {delay: 500, duration: 1000});
	$('.start').velocity("fadeIn", {duration: 1000});
	$('#play-again').velocity("fadeOut", {delay: 500, duration: 1000});
	$('#play-again').velocity("fadeIn", {duration: 1000});
});









