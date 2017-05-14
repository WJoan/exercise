var body = document.getElementsByTagName('body')[0];
var addDom = document.getElementById("addBtn");
var deleDom = document.getElementById("deleBtn");
var deleDom2 = document.getElementById("deleBtn2");
var f = function(){
			var text = document.createTextNode('p node');
			this.appendChild(text);
		};

addDom.addEventListener('click', function(){
	for(var i = 0; i < 10000; i++){
		var pNode = document.createElement('p');
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
		list[0].removeEventListener('click',f);
		body.removeChild(list[0]);
	}
	
});