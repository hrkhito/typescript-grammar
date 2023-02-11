// classはインスタンスを作成するための設計書としての役割だけではなく型の指定としても使われる

// Abstractクラスを使用して、継承にのみ使えるクラスを作成する方法
abstract class Person {
  // name: string;
  // private age: number;

  // staticを使用すればインスタンスを作らずにクラスを使える
  static species = 'Homo sapiens';
  static isAdult(age: number) {
    if (age > 17) return true;
    return false;
  }

  // readonlyはクラスの中や外からでも読み取る専門。書くことはできない。ただconstructor内では書くことはできる
  readonly id: number = 32;

  // publicはクラスの中や外からでも読み書きできる。privateはクラスの中では読み書きできるがクラスの外では読み書きができない。
  constructor(public name: string, protected age: number) {
    this.id = 31;
  }

  incrementAge() {
    this.age += 1;
  }

  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    this.explainJob();
  }

  abstract explainJob(): void;
}

// newを用いてインスタンスを作成していない
Person.species;
Person.isAdult(18);

let person2: Person;

// abstractクラスはインスタンスを作成できない
// const quill = new Person('Quill',38);
// quill.greeting();

// const anotherQuill = {
//   name: 'anotherQuill',
//   greeting: quill.greeting
// }
// anotherQuill.greeting();

// アロー関数内のthisは定義時に決まる 普通の関数内のthisは呼び出し時に決まる

class Teacher extends Person {
  private static instance: Teacher;

  explainJob(): void {
    console.log(`Hello My name is ${this.name}. I am ${this.age} years old.`);
  }

  get subject(): string {
    if (!this._subject) {
      throw new Error('There is no subject.');
    }
    return this._subject;
  }

  set subject(value) {
    if (!value) {
      throw new Error('There is no subject.');
    }
    this._subject = value;
  }

  private constructor(name: string, age: number, private _subject: string) {
    super(name,age);
  }

  static getInstance() {
    if (Teacher.instance) return Teacher.instance;
    Teacher.instance = new Teacher('Quill', 38, 'Math');
    return Teacher.instance;
  }

  greeting(this: Teacher) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`);
  }
}

const teacher = Teacher.getInstance();
teacher.greeting();

teacher.subject;
teacher.subject = 'English';