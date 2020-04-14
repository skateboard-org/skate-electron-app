import { ChangeEvent } from 'react';

export function getCaretPosition(
  event: ChangeEvent<HTMLInputElement>
): { start: number; end: number; id: string } {
  const { id } = event.currentTarget;
  const element = document.getElementById(id) as HTMLInputElement;
  if (element.selectionStart || element.selectionStart === 0) {
    return {
      start: element.selectionStart,
      end: element.selectionEnd || 0,
      id
    };
  }
  return {
    start: 0,
    end: 0,
    id
  };
}

export function setCaretPosition(id: string, start: number, end: number) {
  // IE >= 9 and other browsers
  const element = document.getElementById(id) as HTMLInputElement;
  element.focus();
  element.setSelectionRange(start, end);
}

export function insertText(
  element: HTMLInputElement,
  text: string,
  start: number,
  end: number,
  selectMode: 'end' | 'preserve' | 'select' | 'start' | undefined
) {
  element.setRangeText(text, start, end, selectMode);
}

export function isCursorAtTheEnd(event: ChangeEvent<HTMLInputElement>) {
  const positions = getCaretPosition(event);
  if (positions.start === positions.end) {
    if (positions.end === event.target.value.length) {
      return true;
    }
  }
  return false;
}
