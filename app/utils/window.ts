import { remote } from 'electron';

const WINDOW_HEIGHT = 65;
const EXPANDED_WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 600;
const WINDOW_WIDTH_DEV = WINDOW_WIDTH + 500;

export function setUpWindow(): void {
  const win = remote.getCurrentWindow();

  const width =
    process.env.NODE_ENV === 'development' ? WINDOW_WIDTH_DEV : WINDOW_WIDTH;

  win.center();
  win.setMinimumSize(WINDOW_WIDTH, WINDOW_HEIGHT);
  win.setMaximumSize(WINDOW_WIDTH_DEV, EXPANDED_WINDOW_HEIGHT);
  win.setContentSize(width, WINDOW_HEIGHT, false);
}

export function expandWindow(): void {
  const width =
    process.env.NODE_ENV === 'development' ? WINDOW_WIDTH_DEV : WINDOW_WIDTH;

  const win = remote.getCurrentWindow();
  win.setContentSize(width, EXPANDED_WINDOW_HEIGHT, false);
}

export function contractWindow(): void {
  const width =
    process.env.NODE_ENV === 'development' ? WINDOW_WIDTH_DEV : WINDOW_WIDTH;

  const win = remote.getCurrentWindow();
  win.setContentSize(width, WINDOW_HEIGHT, false);
}
