let container = document.getElementById("container");
let imgList = document.getElementById("imgList");
let btns = document.getElementById("btnList").getElementsByTagName("span");
let prev = document.getElementById("arrowLeft");
let next = document.getElementById("arrowRight");

// 当前图片索引
let index = 0;
// 图片是否正在移动
let animated = false;
// 定时器
let timer;

/**
 * 移动图片
 * @param  {number} offset 移动像素
 */
function moveImg(offset) {
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

/**
 * 高亮当前图片检索圆点
 */
function showButton() {
	for (var i = 0; i < btns.length; i++) {
		if(btns[i].className == 'on'){
			btns[i].className = '';
			break;
		}
	}
	btns[index].className = 'on';
}

/**
 * 自动轮播图片
 */
function autoMove() {
	timer = setInterval( () => next.click(), 3000 );
}

/**
 * 停止轮播
 */
function stopMove() {
	clearInterval(timer);
}

// 点击切换下一张
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

// 点击切换上一张
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

// 为圆点绑定点击事件
for (var i = 0; i < btns.length; i++) {
	// 点击切换图片
	btns[i].addEventListener('click', () => {
		let desIndex = parseInt( this.getAttribute("data-index") );

		// 判断当前图片是否为要切换的图片
		// 如果是，则不执行任何动画效果
		if( desIndex == index ) return false;
		// 否则切换图片
		moveImg(-1024 * ( desIndex - index ) );
		index = desIndex;
		showButton();
	});
}

// 鼠标移动到图片上停止自动播放
container.addEventListener('mouseover', stopMove );

// 鼠标移出图片开始自动播放
container.addEventListener('mouseout', autoMove );