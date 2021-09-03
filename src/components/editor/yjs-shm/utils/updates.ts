// Copyright (c) 2021 LinkD
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as decoding from 'lib0/decoding';
import * as Y from 'yjs';

export const decodeUpdate = (update: Uint8Array) =>
  decodeUpdateV2(update, Y.UpdateDecoderV1);

export const decodeUpdateV2 = (
  update: Uint8Array,
  YDecoder:
    | typeof Y.UpdateDecoderV2
    | typeof Y.UpdateDecoderV1 = Y.UpdateDecoderV2
) => {
  const structs = [];
  const updateDecoder = new YDecoder(decoding.createDecoder(update));
  const lazyDecoder = new Y.LazyStructReader(updateDecoder, false);
  for (let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next()) {
    structs.push(curr);
  }
  const ds = Y.readDeleteSet(updateDecoder);
  return {
    structs: structs,
    deleteSet: ds,
  };
};
