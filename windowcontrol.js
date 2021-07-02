var seperator = document.getElementById("seperator")
var shield = document.getElementById("shield")
var html_btn = document.getElementById("html_btn")
var css_btn = document.getElementById("css_btn")
var js_btn = document.getElementById("js_btn")
var mouseX = 0
var mouseY = 0

var window1 = document.getElementById("window1")
seperator.addEventListener("mousedown", function(e) {
	shield.addEventListener("mousemove", dragging)
	shield.style.display = "block"
	seperator.style.backgroundColor = "#ddd"
	seperator.style.width = "10px"
})
shield.addEventListener("mouseup", function(e) {
	shield.removeEventListener("mousemove", dragging)
	shield.style.display = "none"
	seperator.style.backgroundColor = "#aaa"
	seperator.style.width = "10px"
})



document.onmousemove = function(e) {
	mouseX = e.clientX
	mouseY = e.clientY
}

function dragSeperator() {
	window1.style.width = mouseX - 5
}

function dragging() {
	setTimeout(dragSeperator, 100)
}

function savecode() {
	if (current_code === "html") {
		html_code = codetext
	} else if (current_code === "css") {
		css_code = codetext
	} else if (current_code === "js") {
		js_code = codetext
	}
}

html_btn.addEventListener("click", function() {
	savecode()
	codetext = htmlcode
	preEnterRow = null
	preBackspaceRow = null
	preKeyEvent = null
	code_clipboard = null
	current_code = "html"
	draw()
	html_btn.style.backgroundColor = "#fff"
	css_btn.style.backgroundColor = "#eee"
	js_btn.style.backgroundColor = "#eee"
})
css_btn.addEventListener("click", function() {
	savecode()
	codetext = csscode
	preEnterRow = null
	preBackspaceRow = null
	preKeyEvent = null
	code_clipboard = null
	current_code = "css"
	draw()
	html_btn.style.backgroundColor = "#eee"
	css_btn.style.backgroundColor = "#fff"
	js_btn.style.backgroundColor = "#eee"
})
js_btn.addEventListener("click", function() {
	savecode()
	codetext = jscode
	preEnterRow = null
	preBackspaceRow = null
	preKeyEvent = null
	code_clipboard = null
	current_code = "js"
	draw()
	html_btn.style.backgroundColor = "#eee"
	css_btn.style.backgroundColor = "#eee"
	js_btn.style.backgroundColor = "#fff"
})

html_btn.style.backgroundColor = "#fff"
css_btn.style.backgroundColor = "#eee"
js_btn.style.backgroundColor = "#eee"




//console.log("windowcontrol")
