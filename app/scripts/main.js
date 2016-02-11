
$(document).ready(function(){

	var enemyX,
			enemyY,
			enemyH,
			enemyW,

			$playerEl = $('.player'),
			$enemyEl,
			playerX,
			playerY,
			playerH,
			playerW,

			distanceX,
			distanceY;

window.onresize = function() {
	refreshGameSize();
}

var windowW = window.innerWidth;
function refreshGameSize() {
	windowW = window.innerWidth;
	console.log(windowW);

}

var collisionDetected = false;
function checkCollision(enemyEl) {
	enemyX = enemyEl.offset().left;
	enemyY = enemyEl.offset().top;
	enemyW = enemyEl.width();	
	enemyH = enemyEl.height();	

	playerX = $('.player').offset().left;
	playerY = $('.player').offset().top;
	playerH = $('.player').height();
	playerW = $('.player').width();

	distanceX = enemyX - playerX;
	// distanceY= enemyY - playerY;
	
	// console.log('xDistance: '+distanceX +', yDistance: '+ distanceY);

	// console.log(distanceX)

	

	if (distanceX < 10 && distanceX > 0) {
		if (playerY - enemyH) {
			console.log('top of enemy')
		}
		// score.lost();
	}
	if (enemyX < 0) {

	}
}

	
// function percentToPixel(el, perc) {
//   return (el.outerWidth()/100)* parseFloat(perc);
// }

	var enemySpawned = false;
	var tween;
	var enemyInterval;
	function spawnEnemy() {
		$playerEl.after('<div class="enemy"></div>'); // FIRST
		$enemyEl = $('.enemy');
		enemyInterval = setInterval(function(){
			$playerEl.after('<div class="enemy"></div>');
			$enemyEl = $('.enemy');
			tween = TweenLite.to($enemyEl, 2, {
				right: windowW,
				ease: Linear.easeNone,
				onUpdate: function(){
  				checkCollision($enemyEl);
  				if ($enemyEl.offset().left < 0) {
  					$enemyEl.remove();
  				}
				}
		});
						// console.log($enemyEl.offset().left)
		}, 3000)
		enemySpawned = true;		
	}

	// spawnEnemy();

	var touchEnemy = false;


	// PREVENT DOUBLE JUMP
	var alreadyPressed = false;
	onkeydown = function(e){
		if (e.keyCode == 32) {
			if (!alreadyPressed) {
				alreadyPressed = true;
				$playerEl.addClass('jump');
				setTimeout(function() {
					$playerEl.removeClass('jump');	
					setTimeout(function(){
						alreadyPressed = false;
						if(!touchEnemy) {
							score.updateBoard();
						}
					}, 400);	// CSS animation delay
				}, 300);
			} else {
				return false;
			}
		}
	}

	var score = {
		total: 0,
		addPoint: function(){
			this.total += 1;
		},
		lost: function(){
			console.log('lost');
			tween.kill();
			clearInterval(enemyInterval)
		},
		updateBoard: function() {
			this.addPoint();
			$('.score-board__number').text(''+this.total+'');
		}
	}


	 
});
