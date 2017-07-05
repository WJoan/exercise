/**
 * checkValue
 * 检查用户输入合法性，并将输入拆分成数组
 */
function checkValue(value){
	var checkAll = /(?:[\u4e00-\u9fa5|\w]+[\s|,|u+ff0c|u+3001|u+3000])+[\u4e00-\u9fa5|\w]/;
	var pickWords = /[\u4e00-\u9fa5|\w]+/g;
	if( checkAll.test(value) ){
		return value.match(pickWords);
	}
	else
		return [];
}

/**
 * createNodes
 * 加入节点
 */
function createNodes(){
 	// 获取用户输入 并检查合法性
 	var inputValue = document.querySelector("textarea").value;
 	var words = checkValue(inputValue)
 	if( words == [] )	return null;

 	// 创建节点
 	var nodes = [];
	for(var i = 0; i < words.length; i++){
	 	// 创建新的节点
	 	var numDiv = document.createElement("div");
	 	var numText = document.createTextNode( words[i] );
	 	numDiv.appendChild( numText );
	 	numDiv.setAttribute( "class", "element" );
	 	// 为节点增加点击删除的效果
	 	numDiv.onclick = function(){
	 		this.remove();
	 	};
	 	nodes[i] = numDiv;
	 }
 	return nodes;
 }

 /**
  * addNumber
  * 显示加入的新节点
  */
 function addNodes(){
 	var nodes = createNodes();
 	if(!nodes)		return alert("请输入数字");

 	var display = document.getElementById("display");
 	var addType = this.id;

 	if( addType == "left-in" ){
 		for(var i = nodes.length-1; i >= 0; i-- ){
	 		// 找到display第一个子节点并插入
	 		if( display.firstChild )	display.insertBefore( nodes[i], display.firstChild );
	 		else display.appendChild(nodes[i]);
	 	}
 	} 
 	else if ( addType == "right-in" ){
 		for(var j = 0; j < nodes.length; j++){
 			display.appendChild(nodes[j]);
 		}
 	}

 }

/**
 * removeNumber
 * 删除节点
 */
function removeNode(){
	var display = document.getElementById("display");
 	var addType = this.id;
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
 		alert(removeNode.firstChild.nodeValue);
 		removeNode.remove();
 	}
 	else{
 		alert("当前列表没有内容");
 	}
}

/**
 * queryKeyWords
 * 查询关键词
 */
function queryKeyWords(){
	var display = document.getElementById("display");
	var query = document.getElementById("queryText").value;
	var values = display.childNodes;
	for(var i = 0; i < values.length; i++){
		if(values[i].innerHTML.indexOf( query ) >= 0){
			values[i].className += ' highlight';
		}
		else{
			values[i].className = 'element';
		}
	}
}

/**
 * init
 * 给button绑定对象
 */
function init() {
	document.getElementById("left-in").onclick = addNodes;
	document.getElementById("right-in").onclick = addNodes;
	document.getElementById("left-out").onclick = removeNode;
	document.getElementById("right-out").onclick = removeNode;
	document.getElementById("queryBtn").onclick = queryKeyWords;
}

window.onload = function(){
  init();
}