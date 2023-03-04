"use strict";
let addFunc;
addFunc = (n1, n2) => {
    return n1 + n2;
};
// implementsは複数受け取ることが出来る。typeエイリアスで定義されたオブジェクトもimplementsとして定義できる。(インスタンスとして生成するのでstaticをinterface側で用いない)
class Developer {
    // implementsされた側でreadonlyになっていたとしても、こちら側では関係ない
    constructor(name, age, experience) {
        this.name = name;
        this.age = age;
        this.experience = experience;
    }
    greeting(message) {
        console.log('Hello!');
    }
}
const human = {
    name: 'Quil',
    age: 38,
    greeting(message) {
        console.log(message);
    }
};
// 間接的な型定義だと大は小を兼ねる (直接的に定義するとエラーを起こす)
const tmpDeveloper = {
    name: 'Quil',
    age: 38,
    experience: 3,
    greeting(message) {
        console.log(message);
    }
};
const user = tmpDeveloper;
// const user1: Human = {
//   name: 'Quil',
//   age: 38,
//   experience: 3,
//   greeting(message: string) {
//     console.log(message);
//   }
// };
// ?を使って、あってもなくても良いオプショナルプロパティとオプショナルパラメーターを使用する方法もある
