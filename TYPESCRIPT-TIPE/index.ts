let hasValue: boolean = true;

let count: number = 10;
let float: number = 3.14;
let negative: number = -0.12;

let single: string = 'hello';
let double: string = "hello";
let back: string = `hello`;

let hello: string;
hello = 'hello';

const person: {
  name: {
    first: string;
    last: string;
  };
  age: number
} = {
  name: {
    first: 'Jack',
    last: 'Smith'
  },
  age: 21
};

const fruits: string[] = ['Apple', 'Banana', 'Grape'];

const book: [string, number, boolean] = ['business', 1500, false];
book.push(21);

enum CoffeeSize {
  SHORT = 'short',
  TALL = 'tall',
  GRANDE = 'grande',
  VENTI = 'venti'
}

const coffee = {
  hot: true,
  size: CoffeeSize.SHORT
}

coffee.size = CoffeeSize.TALL;

// anyはなるべく使わない anyに関わったものはjavascriptに戻ってしまいtypescriptの恩恵がなくなる
let anything: any = true;
anything = 'hello';
anything = ['hello', 33, true];
anything = {};
anything.fffff = 'fffff';

let banana = 'banana';
banana = anything;

let unionType: number | string = 10;
let unionTypes: (number | string)[] = [21,'hello'];

type ClothSize = 'small' | 'medium' | 'large';

const apple: 'apple' = 'apple';
let clothSize: ClothSize = 'large';

const cloth: {
  color: string;
  size: ClothSize;
  overSize: ClothSize;
} = {
  color: 'white',
  size: 'medium',
  overSize: clothSize
}

cloth.size = 'small';

function add(num1: number, num2: number): number | string {
  return num1 + num2;
}

function sayHello(): void {
  console.log('Hello!');
}

console.log(sayHello());

let tmp: undefined;
let tmpNull: null = null;

// 型注釈がイコールの両脇で定義されているがどちらかにあればいい
const anotherAdd: (n1: number, n2: number) => number = function add(num1: number, num2: number): number {
  return num1 + num2;
};

const doubleNumber: (num: number) => number = num => num * 2;

// 定義側で引数としてのコールバック関数の返り値をvoidとしたら、関数を呼び出す際の引数としてのコールバック関数の返り値がvoidでなかったとしても定義側のvoidが優先される
function doubleAndHandle(num: number, cb: (num: number) => void): void {
  const doubleNum = cb(num * 2);
  console.log(doubleNum);
}
doubleAndHandle(21, doubleNum => {
  return doubleNum;
});

let unknownInput: unknown;
let anyInput: any;
let text: string;

unknownInput = 'hello';
unknownInput = 21;
unknownInput = true;
text = anyInput;
if (typeof unknownInput === 'string') {
  text = unknownInput;
}

// 決して何も返さない関数に使用する
function error(message: string): never {
  throw new Error(message);
}
console.log(error('This is an error'));