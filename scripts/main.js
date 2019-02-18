
$(() => {

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


  const $food = $('.food')
  // Place the walls in certain positions

  const wallsArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359, 379, 380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400]

  function placeWalls() {
    wallsArray.forEach(wallIndex => {
      $tiles.eq(wallIndex).removeClass('food')
      $tiles.eq(wallIndex).addClass('wall')
    })
  }

  placeWalls()






  class Character {
    constructor(currentPosition) {
      this.currentPosition = currentPosition
    }
    movement() {

    }
  }


  const pacman = new Character(42)

  // const $pacman = $('.pacman')

  function placePacman() {
    $tiles.removeClass('pacman')
    $tiles.eq(pacman.currentPosition).addClass('pacman')
  }

  placePacman()

  // Order is left, up, right, down)
  const directions = {
    left: -1,
    up: -20,
    right: 1,
    down: 20
  }

  const directionOptions = Object.values(directions)
  // [directions.left, directions.up, directions.right, directions.down]


  function movePacman() {
    $('body').on('keydown', function(e) {
      if (e.which === 37) {
        pacman.currentPosition+= directions.left
        placePacman()
      }
      if (e.which === 38) {
        pacman.currentPosition+= directions.up
        placePacman()
      }
      if (e.which === 39) {
        pacman.currentPosition+= directions.right
        placePacman()
      }
      if (e.which === 40) {
        pacman.currentPosition+= directions.down
        placePacman()
      }
      console.log(pacman.currentPosition)
    })
  }

  movePacman()

  class Ghost extends Character {
    constructor(currentPosition, target) {
      super(currentPosition)
      this.target = target
    }
  }

  const blinky = new Ghost(189, 42)
  const pinky = new Ghost(190)
  const inky = new Ghost(209)
  const clyde = new Ghost(210)

  const ghosts = [blinky, pinky, inky, clyde]


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



  // console.log(`ghostInterval is ${ghostInterval}`)
  console.log(blinky)

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
