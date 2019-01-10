// LEVEL 1 SCRIPT

// grab canvas
const level1Canvas = document.getElementById('level1-canvas');
const ctxLevel1 = level1Canvas.getContext('2d');

// empty variable
let amt;
let amtEnd;

// lazy programming
const w = level1Canvas.width;
const h = level1Canvas.height;

// color array
const colors = ['#cc0000', '#00cc00', '#cc33ff', '#ff275d', '1a1aff', '#6600cc', '#ffff00', '#0000ff', '#ff33cc', '#ff9933'];

let stopped = false;

// CLASS

class Brick {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.color = colors[parseInt(Math.random() * colors.length)];
		this.shadow = this.color
		this.width = 70;
		this.height = 20;
	}
	draw() { 
		// canvas -- just draw one brick
		ctxLevel1.beginPath();
		ctxLevel1.rect(this.x, this.y, this.width, this.height);
		ctxLevel1.strokeStyle = 'black';
		ctxLevel1.fillStyle = this.color; // random color generation from array
		ctxLevel1.lineWidth = 3;
		ctxLevel1.shadowColor = this.shadow;
		ctxLevel1.shadowBlur = 15;
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
	score: 0,
	bricksArray: [],
	coordinates: [],
	gameOver() {
		$('#level1').hide();
		$('#game-over').show();
		stopped = true;
	},
	playAgain() {
		stopped = true;
		$('#game-over').hide();
		$('#level1').show();
		this.level = 1;
		this.lives = 3;
		$('#lives-text').text("Lives: " + this.lives);
		$('#level-text').text("Level: " + this.level);
		stopped = false;
	},
	loseALife() {
		--this.lives;
		$('#lives-text').text("Lives: " + this.lives);
		ball.resetBall();
		paddle.resetPaddle();
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
	// // collision
	// // while ball x value > upper left edge of brick - brick height && if ball y value > upper left edge of brick {

	// 	// ISSUES

	// 	// ball goes through top of bricks, reverses when it hits the bottom
	// 	// ball does not go back to the left or back to the right when it hits the side of a brick
	// 	// 

	// 	// POSSIBLE

	// 	// left edge of ball contacts 
	// 		// right edge of brick --> incl corners
	// 			// if ball.y >= y value corresponding with brick.x + brick.width AND <= (y value corresponding with brick.x + brick.width) - brick.height 
	// 				// reverse ball.vx
	// 	// right edge of ball contacts
	// 		// left edge of brick --> incl corners
	// 			// ball.y >= brick.x AND <= brick.x - brick.height
	// 				// reverse ball.vx
	// 	// top edge of ball contacts 
	// 		// bottom of brick --> no corners
	// 			// ball.x > brick.x - brick.height AND < brick.x - brick.height + brick.width
	// 				// reverse ball.vy
	// 	// bottom edge of ball contacts
	// 		// top of brick --> no corners
	// 			// ball.x > brick.x AND < brick.x + brick.width
	// 				// reverse ball.vy


	// 	// ball.x > brick.x AND < brick.x + brick.width
	// 	// ball.y > brick.y AND < brick.y + brick.height 

	// 	// let ballLeft = ball.x - ball.radius
	// 	// let ballRight = ball.x + ball.radius
	// 	// let ballTop = ball.y - ball.radius
	// 	// let ballBottom = ball.y + ball.radius
	// 	for (let i = 0; i < this.bricksArray.length; i++) {
	// 		
	// 		if (ball.x >= this.bricksArray[i].x && ball.x <= this.bricksArray[i].x + this.bricksArray[i].width && ball.y > this.bricksArray[i].y && ball.y < this.bricksArray[i].y + this.bricksArray[i].height) {
	// 			if (ball.y <= this.bricksArray[i].x - this.bricksArray[i].height + this.bricksArray[i].width && ball.y >= this.bricksArray[i].x + brick.width) {
	// 				ball.vx = ball.vx * -1
	// 			}
	// 			if (ball.y >= this.bricksArray[i].x && ball.y <= this.bricksArray[i].x - this.bricksArray[i].height) {
	// 				ball.vx = ball.vx * -1
	// 			}
	// 			if (ball.x > this.bricksArray[i].x - this.bricksArray[i].height)
	// 		}
	// 	}
		for (let i = 0; i < this.bricksArray.length; i++) {
			if (
				ball.x > this.bricksArray[i].x && 
				ball.x < (this.bricksArray[i].x + this.bricksArray[i].width) && 
				ball.y > this.bricksArray[i].y && 
				ball.y < (this.bricksArray[i].y + this.bricksArray[i].height)
			) {
				console.log("brick collision")
				// RIGHT EDGE
				// GOAL: if it hits right edge, direction should change from leftard to rightward (MAYBE ADD: and the ball was, in fact, moving leftward)


				// ball x is to the left of the right side of the brick
				if (ball.x <= this.bricksArray[i].x + this.bricksArray[i].width) {
					console.log("ball x is to the left of the right side of the brick")
					// if ball is below top of brick and ball is above the bottom  
					// (ball actually between the top and bottom of brick)
					if (ball.y >= this.bricksArray[i].y && ball.y <= this.bricksArray[i].y + this.bricksArray[i].height) {
						console.log("ball actually between the top and bottom of brick")
						ball.vx = ball.vx * -1
						console.log("horizontal changes")
						this.score++
					}
				}
						// LEFT EDGE
				else if (ball.x >= this.bricksArray[i].x) {
					console.log("ball x is to the right of the left edge of the brick")
					if (ball.y >= this.bricksArray[i].y && ball.y <= this.bricksArray[i].y + this.bricksArray[i].height) {
						console.log("ball actually between the top and bottom of brick")
						ball.vx = ball.vx * -1
						console.log("horizontal changes")
						this.score++
					}
				}
						// BOTTOM EDGE NO CORNERS
				// if ball y is above the bottom of this brick
				else if (ball.y <= this.bricksArray[i].y + this.bricksArray[i].height) {
					console.log("ball passed bottom edge of brick")
					if (ball.x > this.bricksArray[i].x && ball.x < this.bricksArray[i].x + this.bricksArray[i].width) {
						ball.vy = ball.vy * -1
						console.log("vertical changes")
						this.score++
					}
				}
						// TOP EDGE NO CORNERS
				else if (ball.y >= this.bricksArray[i].y) {
					console.log("ball passed the top edge of the brick")
					if (ball.x > this.bricksArray[i].x && ball.x < this.bricksArray[i].x + this.bricksArray[i].width) {
						ball.vy = ball.vy * -1
						console.log("vertical changes")
						this.score++
					}
				}
			this.bricksArray.splice(i, 1);
			} // if ball is colliding with brick








		// for (let i = 0; i < this.bricksArray.length; i++) {
		// 	if (ball.x - ball.radius > this.bricksArray[i].x && ball.x - ball.radius < (this.bricksArray[i].x + this.bricksArray[i].width) && ball.y - ball.radius > this.bricksArray[i].y && ball.y - ball.radius < (this.bricksArray[i].y + this.bricksArray[i].height)) {
		// 		if (ball.x - ball.radius >= this.bricksArray[i].y && ball.x - ball.radius <= this.bricksArray[i].y + this.bricksArray[i].height) {
		// 			ball.vx = ball.vx * -1
		// 		}
		// 		if (ball.x - ball.radius >= this.bricksArray[i].x && ball.y - ball.radius <= this.bricksArray[i].y + this.bricksArray[i].width) {
		// 			ball.vy = ball.vy * -1
		// 		} else {
		// 			ball.vy = ball.vy * -1
		// 		}
				// if ball hits from left
				// 	// console.log("from right ball.vx was negative is now " + ball.vx);
				// 	// console.log("from right ball.vy was  " + ball.vy)
				// }
				// if the ball hits from the top
				// if (ball.y - ball.radius === this.bricksArray[i].y) {
				// 	ball.vy = ball.vy * -1
					// console.log("from top ball.vx is positive and" + ball.vx)
					// console.log("from top ball.vy is was positive is now " + ball.vy)
				// // if the ball hits from the bottom 
				// if (ball.y = this.bricksArray[i].y + this.bricksArray[i].height) {
				// 	ball.vy = ball.vy * -1
				// 	// console.log("from bottom ball.vx is was positive and should stay positive, is now " + ball.vx)
				// 	// console.log("from bottom ball.vy is was negative is now " + ball.vy)
	

			// if (ball.x + ball.radius === this.bricksArray[i].x || ball.x - ball.radius === (this.bricksArray[i].x + this.bricksArray[i].width) {
			// 	ball.vx = 
			// } && ball.y - ball.radius > this.bricksArray[i].y && ball.y - ball.radius < (this.bricksArray[i].y + this.bricksArray[i].height))
			// }
		} // for each bric k

		// delete all the bricks at saved indices
	},
	createBricks(x, y) {
		// loop for up to num of bricks
		for (let i = 0; i < this.columns; i++) {
			for (let j = 0; j < this.rows; j++) {
				let x = i * (60 + 30) + 55; // x  = index * (width + space)
				let y = j * (40 + 10) + 30; // y  = index * (height + space)
				let brick = new Brick(x, y);
				this.bricksArray.push(brick);
			}
		}
		this.drawBricks();
		// console.log(this.bricksArray)
	},
	// getBrickCoordinates() {
	// 	const theCoordinates = level1Canvas.getBoundingClientRect();
	// 	for (let i = 0; i < this.bricksArray.length; i++) {
	// 		const theX = this.bricksArray[i].clientX - theCoordinates.left;
	// 		const theY = this.bricksArray[i].clientY - theCoordinates.top;
	// 		console.log("x: " + theX + ", y: " + theY)
	// 	}
	victoryCondition() {
		if (this.score === 54) {
			$('#level1').hide();
			$('#you-win').show();
			$('#game-over').hide();
		}
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
		if (this.y + this.vy < 0 + this.radius) { // top vertical boundary established by reversing the vertical movement of the ball if it meets the boundary
			this.vy = -this.vy
		}
		else if (this.y + this.vy > 700) { // bottom vertical boundary established by resetting paddle and ball if ball goes off screen
			if (game.lives > 1) { // losing a life
				game.loseALife();
			} else {
				game.gameOver(); // game ending
			}
		}
		else if (this.x + this.vx > w - this.radius || this.x + this.vx < 0 + this.radius) { // horizontal boundary " " " 
			this.vx = -this.vx
		}
		game.removeBricks();
	},
	paddleCollisions() {
		// logic for contact between ball and paddle
		if (this.y + this.vy > 650 - ball.radius) { // paddle y = 650
			if (this.x > paddle.x) { // if x coordinate of the ball is greater than the left edge of the paddle
				if (this.x < paddle.x + paddle.width) { // if the x coordinate of the ball is less than the right edge of the paddle
					this.vy = -this.vy // reverse direction of ball
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
	game.victoryCondition();
	// console.log('animaation running');
	if(!stopped) {
		setTimeout(()=>{
			amt = window.requestAnimationFrame(animate);
		}, 100)	
	}
}

$('#level1').hide();
// $('#lost-a-life').hide();
$('#game-over').hide();
$('#you-win').hide();

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
	if(key ==="Enter") stop();
});

$('#start-game').on('click', (e) => {
	ball.drawBall();
	paddle.drawPaddle();
	game.createBricks();
	animate();
	$('#start-screen').hide();
	$('#level1').show();
});

$('#pause-button').on('click', (e) => {
	if (!stopped) {
		stopped = true;
		$('#pause-button').text('Unpause');
	} else if (stopped) {
		stopped = false;
		$('#pause-button').text('Pause');
	}
});

$('#end-button').on('click', (e) => {
	$('#level1').hide();
	$('#game-over').show();
});

$('.play-again').on('click', (e) => {
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
	$('.start').velocity("fadeOut", {duration: 1000}, {visibility: 'visible'});
	$('.start').velocity("fadeIn", {duration: 1000}, {visibility: 'visible'});
	$('.play-again').velocity("fadeOut", {duration: 1000}, {visibility: 'visible'});
	$('.play-again').velocity("fadeIn", {duration: 1000}, {visibility: 'visible'});
});









