/**
 * 判断给定数字是否为手机号码
 * @return {undefined}
 */
let testPhone = function(){
	let phoneReg = /^1[\d]{10}$/ ;

	if( !phoneReg.test(this.value) ){
		let errorDiv = this.nextElementSibling;
		errorDiv.style.display = 'inline-block';
	}
	else{
		let rightDiv = this.nextElementSibling.nextElementSibling;
		rightDiv.style.display = 'inline-block';
	}
	return true;
	
}

/**
 * 判断输入的字符串是否有相邻重复单词
 * @return {[type]} [description]
 */
let testWords = function(){
	let re = /\b(\w+)\b\s+\1\b/;

	if( re.test(wordsInput.value) ){
		let rightDiv = this.nextElementSibling.nextElementSibling;
		rightDiv.style.display = 'inline-block';
	}
	else{
		let errorDiv = this.nextElementSibling;
		errorDiv.style.display = 'inline-block';
	}
}

/**
 * 移除提示信息
 * @return {undefine} [description]
 */
let removeAlertMeg = function() {
	let errorDiv = this.nextElementSibling;
	let rightDiv = this.nextElementSibling.nextElementSibling;

	if( errorDiv ){ errorDiv.style.display = 'none'; }
	if( rightDiv ){ rightDiv.style.display = 'none'; }
}


let phoneInput =  document.querySelector('[name = phone]');
let wordsInput = document.querySelector('[name = words]');

phoneInput.addEventListener('blur', testPhone);
phoneInput.addEventListener('focus', removeAlertMeg);

wordsInput.addEventListener('blur', testWords);
wordsInput.addEventListener('focus', removeAlertMeg);
