function enter_keydown(e, row, index) {
	if (!row.contentEditable){
		console.log("Enter second time")
		return false
	}
	e.preventDefault()
	var caretPosition = getCaretCharacterOffsetWithin(row)
	var newlineText = row.textContent.substr(caretPosition)
	
	if (caretPosition == 0 && row == preEnterRow){
		console.log("Enter second time")
		return false
	}
	
	codetext[index] = codetext[index].substr(0, caretPosition)
	codetext.splice(index + 1, 0, newlineText)
	draw()
	
	rows[index + 1].contentEditable = true
	rows[index + 1].focus()
	
	setCaret(rows[index+1], 0)
	row.contentEditable = false
	//console.log(codetext.map(function(l,i){return `${i}| ${l}`}).join("\n"))
	
	preEnterRow = row
	//return false
}



function arrow_keydown(e, row, index) {
	if(rows[index + 1]){
		e.preventDefault()
		rows[index + 1].contentEditable = true
		rows[index + 1].focus()
	}
}
function arrow_keyup(e, row, index) {
	if(index >= 1){
		e.preventDefault()
		rows[index - 1].contentEditable = true
		rows[index - 1].focus()
	}
}




function backspace_keydown_caret(e, row, index) {
	if(row == preBackspaceRow){
		e.preventDefault()
		return false
	}
	if(index >= 1 && getCaretCharacterOffsetWithin(row) == 0){
		e.preventDefault()
		codetext.splice(index, 1)
		caretPosition = rows[index - 1].textContent.length
		draw()
		rows[index - 1].contentEditable = true
		rows[index - 1].focus()
		rows[index - 1].innerHTML = "<code>" + displayCode(rows[index - 1].textContent + row.textContent) + "</code>"
		codetext[index - 1] = rows[index - 1].textContent
		setCaret(rows[index - 1], caretPosition)
	}
	preBackspaceRow = e
}







function any_keypress_range(e, row, index) {
	if (selection_obj.start_line < selection_obj.end_line) {
		codetext[index] = codetext[index].substr(0, selection_obj.start_pos)
		codetext[index] += codetext[selection_obj.end_line].substr(selection_obj.end_pos)
		codetext.splice(index + 1, selection_obj.end_line - selection_obj.start_line)
		draw()
		rows[index].contentEditable = true
		rows[index].focus()
		setCaret(rows[index], selection_obj.start_pos)
	}
	selection_obj.is_collapsed = true
	update_selection_obj()
	console.log(e)
}
function backspace_keypress_range(e, row, index) {
	if (selection_obj.start_line < selection_obj.end_line) {
		e.preventDefault()
		codetext[index] = codetext[index].substr(0, selection_obj.start_pos)
		codetext[index] += codetext[selection_obj.end_line].substr(selection_obj.end_pos)
		codetext.splice(index + 1, selection_obj.end_line - selection_obj.start_line)
		draw()
		rows[index].contentEditable = true
		rows[index].focus()
		setCaret(rows[index], selection_obj.start_pos)
	}
	selection_obj.is_collapsed = true
	update_selection_obj()
}
function enter_keypress_range(e, row, index) {
	if (selection_obj.start_line < selection_obj.end_line) {
		e.preventDefault()
		codetext[index] = codetext[index].substr(0, selection_obj.start_pos)
		codetext[index + 1] = codetext[selection_obj.end_line].substr(selection_obj.end_pos)
		codetext.splice(index + 2, selection_obj.end_line - selection_obj.start_line)
		draw()
		rows[index + 1].contentEditable = true
		rows[index + 1].focus()
		setCaret(rows[index + 1], 0)
	} else if (selection_obj.start_line == selection_obj.end_line) {
		e.preventDefault()
		var new_line_text = codetext[index].substr(selection_obj.end_pos)
		codetext[index] = codetext[index].substr(0, selection_obj.start_pos)
		//codetext[index + 1] = codetext[selection_obj.end_line].substr(selection_obj.end_pos)
		codetext.splice(index + 1, 0, new_line_text)
		draw()
		rows[index + 1].contentEditable = true
		rows[index + 1].focus()
		setCaret(rows[index + 1], 0)
	}
	selection_obj.is_collapsed = true
	update_selection_obj()
}
function arrowupleft_keydown_range(e, row, index) {
	e.preventDefault()
	rows[index].contentEditable = true
	rows[index].focus()
	setCaret(rows[index], selection_obj.start_pos)
	selection_obj.is_collapsed = true
	update_selection_obj()
}
function arrowdownright_keydown_range(e, row, index) {
	e.preventDefault()
	rows[selection_obj.end_line].contentEditable = true
	rows[selection_obj.end_line].focus()
	setCaret(rows[selection_obj.end_line], selection_obj.end_pos)
	selection_obj.is_collapsed = true
	update_selection_obj()
}
function ctrlplus_keydown_range(e, row, index) {
	if (e.keyCode == 88) {
		if (selection_obj.start_line < selection_obj.end_line) {
			//e.preventDefault()
			//copy_selection()
			copy_clipboard()
			document.execCommand('copy')
			codetext[index] = codetext[index].substr(0, selection_obj.start_pos)
			codetext[index] += codetext[selection_obj.end_line].substr(selection_obj.end_pos)
			codetext.splice(index + 1, selection_obj.end_line - selection_obj.start_line)
			draw()
			rows[index].contentEditable = true
			rows[index].focus()
			setCaret(rows[index], selection_obj.start_pos)
			selection_obj.is_collapsed = true
			update_selection_obj()
		}
	} else if (e.keyCode == 86) {
		if (selection_obj.start_line < selection_obj.end_line) {
			console.log(row.textContent)
			//e.preventDefault()
			//copy_selection()
			
			codetext[index] = codetext[index].substr(0, selection_obj.start_pos)
			codetext[index] += codetext[selection_obj.end_line].substr(selection_obj.end_pos)
			codetext.splice(index + 1, selection_obj.end_line - selection_obj.start_line)
			draw()
			rows[index].contentEditable = true
			rows[index].focus()
			setCaret(rows[index], selection_obj.start_pos)
			selection_obj.is_collapsed = true
			update_selection_obj()
			
			//setTimeout(()=>paste_clipboard(selection_obj.start_pos, index),1000)
		} else if (selection_obj.start_line == selection_obj.end_line) {
			codetext[index] = codetext[index].substr(0, selection_obj.start_pos) + codetext[index].substr(selection_obj.end_pos)
			draw()
			rows[index].contentEditable = true
			rows[index].focus()
			setCaret(rows[index], selection_obj.start_pos)
			selection_obj.is_collapsed = true
			update_selection_obj()
		}
	}
	console.log(e)
}

