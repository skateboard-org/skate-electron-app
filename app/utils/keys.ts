export const KEY_UP = 'KEY_UP';
export const KEY_DOWN = 'KEY_DOWN';
export const KEY_LEFT = 'KEY_LEFT';
export const KEY_RIGHT = 'KEY_RIGHT';
export const KEY_ENTER = 'KEY_ENTER';
export const KEY_TAB = 'KEY_TAB';
export const INVALID_KEY = 'INVALID_KEY';

export function keyMapper(event) {
  const { keyCode } = event;
  if (keyCode === 37) {
    return KEY_LEFT;
  }
  if (keyCode === 39) {
    return KEY_RIGHT;
  }
  if (keyCode === 38) {
    return KEY_UP;
  }
  if (keyCode === 40) {
    return KEY_DOWN;
  }
  if (keyCode === 9) {
    return KEY_TAB;
  }
  if (keyCode === 13) {
    return KEY_ENTER;
  }
  return INVALID_KEY;
}
