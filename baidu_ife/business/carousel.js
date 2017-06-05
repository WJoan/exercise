let container = document.getElementById("container");
let imgList = document.getElementById("imgList");
let btns = document.getElementById("btnList").getElementsByTagName("span");
let prev = document.getElementById("arrowLeft");
let next = document.getElementById("arrowRight");

let index = 0;

let moveImg = function (offset) {
	let getLeft = () => parseInt(imgList.style.left);
	let newLeft = getLeft() + offset;
	let time = 500;	// 位移总时间
	let interval = 10;	// 位移间隔时间
	let speed = offset / (time/interval);	// 每次位移量

	function go() {
		if((speed < 0 && getLeft() > newLeft) || (speed > 0 && getLeft() < newLeft)){
			imgList.style.left = getLeft() + speed + 'px';
			setTimeout(go, interval);
		}
		else{
			imgList.style.left = newLeft + 'px';
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

// 下一张
next.addEventListener('click', function(){
	if( parseInt(imgList.style.left) < -4096){
		imgList.style.left = -1024 + 'px';
		index = 0;
		showButton();
	}else {
		moveImg(-1024);
		index += 1;
		showButton();
	}
});

// 上一张
prev.addEventListener('click', function(){
	if( parseInt(imgList.style.left) > -1024 ){
		imgList.style.left = -5120 + 'px';
		index = 4;
		showButton();
	}else {
		moveImg(1024);
		index -= 1;
		showButton();
	}
});
