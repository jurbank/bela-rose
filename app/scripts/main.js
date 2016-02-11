
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



function checkCollision(enemyEl) {
	enemyX = enemyEl.offset().left;
	enemyW = enemyEl.width();

	playerX = $('.player').offset().left;
	playerY = $('.player').offset().top;
	playerH = $('.player').height();
	playerW = $('.player').width();

	distanceX = enemyX - playerX;
	
	// console.log('xDistance: '+distanceX +', yDistance: '+ distanceY);

	// console.log(distanceX)

	if (distanceX < 10 && distanceX > 0) {
		console.log('collisionX')
		// if (distanceY < 10) {
		// 	console.log('CollisionY');	
		// }
	}
	if (enemyX < 0) {

	}
}

	
// function percentToPixel(el, perc) {
//   return (el.outerWidth()/100)* parseFloat(perc);
// }

	var enemySpawned = false;
	function spawnEnemy() {
		$playerEl.after('<div class="enemy"></div>'); // FIRST
		$enemyEl = $('.enemy');
		setInterval(function(){
			$playerEl.after('<div class="enemy"></div>');
			$enemyEl = $('.enemy');
			TweenLite.to($enemyEl, 2, {
				// right: '45.5%',
				right: '100%',
				ease: Linear.easeNone,
				onUpdate: function(){
  				checkCollision($enemyEl);
				}
		});
						// console.log($enemyEl.offset().left)
		}, 1000)
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
		updateBoard: function() {
			this.addPoint();
			$('.score-board__number').text(''+this.total+'');
		}
	}


	 
});
