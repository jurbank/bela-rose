$(document).ready(function(){

	var enemyX,
			enemyY,
			enemyH,
			enemyW,

			$playerEl = $('.player'),
			playerX,
			playerY,
			playerH,
			playerW,

			distanceX,
			distanceY;

	function logCollision() {
		enemyX = $('.enemy').offset().left;
		enemyY = $('.enemy').offset().top;
		enemyH = $('.enemy').height();
		enemyW = $('.enemy').width();

		playerX = $('.player').offset().left;
		playerY = $('.player').offset().top;
		playerH = $('.player').height();
		playerW = $('.player').width();

		distanceX = enemyX - playerX;
		distanceY = enemyY - playerY;
		
		console.log('xDistance: '+distanceX +', yDistance: '+ distanceY);

		if (distanceX < 10) {
			if (distanceY < 10) {
				console.log('Collision!');	
			}
		}
	}

	var alreadyPressed;
	window.onkeypress = function(e){
		if (e.keyCode == 32) {
			$playerEl.addClass('jump');
			window.setTimeout(function() {
				$playerEl.removeClass('jump');	
			}, 100);
			alreadyPressed = true;
		}
		alreadyPressed = false;
	};

	var fps = 1;
	 
	function draw() {
	    setTimeout(function() {
	        requestAnimationFrame(draw);
	 
	        logCollision();
	 
	    }, 1000 / fps);
	}
	 
	// draw();
});