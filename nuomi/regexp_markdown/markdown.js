let style = {
	enter: /\n/gm,
	header: /^[#]{1,6}\s(.*)\n/gm,
	olist: /(?:\d\.\s(.*\n))+/g,
	code: /(`{3}\n)([^`]*)(\n`{3})/g,
	eletem: /^\d+\.\s(.*)\n/gm,
	ulist: /^-\s(.*)\n/gm,
	quote: /(?:\n|^)[>]\s((?:.+\n)+)/g
}

function mdHeader(header){
	let n = header.match(/^([#]{1,6})/)[0].length;
	return '<h'+n+'>'+header.substr(n+1,header.length-1)+'</h'+n+'>';
}

function mdOlist(olist){
	olist = olist.replace(style.eletem, '<li>$1</li>');
	return '<ol>'+olist+'</ol>';
}

let md2html = function(){
	text = this.value;
	text = text.replace( style.code, '<pre>$2</pre>');
	text = text.replace( style.header, mdHeader);
	text = text.replace( style.olist, mdOlist);
	text = text.replace( style.ulist, '<li>$1</li>');
	text = text.replace( style.quote, '<blockquote>$1</blockquote>');
	//text = text.replace( style.words, '<p>$1</p>');
	text = text.replace( style.enter, '<br />');
	let display = document.getElementById("preview");
	display.innerHTML = text;
}

let initText = function(textNode){
	textNode.value = "# Markdown在线编辑器\n" +
					"# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n\n" +
					"> 这里是一段引用\n这里是一段引用\n\n" +
					"1. 有序列表\n2. 有序列表\n3. 有序列表\n\n" +
					"- 无序列表\n- 无序列表\n- 无序列表\n\n" +
					"```\n// 代码段\n```\n\n";
	md2html.call(textNode);
}

let text = document.getElementById("text-input");
text.oninput = md2html;
initText( text );
