// Copyright 2017-2020 @polkadot/apps-electron authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { app, remote } from 'electron';
import path from 'path';
import fs from 'fs';
import { KeypairType } from '@polkadot/util-crypto/types';
import { ActionStatus } from '@polkadot/react-components/Status/types';
import { IStoreAccountsService } from '@polkadot/apps/services/StoreAccountsService';

export interface CreateOptions {
  genesisHash?: string;
  name: string;
  tags?: string[];
}

export class StoreAccountsService implements IStoreAccountsService {
  userDataPath: string;

  constructor () {
    // For renderer process we need enabled remote module
    this.userDataPath = (app || remote.app).getPath('userData');
  }

  get (account: string): string {
    const filePath = path.join(this.userDataPath, account + '.txt');

    return fs.readFileSync(filePath, 'utf8');
  }

  createAccount (suri: string, pairType: KeypairType, { genesisHash, name, tags = [] }: CreateOptions, password: string, success: string): ActionStatus {
    console.log('ELECTRON');
    // we will fill in all the details below
    const status = { action: 'create' } as ActionStatus;

    const result = { json: 'dataToWrite', pair: { address: '123131321' } };
    const { json, pair } = result;
    const { address } = pair;

    const pathToWrite = path.join(this.userDataPath, `${pair.address}.json`);

    // const blob = new Blob([JSON.stringify(result)], { type: 'application/json; charset=utf-8' });

    try {
      status.account = address;
      status.status = 'success';
      status.message = success;

      fs.writeFileSync(pathToWrite, json);
      console.log('DONE');
    } catch (error) {
      status.status = 'error';
      status.message = (error as Error).message;
    }

    return status;
  }
}
