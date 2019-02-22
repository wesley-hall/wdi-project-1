
$(() => {

  let gameRunning = false
  let score = 0
  let lives = 3
  const highscore = window.localStorage.getItem('highscore')
  const $gameoverMessage = $('#gameover')
  const $gameWonMessage = $('#game-won')
  const $scoreSpan = $('#score')
  const $highscoreSpan = $('#highscore')
  const $resetScore = $('#reset-score')
  const $resetHighscore = $('#reset-highscore')
  const $livesDiv = $('.lives')
  const $lifeImages = $('.life')
  const $pacmanDiv = $('.tile.pacman')
  const audio = document.querySelector('audio')

  let ghostsAreBlue = false

  // Create gamebord

  const $gameboard = $('.gameboard')
  const numOfTiles = 400

  // Create the game board with div.tile children
  function createBoard() {
    for (let i = 0; i < numOfTiles; i++) {
      $gameboard.append('<div class="tile"></div>')
      // $gameboard.append('<div id="${i} class="tile"></div>')
    }
    score = 0
    lives = 3
    $scoreSpan.text(score)
    $highscoreSpan.text(highscore)
  }

  createBoard()

  function clearBoard() {
    $tiles.removeClass('food superfood pacman ghost blinky pinky inky clyde blue')
  }

  const $tiles = $('.tile')

  // Place food on all tiles
  function placeFood() {
    $tiles.addClass('food')
  }
  placeFood()


  // Place the walls in certain positions
  const wallBoundaries = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359, 379, 380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400]
  const wallLevels = {
    one: [42,43,44,45,46,49,50,53,54,55,56,57,63,69,70,76,83,86,87,88,89,90,91,92,93,96,103,116,123,127,132,136,147,152,165,166,167,172,173,174,181,182,183,189,190,196,197,198,201,202,203,209,210,216,217,218,225,226,227,232,233,234,247,252,263,267,272,276,283,296,303,306,307,308,309,310,311,312,313,316,323,329,330,336,342,343,344,345,346,349,350,353,354,355,356,357],
    two: [42,43,44,45,46,48,49,50,51,53,54,55,56,57,62,63,68,69,70,71,76,77,82,83,85,86,87,88,89,90,91,92,93,94,96,97,102,103,105,114,116,117,122,123,125,127,129,130,132,134,136,137,147,149,150,152,161,162,163,165,166,167,172,173,174,176,177,178,181,182,183,189,190,196,197,198,201,202,203,209,210,216,217,218,221,222,223,225,226,227,232,233,234,236,237,238,247,249,250,252,262,263,265,267,269,270,272,274,276,277,282,283,285,294,296,297,302,303,305,306,307,308,309,310,311,312,313,314,316,317,322,323,328,329,330,331,336,337,342,343,344,345,346,348,349,350,351,353,354,355,356,357],
    three: [21,22,23,27,28,29,30,31,32,36,37,38,41,45,47,48,51,52,54,58,61,63,64,65,67,68,71,72,74,75,76,78,81,83,96,98,101,103,105,106,107,108,111,112,113,114,116,118,121,123,125,134,136,138,141,143,145,147,148,149,150,151,152,154,156,158,161,163,169,170,176,178,185,187,189,190,192,194,205,207,212,214,221,223,227,228,229,230,231,232,236,238,241,243,245,247,248,249,250,251,252,254,256,258,261,263,265,274,276,278,281,283,285,286,287,288,291,292,293,294,296,298,301,303,316,318,321,323,324,325,327,328,331,332,334,335,336,338,341,345,347,348,351,352,354,358,361,362,363,367,368,369,370,371,372,376,377,378],
    four: [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,41,58,61,63,64,65,66,67,68,70,71,72,73,74,75,76,78,81,83,96,98,101,103,105,106,107,108,109,110,111,112,113,114,116,118,121,123,125,134,136,138,141,143,145,147,148,149,151,152,154,156,158,161,163,165,167,168,169,171,172,174,176,178,181,183,185,187,188,194,196,198,203,210,211,212,214,216,218,221,223,224,225,227,228,230,231,232,234,236,238,241,245,247,248,250,251,254,256,258,261,263,265,273,274,276,278,281,283,285,286,287,288,290,291,292,293,294,296,298,301,303,316,318,321,323,324,325,326,327,328,329,330,331,332,333,334,335,336,338,341,358,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378],
    five: [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,61,62,63,65,66,67,68,69,70,71,72,73,74,75,76,77,102,103,104,105,106,107,108,109,110,111,112,113,114,116,117,118,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,181,182,184,185,186,187,188,189,190,191,192,193,194,195,197,198,201,202,204,205,206,207,208,209,210,211,212,213,214,215,217,218,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,282,283,284,285,286,287,288,289,290,291,292,293,294,296,297,296,298,321,322,323,325,326,327,328,329,330,331,332,333,334,335,336,337,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378]
  }
  const wallsArray = wallBoundaries.concat(wallLevels.one)

  function placeWalls() {
    wallsArray.forEach(wallIndex => {
      $tiles.eq(wallIndex).removeClass('food')
      $tiles.eq(wallIndex).addClass('wall')
    })
  }

  placeWalls()
  const superfoodLevels = {
    one: [41, 58, 341, 358],
    two: [144, 155, 244, 255],
    three: [50, 195, 204, 349],
    four: [69, 192, 207, 243],
    five: [64, 155, 295, 324]
  }

  function placeSuperfood() {
    superfoodLevels.one.forEach(superfoodIndex => {
      $tiles.eq(superfoodIndex).removeClass('food')
      $tiles.eq(superfoodIndex).addClass('superfood animated infinite flash')
    })
  }

  placeSuperfood()



  // Movement directions
  const directions = {
    left: -1,
    up: -20,
    right: 1,
    down: 20
  }

  const directionOptions = Object.values(directions)


  // Characters
  class Character {
    constructor(startPosition) {
      this.startPosition = startPosition
      this.currentPosition
      this.nextPosition
    }
    placeFirstCharacter(characterName) {
      $tiles.eq(this.startPosition).removeClass('food superfood')
      $tiles.eq(this.startPosition).addClass(characterName)
      this.currentPosition = this.startPosition
    }
    placeCharacter(characterName) {
      scoring()
      if ($tiles.eq(pacman.currentPosition).hasClass('ghost')) {
        lifeLost()
      }
      if ($tiles.eq(pacman.currentPosition).hasClass('superfood')){
        this.modeFrightened()
      }
      $tiles.eq(this.currentPosition).removeClass('food superfood animated infinte flash')
      $tiles.removeClass(characterName)
      $tiles.eq(this.currentPosition).addClass(characterName)
    }
    pacMoveIsAllowed(nextPosition) {
      if ($tiles.eq(nextPosition).hasClass('wall')) {
        return false
      } else {
        return true
      }
    }
    ghostMoveIsAllowed(nextPosition) {
      if ($tiles.eq(this.nextPosition).hasClass('wall')) {
        return false
      } else if ($tiles.eq(this.currentPosition).hasClass('ghost') && $tiles.eq(nextPosition).hasClass('ghost')) {
        return false
      } else {
        return true
      }
    }

    modeFrightened() {
      // console.log('modeFrightened')
      // $('.ghost').addClass('blue')
      ghostsAreBlue = true
      setTimeout(this.modeChase, 5000)
    }
    modeChase() {
      ghostsAreBlue = false
      $('.blue').removeClass('blue')
      placeGhosts()
    }
  }


  // Characters - Pac-Man
  class Pacman extends Character {
    constructor(startPosition) {
      super(startPosition)
      this.direction = directions.right
      this.nextPosition = this.currentPosition+= this.direction

    }
    // If this.currentPosition+= this.direction hasClass
    playChomp() {
      console.log(audio)
      audio.src = './audio/chomp.wav'
      audio.play()
    }
    movePacman() {
      $('body').on('keydown', (e) => {
        let previousPosition
        switch(e.keyCode) {
          case 37:
            this.direction = directions.left
            previousPosition = this.currentPosition
            this.nextPosition = this.currentPosition+= this.direction
            break
          case 38:
            this.direction = directions.up
            previousPosition = this.currentPosition
            this.nextPosition = this.currentPosition+= this.direction
            break
          case 39:
            this.direction = directions.right
            previousPosition = this.currentPosition
            this.nextPosition = this.currentPosition+= this.direction
            break
          case 40:
            this.direction = directions.down
            previousPosition = this.currentPosition
            this.nextPosition = this.currentPosition+= this.direction
            break
        }
        if (!this.pacMoveIsAllowed(this.nextPosition)) {
          this.currentPosition = previousPosition
        } else {
          $tiles.eq(this.currentPosition).attr('data-direction', this.direction)
          pacman.placeCharacter('pacman')
          // this.playChomp()
        }
        // console.log(`Food left: ${$tiles.toArray()}`)
        if (!$tiles.toArray().some(tile => tile.classList.contains('food'))){
          gameWon()
        }
      })
    }

  }
  const pacman = new Pacman(370)



  // Characters - Ghosts
  class Ghost extends Character {
    constructor(startPosition, target) {
      super(startPosition)
      this.currentPosition = startPosition
      this.direction = directions.right
      this.target = target
      this.ghostInterval

    }
    setGhostDirection() {
      this.direction = directionOptions[Math.floor(Math.random() * directionOptions.length)]
    }
    ghostIntelligentDirection() {
      this.target = pacman.currentPosition
      const ghostDiff = this.target - this.currentPosition
      if (ghostDiff < 0) {
        if (ghostDiff % 20 === 0) { // alternative = Math.abs(ghostDiff) > 20, acts differently
          this.direction = directions.up
          if (ghostsAreBlue) {
            this.direction = directions.down
          }
        } else {
          this.direction = directions.left
          if (ghostsAreBlue) {
            this.direction = directions.right
          }
        }
      } else if (ghostDiff > 0) {
        if (ghostDiff % 20 === 0) { // alternative = Math.abs(ghostDiff) > 20, acts differently
          this.direction = directions.down
          if (ghostsAreBlue) {
            this.direction = directions.up
          }
        } else {
          this.direction = directions.right
          if (ghostsAreBlue) {
            this.direction = directions.left
          }
        }
      } else {
        this.setGhostDirection()
      }
    }
    moveGhosts() {
      this.ghostInterval = setInterval(() => {
        const previousPosition = this.currentPosition
        this.ghostIntelligentDirection()
        this.nextPosition = this.currentPosition+= this.direction
        if (this.ghostMoveIsAllowed(this.nextPosition)) {
          this.currentPosition= this.nextPosition
          placeGhosts()
        } else {
          this.currentPosition = previousPosition
          this.setGhostDirection()
          // this.ghostIntelligentDirection()
        }
        if ($tiles.eq(this.currentPosition).hasClass('pacman')) {
          lifeLost()
        }
        if (ghostsAreBlue && $tiles.eq(this.currentPosition).hasClass('pacman')) {
          this.currentPosition = this.startPosition
          placeGhosts()
        }
      }, 200)
    }
  }

  const blinky = new Ghost(169, superfoodLevels.one[0])
  const pinky = new Ghost(191, superfoodLevels.one[1])
  const inky = new Ghost(230, superfoodLevels.one[2])
  const clyde = new Ghost(208, superfoodLevels.one[3])

  pacman.placeFirstCharacter('pacman')
  pacman.movePacman()

  const $main = $('main')
  const $startScreen = $('.start-screen')

  function startGame() {
    setTimeout(() => {
      $startScreen.addClass('animated fadeOut 4s')
    }, 2500)
    setTimeout(() => {
      $main.addClass('animated fadeIn')
      $main.css({
        display: 'flex'
      })
      $startScreen.css({
        display: 'none'
      })
    },3250)
    gameRunning = true
    pacman.placeCharacter('pacman')
    clearInterval(blinky.ghostInterval)
    clearInterval(inky.ghostInterval)
    clearInterval(pinky.ghostInterval)
    clearInterval(clyde.ghostInterval)
    blinky.moveGhosts()
    inky.moveGhosts()
    pinky.moveGhosts()
    clyde.moveGhosts()
  }

  function restartGame() {
    audio.src = './audio/intro.wav'
    audio.play()
    clearBoard()
    // createBoard()
    score = 0
    lives = 3
    placeFood()
    placeWalls()
    placeSuperfood()
    $lifeImages.css({
      display: 'block'
    })
    $gameboard.css({
      display: 'flex'
    })
    $gameWonMessage.css({
      display: 'none'
    })
    $restartButton.css({
      display: 'none'
    })
    $livesDiv.css({
      display: 'flex'
    })
    startGame()
  }



  const $startButton = $('#start-game')
  $startButton.on('click', () => {
    audio.src = './audio/intro.wav'
    audio.play()
    startGame()
  })

  // const $restartButton = $('#restart-game')
  // $restartButton.on('click', restartGame)

  // const $stopButton = $('#stop')
  // $stopButton.on('click', stopGame)


  function placeGhosts() {
    $tiles.removeClass('ghost blue blinky pinky inky clyde')
    $tiles.eq(blinky.currentPosition).addClass('ghost blinky')
    $tiles.eq(pinky.currentPosition).addClass('ghost pinky')
    $tiles.eq(inky.currentPosition).addClass('ghost inky')
    $tiles.eq(clyde.currentPosition).addClass('ghost clyde')
    if (ghostsAreBlue) {
      $tiles.eq(blinky.currentPosition).addClass('blue')
      $tiles.eq(pinky.currentPosition).addClass('blue')
      $tiles.eq(inky.currentPosition).addClass('blue')
      $tiles.eq(clyde.currentPosition).addClass('blue')
    }
  }

  placeGhosts()



  // Stop game
  function stopGame() {
    gameRunning = false
    $tiles.eq(pacman.currentPosition).removeClass('pacman')
    $tiles.removeClass('ghost blinky pinky inky clyde')
    clearInterval(blinky.ghostInterval)
    clearInterval(inky.ghostInterval)
    clearInterval(pinky.ghostInterval)
    clearInterval(clyde.ghostInterval)
  }

  function gameOver() {
    console.log('game over!!!')
    $gameboard.css({
      display: 'none'
    })
    $gameoverMessage.css({
      display: 'block'
    })
    $restartButton.css({
      display: 'block'
    })
    $livesDiv.css({
      display: 'none'
    })
  }
  function gameWon() {
    console.log('You win!!!')
    $gameboard.css({
      display: 'none'
    })
    $gameWonMessage.css({
      display: 'block'
    })
    $restartButton.css({
      display: 'block'
    })
    $livesDiv.css({
      display: 'none'
    })
  }


  // Life lost
  function lifeLost() {
    if (ghostsAreBlue) {
      score+= 100
      audio.src = './audio/chomp_ghost.wav'
      audio.play()
      console.log('score + 100')
    } else {
      lives--
      if (lives === 2) {
        $lifeImages.eq(0).css({
          display: 'none'
        })
      } else if (lives === 1) {
        $lifeImages.eq(1).css({
          display: 'none'
        })
      } else {
        $lifeImages.eq(2).css({
          display: 'none'
        })
      }
      stopGame()
      if (lives > 0) {
        $tiles.removeAttr('data-direction')
        pacman.currentPosition = pacman.startPosition
        setTimeout(() => {
          blinky.currentPosition = blinky.startPosition
          inky.currentPosition = inky.startPosition
          pinky.currentPosition = pinky.startPosition
          clyde.currentPosition = clyde.startPosition
          placeGhosts()
          startGame()
        }, 2000)
      } else {
        gameOver()
      }
    }
  }


  // Scoring

  function scoring() {
    if (pacman.currentPosition !== pacman.startPosition) {
      if ($tiles.eq(pacman.currentPosition).hasClass('food')) {
        score+= 10
      } else if ($tiles.eq(pacman.currentPosition).hasClass('superfood')) {
        score+= 50
      }
    }
    $scoreSpan.text(score)
    checkHighscore()
    console.log(`score is ${score}`)
  }

  function checkHighscore() {
    if (score > highscore) {
      window.localStorage.setItem('highscore', score)
    }
    $highscoreSpan.text(window.localStorage.getItem('highscore'))
  }

  $resetScore.on('click', () => {
    score = 0
    $scoreSpan.text(score)
  })

  $resetHighscore.on('click', () => {
    window.localStorage.setItem('highscore', 0)
    $highscoreSpan.text(window.localStorage.getItem('highscore'))
  })


})
