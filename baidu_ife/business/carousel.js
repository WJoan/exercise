let container = document.getElementById("container");
let imgList = document.getElementById("imgList");
let btns = document.getElementById("btnList").getElementsByTagName("span");
let prev = document.getElementById("arrowLeft");
let next = document.getElementById("arrowRight");

let index = 0;
let animated = false;
let timer;

let moveImg = function (offset) {
	let getLeft = () => parseInt(imgList.style.left);
	let newLeft = getLeft() + offset;
	let time = 500;	// 位移总时间
	let interval = 10;	// 位移间隔时间
	let speed = offset / (time/interval);	// 每次位移量

	animated = true;
	function go() {
		if((speed < 0 && getLeft() > newLeft) || (speed > 0 && getLeft() < newLeft)){
			imgList.style.left = getLeft() + speed + 'px';
			setTimeout(go, interval);
		}
		else{
			imgList.style.left = newLeft + 'px';
			if( getLeft() > -1024 ) {
				imgList.style.left = -5120 + 'px';
			}else if ( getLeft() < -5120 ) {
				imgList.style.left = -1024 + 'px';
			}
			animated = false;
		}
	}
	go();
	//imgList.style.left = parseInt(imgList.style.left) + offset + 'px';
}

let showButton = function () {
	for (var i = 0; i < btns.length; i++) {
		if(btns[i].className == 'on'){
			btns[i].className = '';
			break;
		}
	}
	btns[index].className = 'on';
}

let autoMove = function () {
	timer = setInterval( () => next.click()  , 3000 );
}

let stopMove = function () {
	clearInterval(timer);
}

// 下一张
next.addEventListener('click', () => {
	if( index == 4){		
		index = 0;		
	}
	else {
		index += 1;
	}

	if( animated ) return;

	showButton();
	moveImg(-1024);
});

// 上一张
prev.addEventListener('click', () => {
	if( index == 0 ) {
		index = 4;
	} 
	else {	
		index -= 1;
	}

	if( animated ) return;

	showButton();
	moveImg(1024);
});


for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', function(){
		let desIndex = parseInt( this.getAttribute("data-index") );

		if( desIndex == index ) return false;
		
		moveImg(-1024 * ( desIndex - index ) );

		index = desIndex;
		showButton();
	})
}

container.addEventListener('mouseover', stopMove );
container.addEventListener('mouseout', autoMove );