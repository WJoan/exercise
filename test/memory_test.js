var body = document.getElementsByTagName('body')[0];
var addDom = document.getElementById("addBtn");
var deleDom = document.getElementById("deleBtn");
var deleDom2 = document.getElementById("deleBtn2");

addDom.addEventListener('click', function(){
	var text = document.createTextNode('p node');
	var str = ' new';
	var f = function(){
			var text = document.createTextNode(str);
			this.appendChild(text);
		};
	for(var i = 0; i < 10000; i++){
		var pNode = document.createElement('p');
		var text = document.createTextNode('p node');
		pNode.appendChild(text);
		pNode.addEventListener('click', f);
		body.appendChild(pNode);
	}
});

deleDom.addEventListener('click', function(){
	var list = document.getElementsByTagName('p');
	while(list[0]){
		body.removeChild(list[0]);
	}
	
});

deleDom2.addEventListener('click', function(){
	var list = document.getElementsByTagName('p');
	while(list[0]){
		list[0].onclick = null;
		body.removeChild(list[0]);
	}
	
});