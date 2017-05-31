/**
 * createNumber
 * 根据用户输入创造出新的节点
 */
 function createNumber(){
 	// 获取用户输入 并检查合法性
 	var num = document.getElementsByTagName("input")[0].value;
 	if( !Number(num) )	return null;

 	// 创建新的节点
 	var numDiv = document.createElement("div");
 	var numText = document.createTextNode( num );
 	numDiv.appendChild( numText );
 	numDiv.setAttribute( "class", "element" );
 	// 为节点增加点击删除的效果
 	numDiv.onclick = function(){
 		this.remove();
 	};
 	return numDiv;
 }

 /**
  * addNumber
  * 显示加入的新节点
  */
 function addNumber(){
 	var numDiv = createNumber();
 	if(!numDiv)		return alert("请输入数字");

 	var display = document.getElementById("display");
 	var addType = this.id;

 	if( addType == "left-in" ){
 		// 找到display第一个子节点并插入
 		if( display.firstChild )	display.insertBefore( numDiv, display.firstChild );
 		else display.appendChild(numDiv);
 	} 
 	else if ( addType == "right-in" ){
 		display.appendChild(numDiv);
 	}

 }

/**
 * removeNumber
 * 删除节点
 */
function removeNumber(){
	var display = document.getElementById("display");
 	var addType = this.id;
 	var out = document.getElementsByTagName("input")[0];
 	var removeNode = {};

 	// 判断删除类型
 	if( addType == "left-out" ){
 		removeNode = display.firstChild;
 	} 
 	else if ( addType == "right-out" ){
 		removeNode = display.lastChild;
 	}

 	// 删除并显示删除了的数字
 	if( removeNode ){
 		out.value = removeNode.firstChild.nodeValue;
 		removeNode.remove();
 	}
 	else{
 		alert("当前列表没有内容");
 	}
}

function init() {
	// 给button绑定对象
	document.getElementById("left-in").onclick = addNumber;
	document.getElementById("right-in").onclick = addNumber;
	document.getElementById("left-out").onclick = removeNumber;
	document.getElementById("right-out").onclick = removeNumber;
}

window.onload = function(){
  init();
}