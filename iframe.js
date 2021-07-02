function runCode(htmlcode, csscode, jscode) {
	var iframe = document.getElementById("test_iframe")
	var iframedoc = iframe.contentWindow.document
	if(iframedoc) {
		var jsConsoleCode = `console.stdlog = console.log.bind(console);
			   	console.logs = [];
				console.log = function(){
				    console.logs.push(Array.from(arguments));
				    console.stdlog.apply(console, arguments);
				}`
		var jsConsoleCode = ""
		var js_code = `<script>${jsConsoleCode}</script><script>${jscode}</script>`
		var css_code = `<style>${csscode}</style>`
		var htmlDoc = `<html><head>${css_code}</head><body>${htmlcode}</body>${js_code}</html>`
		iframedoc.open()
		iframedoc.write(htmlDoc)
		iframedoc.close()
	}
}

function run(){
	//eval(codetext.join("\n"))
	runCode(htmlcode.join("\n"), csscode.join("\n"), jscode.join("\n"))
}

function displayCode(code) {
	str = code.replaceAll(">", "&gt;")
	str = str.replaceAll("<", "&lt;")
	str = str.replaceAll(" ", "&nbsp;")
	return str
}

document.getElementById("run").addEventListener("click", run)
