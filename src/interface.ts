// type addFunc = (num1: number, num2: number) => number;
// interfaceで関数の型を表現する
interface addFunc {
  (num1: number, num2: number): number;
}
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
  return n1 + n2;
}

// extendsを使ってinterfaceを継承する方法
type Nameable = {
  name: string;
}

// interfaceはオブジェクトの型定義である
interface Human extends Nameable {
  readonly name: string;
  age: number;
  // メソッドの時のみに使える関数の型定義方法
  greeting(message: string): void;
}

// implementsは複数受け取ることが出来る。typeエイリアスで定義されたオブジェクトもimplementsとして定義できる。(インスタンスとして生成するのでstaticをinterface側で用いない)
class Developer implements Human {
  // implementsされた側でreadonlyになっていたとしても、こちら側では関係ない
  constructor(public name: string, public age: number, public experience: number) {}
  greeting(message: string) {
    console.log('Hello!');
  }
}

const human = {
  name: 'Quil',
  age: 38,
  greeting(message: string) {
    console.log(message);
  }
}

// 間接的な型定義だと大は小を兼ねる (直接的に定義するとエラーを起こす)
const tmpDeveloper = {
  name: 'Quil',
  age: 38,
  experience: 3,
  greeting(message: string) {
    console.log(message);
  }
}
const user: Human = tmpDeveloper;
// const user1: Human = {
//   name: 'Quil',
//   age: 38,
//   experience: 3,
//   greeting(message: string) {
//     console.log(message);
//   }
// };

// ?を使って、あってもなくても良いオプショナルプロパティとオプショナルパラメーターを使用する方法もある