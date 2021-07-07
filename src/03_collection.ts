// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Collection functions

export interface Dictionary<T> {
  [index: string]: T;
}

interface ArrayForEachIteratee<T> {
  (value?: T, index?: number, collection?: Array<T>): any;
}

interface DictionaryForEachIteratee<T> {
  (value?: T, key?: string, collection?: Dictionary<T>): any;
}

/**
 * ### forEach
 * should iterate over all items of array or all properties of an object
 *
 * ## Examples
 *
 *  let collection = ["first", "second", "third"];
 *  let result = [];
 *  let iteratee = (value, index, collection) => result[index] = [index, value];
 *
 *  _.forEach(collection, iteratee); => result === [[0, 'first'], [1, 'second'], [2, 'thidrd']];
 *
 *  collection = {
 *    "0": "first",
 *    "1": "second",
 *    "2": "third"
 *  };
 *  result = [];
 *  iteratee = (value, index, collection) => result[index] = [index, value];
 *
 *  _.forEach(collection, iteratee); => result === [['0', 'first'], ['1', 'second'], ['2', 'thidrd']];
 *
 */
export function forEach<T>(collection: (Object | Array<T>), iteratee: (arg1:T , arg2: number | string, arg3: (Object | Array<T>)) => void) {
  let result = [];
  if (typeof collection === "object") {
    for (const key in collection) {
      iteratee(collection[key], key, collection);
    }
  }
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iteratee(collection[i], i, collection);
    }
  }
  return result;
}
  

interface EveryIteratee<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}
 interface params<T> {
   collection: Object | Array<T>;
   iteratee: (arg1:T , arg2?: number | string, arg3?: (Object | Array<T>)) => boolean;
 }
/**
 * ### every
 *
 * checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate returns falsey.
 * returns true if all elements pass the predicate check, else false.
 *  Note: This method returns true for empty collections because everything is true of elements of empty collections.
 *
 * ## Examples
 *
 *  _.every([true, 1, null, 'yes'], Boolean); => false
 *  _.every([null, null, null], (value, index, collection) => value === null); => true
 */
export function every<T>(collection: Object | Array<T>, iteratee: (arg1, arg2, arg3) => boolean) {
  let truthcount = 0;
  if (typeof collection === "object") {
    for (const key in collection) {
      let boolValue = iteratee(collection[key], key, collection);
      if (boolValue === false ) {
        return false;
      } else {
        truthcount + 1;
      }
    }
  }
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      let boolValue = iteratee(collection[i], i, collection);
      if (boolValue === false ) {
        return false;
      } else {
        truthcount + 1;
      }
    }
  }
  return true;
}

/**
 * ### filter
 *   iterates over elements of collection, returning an array of all elements predicate returns truthy for.
 *
 * ## Examples
 *
 *  let collection = [1, 2, 3, 4, 1, 2];
 *  let iteratee = x => x < 3;
 *
 *   _.filter<number>(collection, iteratee) => [1, 2, 1, 2]
 *
 *  collection: _.Dictionary<number> = {
 *    'a': 1,
 *     'b': 2,
 *    'c': 3
 *   };
 *  iteratee = (v, k) => !(v === 2 && k === 'b');
 *
 *  _.filter<number>(collection, iteratee) => { 'a': 1, 'c': 3 }
 *
 */
export function filter<T>(collection: Object | Number[],   iteratee: (arg1: Number, arg2?: Number | String) => boolean ) {
  let resultArray = [];
  let resultObject = {};
  if (typeof collection === "object") {
    for (const key in collection) {
      let boolValue = iteratee(collection[key], key);
      if (boolValue === true) {
        resultObject[key] = collection[key];
      }
    }
  }
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      let boolValue = iteratee(collection[i]);
      if (boolValue === true) {
        resultArray.push(collection[i]);
      }
    }
    return resultArray;
  }
  return resultObject;
}

/**
 * ### map
 * Creates an array of values by running each element in collection thru iteratee
 *
 * ## Examples
 *
 *  let collection = [1, 2, 3];
 *  let iteratee = x => x * 3;
 *
 *   _.map<number>(collection, iteratee) => [3, 6, 9]
 *
 *  collection: _.Dictionary<number> = {
 *    'a': 1,
 *    'b': 2
 *   };
 *  iteratee = (value, key) => [value, key];
 *
 *  _.map<number>(collection, iteratee) => [[1,'a'], [2, 'b']]
 */
export function map<T>(collection: object | number[], iteratee: (key: number, value?: string) => number | T[]) {
  let resultArray = [];
  let resultObject = [];
  if (typeof collection === "object") {
    for (const key in collection) {
      let value = iteratee(collection[key], key);
      resultObject.push(value);
    }
  }
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      let value = iteratee(collection[i]);
      resultArray.push(value);
    }
    return resultArray;
  }
  return resultObject;
}


/**
 * ### reduce
 *  Reduces collection to a value which is the accumulated result of running each element in
 *  collection thru iteratee, where each successive invocation is supplied the return value of
 *  the previous. If accumulator is not given, the first element of collection is used as the
 *  initial value.
 *  The iteratee is invoked with four arguments:(accumulator, value, index|key, collection).
 *
 * ## Examples
 *
 *  _.reduce([1, 2], (sum, n) => sum + n, 0);  => 3
 *  _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function (result, value, key) {
 *      if (!result[value]) {
 *        result[value] = [];
 *      }
 *      result[value].push(key);
 *      return result;
 *    }, {}); => { '1': ['a', 'c'], '2': ['b'] }
 *
 */
export function reduce<T>(collection: object | number[], iteratee: (key, value?, result?) => number | object, seed: number | object) {
  if (typeof collection === "object" && typeof seed === "object") {
    for (const key in collection) {
       iteratee(seed, collection[key], key);
    }
  }
  if (Array.isArray(collection) && typeof seed === "number") {
    for (let i = 0; i < collection.length; i++) {
      seed = iteratee(collection[i], seed);
    }
  }
  return seed;
}
