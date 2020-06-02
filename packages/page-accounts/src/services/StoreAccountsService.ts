// Copyright 2017-2020 @polkadot/apps-electron authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import FileSaver from 'file-saver';
import keyring from '@polkadot/ui-keyring';
import { CreateResult } from '@polkadot/ui-keyring/types';
import { KeypairType } from '@polkadot/util-crypto/types';
import { InputAddress } from '@polkadot/react-components';
import { ActionStatus } from '@polkadot/react-components/Status/types';

export interface CreateOptions {
  genesisHash?: string;
  name: string;
  tags?: string[];
}

export class StoreAccountsService {
  // get (account: string): void {}

  createAccount (suri: string, pairType: KeypairType, { genesisHash, name, tags = [] }: CreateOptions, password: string, success: string): ActionStatus {
    // we will fill in all the details below
    const status = { action: 'create' } as ActionStatus;

    try {
      const result = keyring.addUri(suri, password, { genesisHash, name, tags }, pairType);
      const { address } = result.pair;

      status.account = address;
      status.status = 'success';
      status.message = success;

      downloadAccount(result);
    } catch (error) {
      status.status = 'error';
      status.message = (error as Error).message;
    }

    return status;
  }
}

export function downloadAccount ({ json, pair }: CreateResult): void {
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json; charset=utf-8' });

  FileSaver.saveAs(blob, `${pair.address}.json`);
  InputAddress.setLastValue('account', pair.address);
}
