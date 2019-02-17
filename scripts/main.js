
$(() => {

  console.log('it works')


  const $gameboard = $('.gameboard')
  const tiles = 400

  // Create the game board with div.tile children
  function createBoard() {
    for (let i = 0; i < tiles; i++) {
      $gameboard.append(`<div id="${i}" class="tile"></div>`)
    }
  }

  createBoard()


  const $tiles = $('.tile')
  console.log($tiles)

  const pacman = {
    currentPosition: 42
  }


  function placePacman() {
    $tiles.eq(pacman.currentPosition).addClass('pacman')
  }

  placePacman()









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
