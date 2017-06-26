//requestAnimationFrame是浏览器用于定时循环操作的一个接口
//类似于setTimeout，主要用途是按帧对网页进行重绘。
window.requestAnimFrame=function(){
	return  window.requestAnimationFrame      ||
			window.webkitRequestAnimationFrame||
			window.mozRequestAnimationFrame   ||
			window.oRequestAnimationFrame     ||
			window.msRequestAnimationFrame    ||
			function(a){window.setTimeout(a,1000/60)}}();
//禁止选择
document.onselectstart = function() {
  return false;
};

//画布
var c = document.getElementById('c');
var ctx = c.getContext('2d');
//画布宽高
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
//随机数
var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
//线条的结束端点样式
ctx.lineCap = 'round';
//点
var orbs = [];
var orbCount = 30;
var radius;

var trailCB = document.getElementById('trail');
//是否开启尾迹
var trail = trailCB.checked;
var clearer = document.getElementById('clear');
//点的构造函数
function createOrb(mx,my){
    var dx = (cw/2) - mx;
	var dy = (ch/2) - my;
	var dist = Math.sqrt(dx * dx + dy * dy);
	var angle = Math.atan2(dy, dx);
	orbs.push({
		x: mx,
		y: my,
		lastX: mx,
		lastY: my,
		hue: 0,
		colorAngle: 0,
		angle: angle + Math.PI/2,
		//size: .5+dist/250,
		size: rand(1,3)/2,
		centerX: cw/2,
		centerY: ch/2,		
		radius: dist,
		speed: (rand(5,10)/1000)*(dist/750)+.015,
		alpha: 1 - Math.abs(dist)/cw,
		draw: function() {			
			ctx.strokeStyle = "#FF0000";	//颜色
			ctx.lineWidth = this.size;		//线宽
			ctx.beginPath();				//开始一条路径
			ctx.moveTo(this.lastX, this.lastY);		//起点
			ctx.lineTo(this.x, this.y);				//终点
			ctx.stroke();					//绘制文本
		},	
		update: function(){
			var mx = this.x;
			var my = this.y;	
			this.lastX = this.x;
			this.lastY = this.y;
			var x1 = cw/2;
			var y1 = ch/2;
			var x2 = mx;
			var y2 = my;		
			var rise = y1-y2;
			var run = x1-x2;
			var slope = -(rise/run);
			var radian = Math.atan(slope);
			var angleH = Math.floor(radian*(180/Math.PI));		
			if(x2 < x1 && y2 < y1){angleH += 180;}		
			if(x2 < x1 && y2 > y1){angleH += 180;}		
			if(x2 > x1 && y2 > y1){angleH += 360;}		
			if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
			if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
			if(x2 < x1 && slope =='0'){angleH = 180;}
			if(isNaN(angleH)){angleH = 0;}
			
			this.colorAngle = angleH;
			this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
			this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
			this.angle += this.speed;
		
		}
	});
}

function orbGo(e){
	var mx = e.pageX - c.offsetLeft;
	var my = e.pageY - c.offsetTop;		
	createOrb(mx,my);
}

function turnOnMove(){
	c.addEventListener('mousemove', orbGo, false);	
}

function turnOffMove(){
	c.removeEventListener('mousemove', orbGo, false);	
}

function toggleTrails(){
	trail = trailCB.checked;
}

function clear(){
 orbs = []; 
}

c.addEventListener('mousedown', orbGo, false);
c.addEventListener('mousedown', turnOnMove, false);
c.addEventListener('mouseup', turnOffMove, false);
trailCB.addEventListener('change', toggleTrails, false);
clearer.addEventListener('click', clear, false);

var count = 100;
while(count--){
		createOrb(cw/2, ch/2+(count));
}

var loop = function(){
  window.requestAnimFrame(loop);
	if(trail){
		ctx.fillStyle = 'rgba(0,0,0,.1)';
		ctx.fillRect(0,0,cw,ch);
	} else {
		ctx.clearRect(0,0,cw,ch);
	}
	var i = orbs.length;
	while(i--){	
		var orb = orbs[i];	
		var updateCount = 1;
		while(updateCount--){
		orb.update();		
		orb.draw(ctx);
		}
		
	}
}
            
loop();