function tab_keydown(e, row, index) {
	e.preventDefault()
	for (var i = selection_obj.start_line;i <= selection_obj.end_line;i++) {
		codetext[i] = "    " + codetext[i]
	}
	draw()
	rows[index].contentEditable = true
	rows[index].focus()
	if (selection_obj.is_collapsed) {
		setCaret(rows[index], selection_obj.start_pos + 4)
	} else {
		setRange(
			rows[selection_obj.start_line],
			rows[selection_obj.end_line],
			selection_obj.start_pos + 4,
			selection_obj.end_pos + 4
		)
	}
	update_selection_obj()
}

function shiftplus_keydown(e, row, index) {
	if (e.key == "Tab") {
		e.preventDefault()
		for (var i = selection_obj.start_line;i <= selection_obj.end_line;i++) {
			if (codetext[i].substr(0, 4) === "    ") {
				codetext[i] = codetext[i].substr(4)
			}
		}
		draw()
		rows[index].contentEditable = true
		rows[index].focus()
		if (selection_obj.is_collapsed) {
			setCaret(rows[index], rows[index].textContent.length)
		} else {
			setRange(
				rows[selection_obj.start_line],
				rows[selection_obj.end_line],
				0,
				rows[selection_obj.end_line].textContent.length
			)
		}
		update_selection_obj()
	}
}

function copy_clipboard() {
	code_clipboard = codetext.slice(selection_obj.start_line, selection_obj.end_line + 1)
	code_clipboard[0] = code_clipboard[0].substr(selection_obj.start_pos)
	code_clipboard[code_clipboard.length - 1] = code_clipboard[code_clipboard.length - 1].substr(0, selection_obj.end_pos)
	console.log(code_clipboard)
}
function paste_clipboard(caret_pos, index) {
	codetext[index] = rows[index]
	console.log(codetext[index])
	//navigator.clipboard.readText().then(function(clipText){console.log(clipText)})
}

function paste_code(e, row, index) {
	e.stopPropagation()
	e.preventDefault()
	var caretPosition = getCaretCharacterOffsetWithin(row)
	var new_code = e.clipboardData.getData('Text').split("\n")
	var end_position = new_code[new_code.length - 1].length
	new_code[0] = row.textContent.substr(0, caretPosition) + new_code[0]
	new_code[new_code.length - 1] = new_code[new_code.length - 1] + row.textContent.substr(caretPosition)
	codetext.splice(index, 1, ...new_code)
	draw()
	rows[index].contentEditable = true
	rows[index].focus()
	if (new_code.length == 1) {
		setRange(rows[index], rows[index], caretPosition, caretPosition + end_position)
	} else {
		setRange(rows[index], rows[index + new_code.length - 1], caretPosition, end_position)
	}
	update_selection_obj()
	console.log(codetext)
	console.log(new_code)
}
