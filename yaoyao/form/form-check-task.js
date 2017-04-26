let input = document.getElementById("user-name");
let rule = document.getElementById("rule");
let right = document.getElementById("right");
let error = document.getElementById("error");

let inputText = input.value.split('');

// 显示提示信息
let showTips = function (style) {
	input.class = 'input-'+style;
	let node = document.getElementById(style);
	let childrens = node.parentNode.children;
	for(let i = 0; i < childrens.length; i++){
		childrens[i].style.display='none';
	}
	node.style.display = 'block';
}

// 显示错误或者正确提示
let checkRule = function(){
	let re = /[\w|\u4e00-\u9fa5]{4,16}/g;
	let value = this.value;
	if(!value){
		showTips('rule');
	}
	else if(re.test(value)){
		showTips('right');
	}
	else{
		showTips('error');
	}

}

// 绑定
let init = function(){
	input.addEventListener('blur', checkRule);
}

init();