function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function setCaret(row, caretPosition) {
    var range = document.createRange()
    var sel = window.getSelection()
    
    /*if(row.textContent == "") {
    	range.setStart(row, 0)
    } else {
    	range.setStart(row, 1)
    }*/
    //console.log("caret position: " + caretPosition)
    if(caretPosition == 0) {
    	range.setStart(row, caretPosition)
    } else {
    	range.setStart(row.firstChild.firstChild, caretPosition)
    }
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}
function setRange(row1, row2, start_pos, end_pos) {
	var range = document.createRange()
	var sel = window.getSelection()
	range.setStart(row1.firstChild.firstChild, start_pos)
	range.setEnd(row2.firstChild.firstChild, end_pos)
	//range.collapse(false)
	sel.removeAllRanges()
	sel.addRange(range)
}

function focusRow(row){
	//console.log(row)
	update_selection_obj()
	row.contentEditable = true
	row.focus()
	//setTimeout(test_setRange, 1000)
	document.getSelection()
}

function test_setRange() {
	setRange(rows[0], rows[1], 1, 5)
}
