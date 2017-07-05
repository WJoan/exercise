let form = document.querySelector(".user-form");
let checkBtn = document.querySelector("#checkBtn");
let inputs = document.querySelectorAll("input");
let userInfo = {};
// 显示提示信息
let showTips = function ( input, style ) {
	input.className = style;

	let tips = input.nextElementSibling.children;
	for(let tip of tips){
		if(tip.className === style){
			tip.style.display = 'block';
		}
		else{
			tip.style.display='none';
		}
	}

}

// 名称检测
let isName = function(value) {
	let re = /^[\w|\u4e00-\u9fa5]+$/;	
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
		if( len > 3 && len < 17)
			return true;
		else
			return false;
	}
	
	return (re.test(value) && len(value));
}

// 显示错误或者正确提示
let checkInput = function(){
	let isPassword = /^[A-Za-z0-9_]{8,20}$/;
	let isEmail = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
	let isPhone = /^1[0-9]{10}$/;

	let id = this.id;
	let value = this.value
	let result = false;

	if( id == 'name-input' ){
		result = isName(value);
	}
	else if( id == 'password-input'){
		result = isPassword.test(value);
	}
	else if( id == 'password-again-input'){
		result = (value == userInfo['password-input']);
	}
	else if( id == 'email-input' ){
		result = isEmail.test(value);
	}
	else if( id == 'phone-input' ){
		result = isPhone.test(value);
	}

	// 输入为空
	if(value == ''){
		showTips( this, 'error-null' );
		userInfo[this.id] = "";
	}
	// 输入正确
	else if(result){
		showTips( this, 'right' );
		userInfo[this.id] = value;
	}
	// 输入有误
	else{
		showTips( this, 'error' );
		userInfo[this.id] = "";
	}
}

let showRule = function(){
	showTips( this ,'rule' );
}

// 绑定
let init = function(){
	
	for(let i = 0; i < inputs.length - 1; i++){
		inputs[i].addEventListener('blur', checkInput);
		inputs[i].addEventListener('focus', showRule);
	}
	checkBtn.addEventListener('click', function(){
		for(let key in userInfo){
			if(userInfo[key] == "")
				return alert("输入有误！")
		}
		alert(JSON.stringify(userInfo).split(",").join("\n"));
	})
}

init();