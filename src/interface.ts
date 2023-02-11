type addFunc = (num1: number, num2: number) => number

// ちなみにinterfaceではオブジェクトの型しか定義できないのに関数の型を定義するパターンはある
// interface addFunc {
//   (num1: number, num2: number): number;
// }

let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Nameable {
  name: string;
  nickName?: string;
}

interface Human extends Nameable {
  age: number;
  // オブジェクトの関数であるメソッドにしか使えない型指定方法
  greeting(message: string): void;
}

const human: Human = {
  name: 'Quil',
  age: 38,
  greeting(message: string): void {
    console.log(message);
  }
}

// implementsはDeveloperというクラスが生成するインスタンスが持っているオブジェクトの形を表している
class Developer implements Human {
  constructor(public name: string, public age: number, public experience: number) {
  }
  greeting(message: string): void {
    console.log('Hello!');
  }
}

const tmpDeveloper = {
  name: 'Quill',
  age: 38,
  experience: 3,
  greeting(message: string) {
    console.log(message)
  }
}

const user: Human = new Developer('Quill', 38, 3);