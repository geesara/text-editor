var htmlcode = [
	"<h1>Hello, world!</h1>"
]
var csscode = [
	"h1{color:red;}"
]
var jscode = [
	"console.log(\"Hello, world!\");"
]
/*var codetext = [
"var a = 2",
"var b = 4",
"console.log(a + b)"
]*/
var codetext = htmlcode
var preEnterRow = null
var preBackspaceRow = null
var preKeyEvent = null
var code_clipboard = null
var current_code = "html"

function draw(){

table_rows = ""
table_line_nos = ""
codetext.forEach(function(line,index){
	table_rows += "<tr><td class=\"row\"><code>" + displayCode(line) + "</code></td></tr>"
	table_line_nos += "<tr><td class=\"line-no\">" + (index + 1) + "</td></tr>"
})
document.getElementById("editor-table").innerHTML = table_rows
document.getElementById("line-no-table").innerHTML = table_line_nos







rows = document.querySelectorAll(".row")

rows.forEach(function(row, index){
	row.line_no = index
	row.onmouseup = function(){focusRow(row)}
	row.onmousedown = function(){
		row.contentEditable = false
	}
	row.onfocus = function(){
		row.style.backgroundColor = "#eee"
		row.addEventListener("paste", function(e){paste_code(e, row, index)})
		row.addEventListener("keydown", function(e){
			if(!selection_obj.is_collapsed) {
				if (e.ctrlKey) {
					ctrlplus_keydown_range(e, row, index)
				} else if (e.shiftKey) {
					shiftplus_keydown(e, row, index)
				} else if (e.key == 'Backspace') {
					backspace_keypress_range(e, row, index)
				} else if (e.key == 'ArrowUp' || e.key == 'ArrowLeft') {
					arrowupleft_keydown_range(e, row, index)
				} else if (e.key == 'ArrowDown' || e.key == 'ArrowRight') {
					arrowdownright_keydown_range(e, row, index)
				} else if (e.key == 'Tab') {
					tab_keydown(e, row, index)
				}
			} else {
				if (e.shiftKey) {
					shiftplus_keydown(e, row, index)
				} else if (e.key == 'Backspace'){
					backspace_keydown_caret(e, row, index)
				} else if (e.key == 'ArrowDown') {
					arrow_keydown(e, row, index)
				} else if (e.key == 'ArrowUp') {
					arrow_keyup(e, row, index)
				} else if (e.key == 'Tab') {
					tab_keydown(e, row, index)
				} else {
					/*codetext[index] = row.textContent
					var caret_pos = getCaretCharacterOffsetWithin(row)
					draw()
					rows[index].contentEditable = true
					rows[index].focus()
					setCaret(rows[index], caret_pos)
					console.log("abcd")*/
				}
			}
		})
		row.addEventListener("keyup", function(e) {
			if(selection_obj.is_collapsed) {
				if (e.key == "Control") {
				} else if (e.ctrlKey) {
				} else if (!(preKeyEvent == e)) {
					codetext[index] = row.textContent
					var caret_pos = getCaretCharacterOffsetWithin(row)
					draw()
					rows[index].contentEditable = true
					rows[index].focus()
					setCaret(rows[index], caret_pos)
				} else {
					console.log("key event blocked")
				}
			}
			preKeyEvent = e
		})
		/*row.addEventListener("input", function(e){
			if(!(e.key in ['Backspace', 'Enter'])){
				codetext[index] = row.textContent
				var caret_pos = getCaretCharacterOffsetWithin(row)
				draw()
				rows[index].contentEditable = true
				rows[index].focus()
				setCaret(rows[index], caret_pos)
				console.log("abcd")
			}
		})*/
		row.addEventListener("keypress", function(e){
			if(!selection_obj.is_collapsed) {
				if (e.key == 'Enter') {
					enter_keypress_range(e, row, index)
				} else {
					any_keypress_range(e, row, index)
				}
			} else {
				if(e.key == 'Enter'){
					enter_keydown(e, row, index)
				}
			}
		})
	}
	row.onblur = function(){
		row.style.backgroundColor = "white"
		row.contentEditable = false
	}
})

}






draw()
