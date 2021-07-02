var selection_obj = {
	is_collapsed: true,
	start_line: 0,
	start_pos: 0,
	end_line: 0,
	end_pos: 0,
}
var table = document.getElementById("editor-table")

function update_selection_obj() {
	var selection = document.getSelection()
	var first_line = selection.anchorNode.parentElement.parentElement.line_no
	var first_pos = selection.anchorOffset
	var second_line = selection.focusNode.parentElement.parentElement.line_no
	var second_pos = selection.focusOffset
	selection_obj.is_collapsed = selection.isCollapsed
	
	if(first_line == second_line) {
		if(first_pos < second_pos) {
			selection_obj.start_line = first_line
			selection_obj.start_pos = first_pos
			selection_obj.end_line = second_line
			selection_obj.end_pos = second_pos
		} else {
			selection_obj.start_line = second_line
			selection_obj.start_pos = second_pos
			selection_obj.end_line = first_line
			selection_obj.end_pos = first_pos
		}
		
	} else if(first_line < second_line) {
		selection_obj.start_line = first_line
		selection_obj.start_pos = first_pos
		selection_obj.end_line = second_line
		selection_obj.end_pos = second_pos
	} else {
		selection_obj.start_line = second_line
		selection_obj.start_pos = second_pos
		selection_obj.end_line = first_line
		selection_obj.end_pos = first_pos
	}
}

function copy_selection() {
	var selected_code = codetext.slice(selection_obj.start_line, selection_obj.end_line + 1)
	console.log(selected_code)
	document.execCommand('copy')
}

//function 

//table.addEventListener("mouseup", update_selection_obj)
