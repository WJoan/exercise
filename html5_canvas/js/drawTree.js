var drawTree = function(ctx, startX, startY, length, angle, depth, branchWidth){
	var rand = Math.random,
		newLength, newAngle, newDepth, maxBranch = 3,
		endX, endY, maxAngle = 2 * Math.PI / 4,
		subBranches, lenShrink;
	// 画一个分支
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	endX = startX + length * Math.cos(angle);
	endY = startY + length * Math.sin(angle);
	ctx.lineCap = 'round';
	ctx.lineWidth = branchWidth;
	ctx.lineTo(endX, endY);
	// 越靠近分叉颜色越绿
	if(depth <= 2){
		ctx.strokeStyle = 'rgb(0,' + (Math.floor((rand() * 64) + 128 )) + ',0)';
	}
	else {
		ctx.strokeStyle = 'rgb(' + (Math.floor(64*depth/12 + 64 )) + ',50,25)';
	}
	ctx.stroke();
	// 深度减一
	newDepth = depth - 1;
	// 递归结束条件
	if( !newDepth )	return;

	// 当前分支分为随机数量的新分支（最大为3）
	subBranches = (rand() * (maxBranch - 1)) + 1;
	// 新分支的宽度为原来的0.7倍
	branchWidth *= 0.7;
	for (var i = 0; i < subBranches; i++) {
		// 原角度 +-maxAngle/2 范围内
		newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
		// 原长度的 0.7~1 倍
		newLength = length * (0.7 + rand() * 0.3);
		drawTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth);
	}
};

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
drawTree(ctx, 320, 470, 60, -Math.PI/2, 12, 12)