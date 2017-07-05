let app = function() {

	const c = document.getElementById('giantCanvas');
	const rangeBox = document.getElementById('rangeBox');
	const thumbnail = document.getElementById('img');
	const ctx = c.getContext('2d');
	const cWidth = c.width;
	const cHeight = c.height;
	const thumbnailWidth = thumbnail.offsetWidth;
	const thumbnailHeight = thumbnail.offsetHeight;

	let img, imgWidth, imgHeight,
			clientX, clientY,
			imgX = 0, imgY = 0,
			isDrag = false, isDrawing = false;

	// 部分参数初始化
	function _init() {
		imgWidth = img.width;
		imgHeight = img.height;
		rangeBox.style.width = thumbnailWidth * (cWidth / imgWidth) - 2 + 'px';
		rangeBox.style.height = thumbnailHeight  * (cHeight / imgHeight) - 2 + 'px';
	}

	// 加载图片
	function _drawDataURIOnCanvas(strDataURI, canvas) {
	    img = new window.Image();
	    img.addEventListener("load", function () {
	    	 _init();
	        canvas.getContext("2d").drawImage(img, imgX, imgY, cWidth, cHeight, 0, 0, cWidth, cHeight);
	    });
	    img.setAttribute("src", strDataURI);
	};

	function _mousedown (e) {
		// 开始移动并记录当前坐标
		if(e.target == c || e.target == rangeBox){
			clientX = e.clientX;
			clientY = e.clientY;
			isDrag = true;
		}

	};

	function _mousemove (e) {
		if(!isDrag || isDrawing) return false;
		// 计算位移
		let offsetX, offsetY;
		if(e.target == c){
			offsetX = -(e.clientX - clientX);
			offsetY = -(e.clientY - clientY);
		}
		else if(e.target == rangeBox || e.target == thumbnail){
			offsetX = (e.clientX - clientX) * (imgWidth  / thumbnail.offsetWidth);
			offsetY = (e.clientY - clientY) * (imgHeight / thumbnail.offsetHeight);
		}
		else {
			isDrag = false;
			isDrawing = false;
			return;
		}

		isDrawing = true;
		// 计算坐标
		clientX = e.clientX;
		clientY = e.clientY;
		imgX += offsetX;
		imgY += offsetY;
		// 检测是否到达边缘
		if(imgX < 0){ imgX = 0;}
		if(imgY < 0){ imgY = 0;}
		if(imgX > imgWidth - cWidth){ imgX = imgWidth - cWidth;}
		if(imgY > imgHeight - cHeight){ imgY = imgHeight - cHeight;}
		// 移动小窗口
		rangeBox.style.left = imgX * (thumbnail.offsetWidth / imgWidth) + 'px';
		rangeBox.style.top = imgY * (thumbnail.offsetHeight / imgHeight) + 'px';
		// 移动图片
		ctx.clearRect(0,0, cWidth, cHeight);
		ctx.drawImage(img, imgX, imgY, cWidth, cHeight, 0, 0, cWidth, cHeight);

		isDrawing = false;
	};

	function _mouseup (e){
		// 结束移动
		isDrag = false;
		isDrawing = false;
	}

	function _drawCircle(e){
		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, Math.random() * 50, 0, Math.PI*2, true); // 绘制
		ctx.stroke();
	}

	return {
		loadImg(imgURL) {
			// 加载图片
			_drawDataURIOnCanvas(imgURL, c);
			// 绑定事件
			document.addEventListener("mousedown", _mousedown, false);
			document.addEventListener("mousemove", _mousemove, false);
			document.addEventListener("mouseup", _mouseup, false);
			c.addEventListener("dblclick", _drawCircle, false);
		},
	}
}

let a = app()
a.loadImg("../html5_canvas/img/bigImg.jpg");
