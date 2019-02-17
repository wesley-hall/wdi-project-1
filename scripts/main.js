
$(() => {

  console.log('it works')

  const $gameboard = $('.gameboard')

  const tiles = 400
  function createBoard() {
    for (let i = 0; i < tiles; i++) {
      $gameboard.append(`<div id="${i}" class="tile"></div>`)
    }
  }

  createBoard()

})
