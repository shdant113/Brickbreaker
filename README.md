# Brickbreaker

Wireframes

Follow the links for screenshots, 3 total:

https://puu.sh/CsQ6X/12130e674e.png || https://puu.sh/CsQ7c/beb327af6b.png || https://puu.sh/CsQ82/f1a4b4e616.png


==============


User stories



*****DEFAULT PADDLE CONTROL*****

• game begins --> paddle is in the bottom-center of the screen

• user presses left arrow --> paddle goes left

• user presses right arrow --> paddle goes right

• paddle cannot go up or down



*****ALTERNATE PADDLE CONTROL*****

• user presses 'a' --> paddle goes left

• user presses 'd' --> paddle goes right



*****BUTTONS*****

• user presses start button --> game begins, paddle is in the bottom-center of the screen

  a) ball starts in the center of the paddle, goes 45 degrees up to the left
  
• user presses pause button --> game pauses, restarts with paddle in the bottom-center

  a) to unpause, user presses pause button again
  
  b) pause button will read "unpause" when the game is paused
  
• user presses end game button --> "game over" message appears




*****THE BALL*****

• at game start, the ball begins going 45 degrees up to the left

• if the ball contacts a brick, it will be returned at a 45 degree angle the opposite direction (or a 90 degree angle) from the direction it was initially traveling

• if the ball contacts a boundary, it will be returned at a 45 degree angle the opposite direction (or a 90 degree angle)

• if the ball does not contact the paddle at the bottom of the screen, user loses one life

  a) upon losing a life, paddle is returned to the bottom-center and the ball goes 45 degrees up to the left
  
• if the ball contacts the paddle, it will be returned upward at a 45 degree angle the opposite direction (or a 90 degree angle)

• if the user presses pause, ball is hidden

  a) starts with the paddle in the bottom-center when pause button (reading "unpause") is pressed again




*****THE BRICKS*****

• if the ball contacts a brick, the brick will be removed from the board and will no longer act as an obstacle to the ball's travel

• if the user presses start button, bricks will appear at the top of the board in a 9x6 grid with some open space between each boundary

• if the user presses pause button, bricks will not be reset upon unpause

• if all of the bricks have been hit by the ball, the game will advance to the next level

  a) (not sure if I will have time to design more than one level, but if I do:
  
    1.) level 2 --> bricks will appear in a 9x9 grid, ball will move slightly faster
    
    2.) level 3 --> bricks will appear in a 9x6 grid with a 9x1 row of bricks that must be hit twice to disappear taking up           the bottom row
    
    3.) etc



*****DISPLAY*****

• Prior to game start (opening display):

  a) "Brick Breaker" --> center of screen
  
  b) Start game button --> bottom-center
  
  c) Instructions button --> bottom center, beneath start game button
  
    1.) Redirects to page titled "how to play" that includes controls, how the ball and bricks work, and the goals of the game
  
  d) Unanimated display of paddle and bricks in background
  
    1.) paddle --> bottom center
    
    2.) bricks --> 9x6 grid
    
• Whie playing game:

  a) Lives = top left
  
  b) Pause button = top center
  
  c) Level = top right
  
  d) End game button = bottom center
  
• When lives = 0 or user presses end game button:

  a) "GAME OVER" --> center of screen
  
  b) Play again button --> center of screen, beneath game over message, carries same function as start game button
  
  c) after 60 seconds on this screen, opening display is loaded
















