
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
			playerBottom,

			distanceX,
			distanceY;

window.onresize = function() {
	refreshGameSize();
}

var windowW = window.innerWidth;
function refreshGameSize() {
	windowW = window.innerWidth;
	// console.log(windowW);

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
	playerBottom = playerY+playerH;


	distanceX = enemyX - playerX;

	if ((playerBottom > enemyY) || (playerBottom == enemyY)) {
		if (distanceX < playerW && distanceX > 0) {
			end();
		}			
	}
}



	var enemySpawned = false;
	var tween;
	var enemyInterval;
	function spawnEnemy() {
		// if (onKeyDownRestart) {
		// 	$('.enemy').remove();
		// }
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
		}, 3000)
		enemySpawned = true;		
	}

		
	var onKeyDownRestart = false; 
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
			if (onKeyDownRestart) {
				console.log('true')
				$('.enemy').remove();
				init()
				return onKeyDownRestart = false; 
			}
		}
	}

	
	var score = {
		total: 0,
		addPoint: function(){
			this.total += 1;
		},
		// lost: function(){
		// 	this.total = 0;
		// },
		updateBoard: function() {
			this.addPoint();
			$('.score-board__number').text(''+this.total+'');
		}
	}

	function end() {
		$('.score-board__number').text('YOU LOST');
		score.total = 0;
		tween.kill();
		clearInterval(enemyInterval);
		onKeyDownRestart = true;
	}

	function init() {
		spawnEnemy();
	}


	init();
	 
});
