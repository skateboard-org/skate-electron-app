import { ipcRenderer } from 'electron';

export function windowDidShow(callback: () => void): void {
  ipcRenderer.on('window-did-show', (event, messege) => {
    callback();
  });
}

export function windowDidHide(callback: () => void): void {
  ipcRenderer.on('window-did-hide', (event, messege) => {
    callback();
  });
}

export function hideMainWindor(): void {
  ipcRenderer.send('hide-main-window');
}
