/**
 * 创建多类导航
 */

// 格式化字符串
function formateString(str, data) {
	return str.replace(/\{#(\w+)#\}/g,
	 (match, offset) => typeof data[offset] === undefined ? '' : data[offset])
}

// 基础导航
let Nav = function (data) {
	// 基础导航样式模板
	this.item = '<li><a href="{#href#}" title="{#title#}">{#name#}</a></li>'
	// 创建字符串
	this.html = '';
	// 格式化数据
	for(d of data){
		this.html += formateString( this.item, d );
	}

	return this.html;
}

// 带有下拉菜单的导航栏
let dropDownNav = function (data) {
	// 模板
	this.templ = '<li class="dropdown">'+
					'<a href="#" class="dropdown-toggle active" data-toggle="dropdown">'+
					'{#name#}<strong class="caret"></strong></a>'+
					'<ul class="dropdown-menu">{#links#}</u>';
	// 创建字符串
	this.html = '';
	// 格式化数据
	for(let d of data){
		if(typeof d.links === 'object'){
			d.links = Nav(d.links);
			this.html += formateString( this.templ, d );
		}
		else{
			this.html += Nav([d]);
		}
	}

	return this.html;
}





// 初始化一个导航栏
let navDom = document.getElementById('content');
let navLinks = [
			{
				href: 'http://www.baidu.com/',
				title: '百度一下',
				name: '百度'
			},
			{
				href: 'http://www.taobao.com/',
				title: '淘宝商城',
				name: '淘宝'
			},
			{
				name: '腾讯',
				links: [
					{
						href: 'http://www.baidu.com/',
						title: '百度一下',
						name: '百度'
					},
					{
						href: 'http://www.taobao.com/',
						title: '淘宝商城',
						name: '淘宝'
					}
				]
			},
		];

navDom.innerHTML = dropDownNav(navLinks);