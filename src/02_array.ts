// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Array functions

/**
 * ### chunk
 * chunk creates an array of elements split into groups the length of size. If
 * array can't be split evenly, the final chunk will be the remaining elements.
 * Two-dimensional arrays can be expressed using the T[][].
 *
 *  ## Examples
 *  _.chunk(["a", "b", "c", "d"], 2) => [["a", "b"], ["c", "d"]]
 *  _.chunk(["a", "b", "c", "d"], 3) => [["a", "b", "c"], ["d"]]
 *  _.chunk(["a", "b", "c"]) => [["a"], ["b"], ["c"]]
 * */
export function chunk<T>(a: T[], b?:number): T[][] {
  // b ?  a.split(b) :  a.split(1);
  // return a;
  let newArray:T[][] = [];
  while (a.length){
    b ?  newArray.push(a.splice(0,b)) :  newArray.push(a.splice(0,1));
  }
  return newArray;
}

/**
 * ### compact
 * compact accepts an array as an argument and returns an array.
 * The returned array does not contain falsey values (such as 0, null,
 * undefined, NaN).
 *
 * ## Examples
 * _.compact([1, undefined, 2, undefined, 3]) => [1, 2, 3]
 * _.compact([1, NaN, 2, NaN, 3]) => [1, 2, 3]
 * _.compact([1, null, 2, null, 3]) => [1, 2, 3]
 * _.compact([1, 0, 2, 0, 3]) => [1, 2, 3]
 * _.compact([1, undefined, NaN, null, 0, 2, 3]) => [1, 2, 3]
 */
export function compact(arg: (number|null|undefined|string)[]): (number|string)[] {
  return arg.filter(value => typeof value !== 'object' && typeof value !== 'undefined' && !isNaN(Number(value)) && value !== 0);
}
// function notEmpty<TValue>(value: TValue | null | undefined|number|string): value is TValue {
//   return value !== null && value !== undefined && value !== 0 && value === NaN;
// }
// export function compact(arg: (null|undefined|number|string)[]): (number|string)[] {
//   return arg.filter(notEmpty);
// }

/**
 * ### head
 * head takes in an array and returns its first item.
 *
 *  ## Examples
 *  _.head([1, 2, 3]) => 1
 *  _.head([]) => undefined
 */
export function head<T>(arg: T[]): T {
  return arg.length == 0 ? undefined : arg.shift();
}

/**
 * ### initial
 * initial returns a slice of the passed in array, excluding its last item.
 *
 * ## Examples
 *  _.initial<number>([1, 2, 3]) => [1, 2]
 *
 */
export function initial<T>(arg: T[]): T[] {
  return arg.slice(0, arg.length - 1);
}

/**
 * ### last
 * last takes in an array and returns its last item.
 *
 * ## Examples
 * _.last([1, 2, 3]) => 3
 * _.last([]) => undefined
 *
 */
export function last<T>(arg: T[]): T {
  return arg.length == 0 ? undefined : arg.pop();
}

/**
 * ### drop
 * drop takes in two arguments, an array and a count, and returns an array that
 * has count items removed from the beginning.
 * The count should be optional and default to 1.
 *
 * ## Examples
 * _.drop([1, 2, 3, 4], 2) => [3, 4]
 * _.drop([1, 2, 3, 4]) => [2, 3, 4]
 */
export function drop<T>(array: T[], count: number=1):T[] {
  return array.slice(count , array.length);
}

/**
 * ### dropRight
 * dropRight works like drop, except that it removes items from the end of the
 * passed in array.
 *
 * ## Examples
 * _.dropRight([1, 2, 3, 4], 2) => [1, 2]
 * _.dropRight([1, 2, 3, 4]) => [1, 2, 3]
 *
 */
export function dropRight<T>(array: T[], count: number=1):T[] {
  return array.slice(0 , array.length - (count));
}

interface DropWhilePredicate<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}
/**
 * ### dropWhile
 * dropWhile works similar to drop. It removes items from the beginning of the
 * array until the predicate returns false.
 *
 * ## Examples
 * _.dropWhile([1, 2, 3, 4, 5, 1], value => value < 3) => [3, 4, 5, 1]
 *
 */
export function dropWhile<T>(collection: Array<T>, predicate: DropWhilePredicate<T>): Array<T> {
    // let dropNumber = collection.findIndex(function(element, index) {
    // return!(predicate(element, index, collection))
    // });
    // let droppedArray = this.drop(collection, dropNumber);
    // return droppedArray;
      const cb = (element, index) => {
        return !predicate(element, index, collection);
      };
      let dropNumber = collection.findIndex(cb);
      let droppedArray = this.drop(collection, dropNumber);
      return droppedArray;
}

/**
 * ### dropRightWhile
 * dropRightWhile works similar to dropWhile, except that it iterates over the
 * passed in array in reversed order.
 *
 * ## Examples
 * _.dropRightWhile([5, 4, 3, 2, 1], value => value < 3) => [5, 4, 3]
 *
 */
