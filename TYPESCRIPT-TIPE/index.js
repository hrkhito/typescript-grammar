"use strict";
let hasValue = true;
let count = 10;
let float = 3.14;
let negative = -0.12;
let single = 'hello';
let double = "hello";
let back = `hello`;
let hello;
hello = 'hello';
const person = {
    name: {
        first: 'Jack',
        last: 'Smith'
    },
    age: 21
};
const fruits = ['Apple', 'Banana', 'Grape'];
const book = ['business', 1500, false];
book.push(21);
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize["SHORT"] = "short";
    CoffeeSize["TALL"] = "tall";
    CoffeeSize["GRANDE"] = "grande";
    CoffeeSize["VENTI"] = "venti";
})(CoffeeSize || (CoffeeSize = {}));
const coffee = {
    hot: true,
    size: CoffeeSize.SHORT
};
coffee.size = CoffeeSize.TALL;
// anyはなるべく使わない anyに関わったものはjavascriptに戻ってしまいtypescriptの恩恵がなくなる
let anything = true;
anything = 'hello';
anything = ['hello', 33, true];
anything = {};
anything.fffff = 'fffff';
let banana = 'banana';
banana = anything;
let unionType = 10;
let unionTypes = [21, 'hello'];
const apple = 'apple';
let clothSize = 'large';
const cloth = {
    color: 'white',
    size: 'medium',
    overSize: clothSize
};
cloth.size = 'small';
function add(num1, num2) {
    return num1 + num2;
}
function sayHello() {
    console.log('Hello!');
}
console.log(sayHello());
let tmp;
let tmpNull = null;
// 型注釈がイコールの両脇で定義されているがどちらかにあればいい
const anotherAdd = function add(num1, num2) {
    return num1 + num2;
};
const doubleNumber = num => num * 2;
// 定義側で引数としてのコールバック関数の返り値をvoidとしたら、関数を呼び出す際の引数としてのコールバック関数の返り値がvoidでなかったとしても定義側のvoidが優先される
function doubleAndHandle(num, cb) {
    const doubleNum = cb(num * 2);
    console.log(doubleNum);
}
doubleAndHandle(21, doubleNum => {
    return doubleNum;
});
let unknownInput;
let anyInput;
let text;
unknownInput = 'hello';
unknownInput = 21;
unknownInput = true;
text = anyInput;
if (typeof unknownInput === 'string') {
    text = unknownInput;
}
// 決して何も返さない関数に使用する
function error(message) {
    throw new Error(message);
}
console.log(error('This is an error'));
