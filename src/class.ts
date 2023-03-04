// classはオブジェクトの設計図としてだけではなく型としての役割もある
// thisというのは定義された場所ではなく呼び出された場所で決まる (ただアロー関数のthisは定義時に決まる)
// publicはクラスの中でも外でも読み取りと書き換えが可能。privateはクラスの中では読み込みと書き込みが可能でクラスの外では読み込みも書き込みも不可能。readonlyはクラスの中でも外でも読み込みだけ可能で書き込みは不可能
// Abstractクラスは継承にのみ使えるクラス
abstract class Person {

  // staticを使用して、インスタンスを作らずにクラスを使う方法
  static species = 'Homo sapiens';
  static isAdult(age: number) {
    if (age > 17) return true;
    return false;
  }

  // name: string;
  // private age: number;

  // 初期化の処理を省略する方法
  constructor(public name: string, protected age: number) {
    // this.name = initName;
    // this.age = initAge;
  }

  incrementAge() {
    this.age += 1;
  }

  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    this.explainJob();
  }
  // このメソッドは継承先で必ず定義しなければならない
  abstract explainJob(): void;
}
// const quil = new Person('Quil', 38);
// quil.greeting();
// console.log(Person.species);
// console.log(Person.isAdult(38));

// const anotherQuill = {
//   name: 'anotherQuill',
//   anotherGreeting: function () {
//     console.log(`Hello! My name is ${this.name}`);
//   },
//   greeting() {},
//   anotherGreeting1: quil.greeting,
// }
// anotherQuill.anotherGreeting();
// anotherQuill.anotherGreeting1();

class Teacher extends Person {
  private static instance: Teacher;
  explainJob() {
    console.log(`I am a teacher and I teach ${this.subject}.`);
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

  // privateをconstructorにつけてシングルトンパターンを実装する方法
  private constructor(name: string, age: number, private _subject: string) {
    super(name, age);
  }
  greeting() {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`);
  }
  static getInstance() {
    if (Teacher.instance) return Teacher.instance;
    Teacher.instance = new Teacher('Quill', 38, 'Math');
    return Teacher.instance;
  }

}
const teacher = Teacher.getInstance();
teacher.subject = 'Music';
console.log(teacher.subject);
teacher.incrementAge();
teacher.greeting();
console.log(Teacher.species);
console.log(Teacher.isAdult(38));