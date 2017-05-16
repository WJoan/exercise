var body = document.getElementsByTagName('body')[0];
var addDom = document.getElementById("addBtn");
var deleDom = document.getElementById("deleBtn");
var deleDom2 = document.getElementById("deleBtn2");
var deleDom3 = document.getElementById("deleBtn3");
var content = document.getElementById("content");



addDom.addEventListener('click', function(){
	var data = [1,2,4];

	function f(){
		console.log(data[0]);
	};
	 for(var i = 0; i < 100000; i++){
		var text = document.createTextNode('p');
		var pNode = document.createElement('p');
		pNode.appendChild(text);
		pNode.addEventListener('click', f);
		content.appendChild(pNode);	
		
	 }

	
});

deleDom.addEventListener('click', function(){
	content.innerHTML = '';
});


deleDom2.addEventListener('click', function(){
	var list = document.getElementsByTagName('p');
	while(list[0]){
		list[0].onclick = null;
		delete content.removeChild(list[0]);
	}

});

deleDom3.addEventListener('click', function(){
	$('p').each(function(){
		this.remove();
	})
});


