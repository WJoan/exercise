let style = {
	enter: /\n/gm,
	header: /^[#]{1,6}\s(.*)$/gm,
	olist: /(?:\d\.\s(.*\n))+/g,
	code: /(`{3}\n)([^`]*)(\n`{3})/g,
	eletem: /^\d+\.\s(.*)\n/gm,
	ulist: /^-\s(.*)\n/gm,
	quote: /(?:\n|^)[>]\s((?:.+\n)+)/g,
	words: /^([^<].*)$/gm
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
	text = text.replace( style.words, '<p>$1</p>');
	//text = text.replace( style.enter, '<br />');
	let display = document.getElementById("preview");
	display.innerHTML = text;
}