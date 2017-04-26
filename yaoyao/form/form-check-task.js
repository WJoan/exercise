let input = document.getElementById("user-name");
let checkBtn = document.querySelector(".checkBtn");

let inputText = input.value.split('');

// 显示提示信息
let showTips = function (style) {
	input.className = style;
	let node = document.getElementById(style);
	let childrens = node.parentNode.children;
	for(let i = 0; i < childrens.length; i++){
		childrens[i].style.display='none';
	}
	node.style.display = 'block';
	return false;
}

// 显示错误或者正确提示
let checkRule = function(){
	let re = /[\w|\u4e00-\u9fa5]+/g;
	let value = input.value;
	
	function len(str){
		var len = 0;
		for(var i=0; i<str.length; i++){
			var val = str.charCodeAt(i);
			if(val > 0 && val < 128){
				len++;
			}
			else{
				len = len + 2;
			}
		}
		return len;
	}
	
	let l = len(value);

	if(value == ''){
		showTips('error-null');
	}
	else if(re.test(value) && l >3 && l < 17){
		showTips('right');
	}
	else{
		showTips('error-len');
	}
	return false;
}

// 绑定
let init = function(){
	showTips('rule');
	checkBtn.addEventListener('click', checkRule);
}

init();