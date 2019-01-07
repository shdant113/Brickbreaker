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

// OBJECTS

const ball = { // ball object
	x: 450,
	vx: -10,
	y: 635,
	vy: -10,
	color: 'aqua',
	radius: 15,
	createBall() { // creating a circle
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

const paddle = { // paddle object
	x: 400,
	y: 650,
	width: 150,
	color: 'red',
	createPaddle() { // creating a rectangle with a border
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.rect(this.x, this.y, 150, 30);
		ctx.fill();
		ctx.stroke();
	},
	movePaddleLeft() { // method for moving paddle to the left
		this.createPaddle();
		this.x-=80;
		while (this.x < 1) { // if paddle hits left border, it stops going left
			this.x+=1;
		}
	},
	movePaddleRight() { // method for moving paddle to the right
		this.createPaddle();
		this.x+=80;
		while (this.x > 749) { // width of canvas is 900, but width of paddle is 150, so hardcoded paddle boundary to 900 - 150
			this.x-=1;
		}
	}
}

const brick = { // brick object
	x: 36,
	y: 20,
	width: 70,
	color: 'yellow',
	createBricks() { // method for creating bricks --> may need updating depending on whether or not I can hardcode brick creation once logic to destroy bricks is added
		for (let i = 50; i < w; i+=90) { // 9 across
			for (let j = 20; j < h; j+=40) { // 6 down
				if (i < 810 && j < 260) { // stops bricks from being created after certain points on the board
					ctx.fillStyle = "yellow";
					ctx.beginPath();
					ctx.rect(i, j, 70, 10);
					ctx.fill();
				}
			}
		}
	}
}

function animate() { // animation function
	// ctx.clearRect(0, 0, w, h); // clear
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // adding a trailing effect
  	ctx.beginPath();
  	ctx.rect(0, 0, w, h);
  	ctx.fill();
	ball.createBall();
	paddle.createPaddle();
	ball.x += ball.vx; // movement of ball horizontally
	ball.y += ball.vy; // movement of ball vertically
	if (ball.y + ball.vy > h || ball.y + ball.vy < 0) { // vertical boundary established by reversing the vertical movement of the ball if it meets the boundary
		ball.vy = -ball.vy
	}
	if (ball.x + ball.vx > w || ball.x + ball.vx < 0) { // horizontal boundary " " " 
		ball.vx = -ball.vx
	}
	// logic for contact between ball and paddle
	if (ball.y + ball.vy > 650) { // paddle y = 650
		if (ball.x > paddle.x) { // if x coordinate of the ball is greater than the left edge of the paddle
			if (ball.x < paddle.x + paddle.width) { // if the x coordinate of the ball is less than the right edge of the paddle
				ball.vy = -ball.vy // reverse direction of ball
			} else {
				// game over
			}
		}
	}
	amt = window.requestAnimationFrame(animate);
} 


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
	ball.createBall();
	paddle.createPaddle();
	brick.createBricks();
	ctx.save();
	animate();
	ctx.restore();
});













