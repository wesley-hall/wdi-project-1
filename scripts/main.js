
$(() => {

  let score = 0
  const $scoreSpan = $('#score')

  // Characters
  class Character {
    constructor(startPosition) {
      this.startPosition = startPosition
      this.currentPosition = startPosition
    }
    // movement() {
    // }
  }

  // Characters - Pac-Man
  const pacman = new Character(370)

  // Characters - Ghosts
  class Ghost extends Character {
    constructor(startPosition, target) {
      super(startPosition)
      this.currentPosition = startPosition
      this.target = target
    }
  }

  const blinky = new Ghost(189, 42)
  const pinky = new Ghost(190)
  const inky = new Ghost(209)
  const clyde = new Ghost(210)

  const ghosts = [blinky, pinky, inky, clyde]

  // Create gamebord

  const $gameboard = $('.gameboard')
  const numOfTiles = 400

  // Create the game board with div.tile children
  function createBoard() {
    for (let i = 0; i < numOfTiles; i++) {
      $gameboard.append('<div class="tile"></div>')
      // $gameboard.append('<div id="${i} class="tile"></div>')
    }
  }

  createBoard()


  const $tiles = $('.tile')
  console.log($tiles)

  // Place food on all tiles
  function placeFood() {
    $tiles.addClass('food')
  }
  placeFood()

  // Place the walls in certain positions
  const wallsBoundaries = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359, 379, 380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400]
  const levels = {
    one: [42,43,44,45,46,49,50,53,54,55,56,57,63,69,70,76,83,86,87,88,89,90,91,92,93,96,103,116,123,127,132,136,147,152,165,166,167,172,173,174,181,182,183,189,190,196,197,198,201,202,203,209,210,216,217,218,225,226,227,232,233,234,247,252,263,267,272,276,283,296,303,306,307,308,309,310,311,312,313,316,323,329,330,336,342,343,344,345,346,349,350,353,354,355,356,357]
  }
  const wallsArray = wallsBoundaries.concat(levels.one)

  function placeWalls() {
    wallsArray.forEach(wallIndex => {
      $tiles.eq(wallIndex).removeClass('food')
      $tiles.eq(wallIndex).addClass('wall')
    })
  }

  placeWalls()




  function placePacman() {
    // Kind of works with this if.. still allows currentPosition to change but doesn't show that pacman has moved
    {
      scoring()
      $tiles.eq(pacman.currentPosition).removeClass('food')
      $tiles.removeClass('pacman')
      $tiles.eq(pacman.currentPosition).addClass('pacman')
    }

  }

  placePacman()

  // Better to create function to check if move is allowed?? Instead of if statement inside placePacman???
  // function moveIsAllowed() {
  //
  // }


  // Order is left, up, right, down)
  const directions = {
    left: -1,
    up: -20,
    right: 1,
    down: 20
  }

  const directionOptions = Object.values(directions)


  function movePacman() {
    $('body').on('keydown', (e) => {
      const previousMove = pacman.currentPosition
      let nextMove
      switch(e.keyCode) {
        case 37:
          if (pacman.currentPosition % 20 > 0) {
            nextMove = pacman.currentPosition+= directions.left
          }
          break
        case 38:
          if (pacman.currentPosition - 20 >= 0) {
            nextMove = pacman.currentPosition+= directions.up
          }
          break
        case 39:
          if (pacman.currentPosition % 20 < 19) {
            nextMove = pacman.currentPosition+= directions.right
          }
          break
        case 40:
          if (pacman.currentPosition + 20 < 400) {
            nextMove = pacman.currentPosition+= directions.down
          }
          break
      }
      if ($tiles.eq(nextMove).hasClass('wall')) {
        nextMove = previousMove
      } else {
        nextMove
        placePacman()
      }

    })
  }

  movePacman()


  function placeGhosts() {
    $tiles.removeClass('ghost blinky pinky inky clyde')
    $tiles.eq(blinky.currentPosition).addClass('ghost blinky')
    $tiles.eq(pinky.currentPosition).addClass('ghost pinky')
    $tiles.eq(inky.currentPosition).addClass('ghost inky')
    $tiles.eq(clyde.currentPosition).addClass('ghost clyde')
  }

  placeGhosts()


  let ghostDirection

  function setGhostDirection() {
    ghostDirection = directionOptions[Math.floor(Math.random() * directionOptions.length)]
    console.log(ghostDirection)
  }

  const ghostInterval = setInterval(moveGhosts, 1000)

  function moveGhosts() {
    setGhostDirection()
    blinky.currentPosition+= ghostDirection
    setGhostDirection()
    inky.currentPosition+= ghostDirection
    setGhostDirection()
    pinky.currentPosition+= ghostDirection
    setGhostDirection()
    clyde.currentPosition+= ghostDirection
    placeGhosts()
  }


  // Scoring

  function scoring() {
    if (pacman.currentPosition !== pacman.startPosition && $tiles.eq(pacman.currentPosition).hasClass('food')) {
      score+= 10
    }
    $scoreSpan.text(score)
    console.log(`score is ${score}`)
  }



  // function startGame() {
  //   console.log('start game')
  // }
  //
  // const $startButton = $('#start-game')
  // $startButton.on('click', startGame)

  const $stopGhosts = $('#stop')
  $stopGhosts.on('click', () => {
    clearInterval(ghostInterval)
  })


  // How to make ghosts move towards(/away from) target??????????
  // Chase mode?




  // target - current
  // if result is negative && result % 20 === 0, up
  // if result is positive && result % 20 === 0, down
  // if result is negative && result % 20 !== 0, left
  // if result is positive && result % 20 !== 0, right


  //-------------- IGNORE -----------------
  // if over 20
  // else if under -20, down
  // else if over 1, left
  // else if over -1, right


  // Start with different targets for each ghost as explained in game rules

  // How to set line of sight??

  // Once line of sight = true, change target to pacman position

  // If flashing blue ghosts, make negative so they run away
  // Escape mode?


})

// Move
// Remove class
// Add class elsewhere

// Move left
// current position - 1

// Move up
// current position - 20

// Move right
// current position + 1

// Move down
// current position + 20


// keyCode for arrows
// left 37
// up 38
// right 39
// down 40
