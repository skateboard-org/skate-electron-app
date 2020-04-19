import { ipcRenderer, shell } from 'electron';

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

export function hideMainWindow(): void {
  ipcRenderer.send('hide-main-window');
}

export function openLinkInDefaultBrowser(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  link: string
) {
  event.preventDefault();
  shell.openExternal(link);
}
