// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Immutable from 'immutable';

export type Delta =
  | {
    op: 'set';
    path: string[];
    value: object;
  }
  | {
    op: 'insert';
    path: string[];
    value: object;
  }
  | {
    op: 'delete';
    path: string[];
  };

class Op {
  public static set(path: string[], value: Object): Delta {
    return {
      op: 'set',
      path: path,
      value: value,
    };
  }
  public static delete(path: string[]): Delta {
    return {
      op: 'delete',
      path: path,
    };
  }
}

function isMap(obj: Object) {
  return Immutable.Iterable.isKeyed(obj);
}

function isIndexed(obj: object) {
  return Immutable.Iterable.isIndexed(obj);
}

function toJS(obj: Object) {
  if (isMap(obj)) {
    return (obj as unknown as Immutable.Map<unknown, unknown>).toJS();
  } else if (isIndexed(obj)) {
    return (obj as unknown as Immutable.List<unknown>).toJS();
  } else {
    return obj;
  }
}

export function diffList<E>(
  aList: Immutable.List<E>,
  bList: Immutable.List<E>,
  path: any[] = []
) {
  if (Immutable.is(aList, bList)) {
    return [];
  }
  let ops: Delta[] = [];
  // todo
  return ops;
}

export function diffMap<K, V>(
  aMap: Immutable.Map<K, V>,
  bMap: Immutable.Map<K, V>,
  path: any[] = []
) {
  if (Immutable.is(aMap, bMap)) {
    return [];
  }
  let ops: Delta[] = [];

  aMap.forEach((aValue, aKey) => {
    if (!aKey || !aValue) {
      return;
    }
    if (bMap.has(aKey)) {
      const bValue = bMap.get(aKey);
      if (Immutable.is(aValue, bValue)) {
        return;
      } else if (isMap(aValue) && isMap(bValue)) {
        ops = ops.concat(
          diffMap(
            aValue as unknown as Immutable.Map<unknown, unknown>,
            bValue as unknown as Immutable.Map<unknown, unknown>,
            path.concat(aKey)
          )
        );
      } else {
        ops.push(Op.set(path.concat(aKey), toJS(bValue)));
      }
    } else {
      ops.push(Op.delete(path.concat(aKey)));
    }
  });

  bMap.forEach((bValue, bKey) => {
    if (!bKey || !bValue) {
      return;
    }
    if (!aMap.has(bKey)) {
      ops.push(Op.set(path.concat(bKey), toJS(bValue)));
    }
  });

  return ops;
}
