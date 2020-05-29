// Copyright 2017-2020 @polkadot/apps-electron authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BrowserWindow, app, screen, dialog } from 'electron';
import path from 'path';
import { StoreAccountsService } from './services/StoreAccountsService';

const environment = process.env.NODE_ENV || 'production';

function createWindow (): Promise<unknown> {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    height,
    webPreferences: {
      nodeIntegration: true
    },
    width
  });

  if (environment === 'development') {
    win.webContents.openDevTools();

    return win.loadURL('http://0.0.0.0:3000/');
  }

  const mainFilePath = path.resolve(__dirname, 'index.html');

  return win.loadFile(mainFilePath);
}

const main = async () => {
  await createWindow();
  const storeAccounts = new StoreAccountsService();

  storeAccounts.save('newAddress');
  const stored = storeAccounts.get('newAddress');

  await dialog.showMessageBox({ message: stored });
};

app.whenReady().then(main).catch(console.error);
