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

// var enemy = {
// 	el: $('.enemy'),
// 	x: el.offset().left;
// };

// var player = {
// 	el: $('.player'),
// 	x: el.offset().left
// };



function logCollision() {
	if (enemySpawned) {
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
		
		// console.log('xDistance: '+distanceX +', yDistance: '+ distanceY);

		if (distanceX < 50 && distanceX > 0) {
			console.log('collisionX')
			// if (distanceY < 10) {
			// 	console.log('CollisionY');	
			// }
		}
		if (enemyX < 0) {

		}
	}
}

// function Enemy(x, y) {
// 	this.init(x, y);
// }

// Enemy.prototype = {
// 	 init: function(x, y){
// 	 	this.x = x;
// 	 	this.y = y;
// 	 }
// };

var enemySpawned = false;
function spawnEnemy() {
	$playerEl.after('<div class="enemy"></div>'); // FIRST
	$enemyEl = $('.enemy');
	setInterval(function(){
		$playerEl.after('<div class="enemy"></div>');
		$enemyEl = $('.enemy');
	}, 1000)
	enemySpawned = true;
}




// function doSomething() {
// 	console.log('something')
// 	// spawnEnemy();
// }

// (function loop() {
//     var rand = Math.round(Math.random() * (4000 - 1000)) + 1000;
//     setTimeout(function() {
//             doSomething();
//             loop();  
//     }, rand);
// }());


	// PREVENT DOUBLE JUMP
	var alreadyPressed = false;
	window.onkeydown = function(e){
		if (e.keyCode == 32) {
			if (!alreadyPressed) {
				alreadyPressed = true;
				$playerEl.addClass('jump');
				setTimeout(function() {
					$playerEl.removeClass('jump');	
					setTimeout(function(){
						alreadyPressed = false;
					}, 400);	// CSS animation delay
				}, 300);
			} else {
				return false;
			}
		}
	};


	function init() {
		setTimeout(function(){
			spawnEnemy();
			draw();
		}, 1000)
	}	

	// init();

	var update = function() {
		// logCollision();
		console.log(enemySpawned)
		if (enemySpawned) {
			$enemyEl.each(function(){
				console.log($(this).offset().left)

				if ($(this).offset().left < 0)
					$(this).remove();
			})
		}
	};

	var fps = 5;
	function draw() {			
		update();
    setTimeout(function() {
    	requestAnimationFrame(draw);
    }, 1000 / fps);
	}
	 
	
});