export function dropRightWhile<T>(collection: Array<T>, predicate: DropWhilePredicate<T>): Array<T> {
  const cb = (element, index) => {
    return predicate(element, index, collection);
  };
  let dropNumber = collection.findIndex(cb);
  let droppedArray = this.dropRight(collection, dropNumber-1);
  return droppedArray;
}

/**
 * ### fill
 * fill mutates the passed in array. It fills collection[start] up to
 * collection[end] with a specified value.
 *
 * ## Examples
 * _.fill<any>([4, 6, 8, 10], "* ", 1, 3) => [4, "* ", "* ", 10]
 */
export function fill(arg1: (string | number)[], arg2: string, arg3: number, arg4: number): (string | number)[] {
  for (let i = 0; i < arg1.length; i++) {
    for (let j = arg3; j < arg4; j++) {
      if (arg1.indexOf(arg1[i]) === arg1.indexOf(arg1[j])) {
        arg1[i] = arg2;
    }
  }
}
  return arg1;
}

// Here we define an interface for the predicate used in the findIndex function.
export interface FindIndexPredicate {
  arg1: number[];
  arg2: (value: any) => boolean;
  arg3?: number;
}

/**
 * ### findIndex
 * findIndex accepts three arguments:
 * 1. The array to be traversed.
 * 2. An iteratee function.
 * 3. The index from where we should start traversing the array.
 *
 * ## Examples
 * _.findIndex([4, 6, 8, 10], () => false) => -1
 * _.findIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findIndex([4, 6, 6, 8, 10], value => value === 6, 2) => 2
 *
 */
export function findIndex( arg1: number[], arg2:(value?: any) => boolean, arg3?: number)  {
  let element = [];
  let result;
  if (arg1.filter(arg2) == false) {
    result = -1;
    return result;
  }
  element = arg1.filter(arg2);
  if (arg3) {
    for (let j = arg3; j < arg1.length; j++) {
      if (arg1[j] == element[0]) {
        result = j;
        return result;
      }
    }
  } else {
    for (let i = 0; i < arg1.length; i++) {
      if (arg1[i] == element[0]) {
        result = i;
        return result;
      }
     } 
    }
}

/**
 * ### findLastIndex
 * findLastIndex works line findIndex, but traverses the collection backwards.
 * The third argument is the index from where we start traversing the array.
 *
 * ## Examples
 * _.findLastIndex([4, 6, 8, 10], () => false) => -1
 * _.findLastIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findLastIndex([4, 6, 8, 6, 10], value => value === 6) => 3
 * _.findLastIndex([4, 6, 6, 8, 10], value => value === 6, 1) => 1
 *
 */
export function findLastIndex( arg1: number[], arg2:(value?: any) => boolean, arg3?: number)  {
  let element = [];
  let result;
  if (arg1.filter(arg2) == false) {
    result = -1;
    return result;
  }
  element = arg1.filter(arg2);
  if (arg3) {
    for (let j = arg3; j < arg1.length; j++) {
      if (arg1[j] == element[0]) {
        result = j;
        return result;
      }
    }
  } else if (element.length > 1) {
    for (let i = arg1.length - 1; i >= 0; i--) {
      if (arg1[i] == element[0]) {
        result = i;
        return result;
      }
    }
  } else {
    for (let i = 0; i < arg1.length; i++) {
      if (arg1[i] == element[0]) {
        result = i;
        return result;
      }
    } 
    
  }
}

/**
 * ### nth
 * Given an array, should return the nth item of the passed in array.
 *
 * ## Examples
 * _.nth<number>([1, 2, 3], 0) => 1
 * _.nth<number>([1, 2, 3], 1) => 2
 * _.nth<number>([1, 2, 3], 2) => 3
 * _.nth<number>([1, 2, 3]) => 1
 *
 */
export function nth(arg1: number[], arg2?: number): number {
  if (arg1 && arg2) {
    return arg1[arg2];
  } else {
    return arg1[0];
  }
}

/**
 * ### zip
 *
 * ## Examples
 * // We can also use something called "union types" here.
 * _.zip<string | number | boolean>(["a", "b"], [1, 2], [true, false]) => [["a", 1, true], ["b", 2, false]]
 */
type arr = string | number | boolean;
export function zip(arr1: arr[], arr2: arr[], arr3: arr[]): arr[][]{
 let newMergedArr = arr1.concat(arr2, arr3);
 let arrFirstIndex = [];
 let arrSecondIndex = [];
 for (let i = 0; i < newMergedArr.length; i++) {
    if (i % 2 == 0) {
      arrFirstIndex.push(newMergedArr[i]);
    } else {
      arrSecondIndex.push(newMergedArr[i]);
    }  
  }
  console.log(arrFirstIndex);
  console.log(arrSecondIndex);
  let newMergedArr2 = arrFirstIndex.concat(arrSecondIndex);
  return chunk(newMergedArr2, 3);
}
