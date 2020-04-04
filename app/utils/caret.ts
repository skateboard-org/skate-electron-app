export function getCaretPosition(id) {
  const element = document.getElementById(id);
  if (element.selectionStart || element.selectionStart === '0') {
    return {
      start: element.selectionStart,
      end: element.selectionEnd
    };
  }
  return {
    start: 0,
    end: 0
  };
}

export function setCaretPosition(element, start: number, end: number) {
  // IE >= 9 and other browsers
  element.focus();
  element.setSelectionRange(start, end);
}

export function insertText(
  element,
  text: string,
  start: number,
  end: number,
  selectMode: string
) {
  element.setRangeText(text, start, end, selectMode);
}

export function isCursorAtTheEnd(event) {
  const positions = getCaretPosition(event.currentTarget.id);
  if (positions.start === positions.end) {
    if (positions.end === event?.target.value.length) {
      return true;
    }
  }
  return false;
}
