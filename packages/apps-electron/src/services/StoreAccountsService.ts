// Copyright 2017-2020 @polkadot/apps-electron authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { app, remote } from 'electron';
import path from 'path';
import fs from 'fs';

export class StoreAccountsService {
  userDataPath: string;

  constructor () {
    // For renderer process we need enabled remote module
    this.userDataPath = (app || remote.app).getPath('userData');
  }

  get (account: string): string {
    const filePath = path.join(this.userDataPath, account + '.txt');

    return fs.readFileSync(filePath, 'utf8');
  }

  save (account: string): void {
    // const blob = new Blob([JSON.stringify(account)], { type: 'application/json; charset=utf-8' });

    // FileSaver.saveAs(blob, `${pair.address}.json`);
    //
    const filePath = path.join(this.userDataPath, account + '.txt');

    fs.writeFileSync(filePath, account);
  }
}
