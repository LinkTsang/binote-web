// Copyright (c) 2021 LinkD
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Table } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ROOM_NAME_PREFIX } from '../../components/editor/BiEditor';
import { decodeUpdate } from '../../components/editor/yjs-shm';

const DATABASE_INFO_COLUMNS = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'structs',
    dataIndex: 'structs',
    key: 'structs',
    render: (text: string) => <pre>{text}</pre>,
  },
  {
    title: 'deleteSet',
    dataIndex: 'deleteSet',
    key: 'deleteSet',
  },
];

interface UpdateInfo {
  id: IDBValidKey;
  update: Uint8Array;
  structs: string;
  deleteSet: string;
}

export interface DatabaseInfoProps {
  databaseName?: string;
}

export function DatabaseInfoPanel(props: DatabaseInfoProps) {
  const { id: documentId } = useParams<{ id: string }>();
  const databaseName =
    props.databaseName ?? `${ROOM_NAME_PREFIX}-${documentId}`;

  const [version, setVersion] = useState<number>();
  const [objectStoreNames, setObjectStoreNames] = useState<string[]>([]);
  const [updateInfoList, setUpdateInfoList] = useState<UpdateInfo[]>([]);

  const loadUpdates = useCallback((db: IDBDatabase) => {
    const storeName = 'updates';
    if (!db.objectStoreNames.contains(storeName)) {
      return;
    }
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const cursorRequest = objectStore.openCursor();
    const result: UpdateInfo[] = [];
    cursorRequest.onsuccess = function (event) {
      var cursor = cursorRequest.result;
      if (cursor) {
        const id = cursor.key;
        const update = cursor.value as Uint8Array;
        const { structs, deleteSet } = decodeUpdate(update);

        result.push({
          id: id,
          update,
          structs: JSON.stringify(structs, null, 2),
          deleteSet: JSON.stringify(deleteSet),
        });

        cursor.continue();
      } else {
        setUpdateInfoList(result);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      const idb = window.indexedDB;
      const request = idb.open(databaseName);

      request.onerror = function (event) {
        console.log('error');
      };

      request.onsuccess = function (event) {
        console.log('success');
        const db = request.result;
        setVersion(db.version);

        const names = db.objectStoreNames;
        setObjectStoreNames(
          _.toArray(_.range(names.length).map((i) => names.item(i) as string))
        );

        loadUpdates(db);
      };
    })();
  }, [databaseName, loadUpdates]);

  return (
    <div>
      <h1>Database Info</h1>
      <p>Name: {databaseName}</p>
      <p>Version: {version}</p>
      <p>Object store names:</p>
      <ul>
        {objectStoreNames.map((storeName) => (
          <li>{storeName}</li>
        ))}
      </ul>
      <Table dataSource={updateInfoList} columns={DATABASE_INFO_COLUMNS} />
    </div>
  );
}

export default DatabaseInfoPanel;
