
$(() => {

  console.log('it works')


  const $gameboard = $('.gameboard')
  const numOfTiles = 400

  // Create the game board with div.tile children
  function createBoard() {
    for (let i = 0; i < numOfTiles; i++) {
      $gameboard.append(`<div id="${i}" class="tile"></div>`)
    }
  }

  createBoard()


  const $tiles = $('.tile')
  console.log($tiles)


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

  const directionOptions = [directions.left, directions.up, directions.right, directions.down]


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
    constructor(currentPosition) {
      super(currentPosition)
    }
  }

  const blinky = new Ghost(189)
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

  // const ghostInterval = setInterval(moveGhosts, 1000)
  let ghostDirection

  function setGhostDirection() {
    ghostDirection = directionOptions[Math.floor(Math.random() * directionOptions.length)]
    console.log(ghostDirection)
  }

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

  setInterval(moveGhosts, 1000)

  console.log(blinky)


  // const $stopGhosts = $('#stop')
  // $stopGhosts.on('click', clearInterval(ghostInterval))






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
