"use strict";
// classはインスタンスを作成するための設計書としての役割だけではなく型の指定としても使われる
// Abstractクラスを使用して、継承にのみ使えるクラスを作成する方法
class Person {
    static isAdult(age) {
        if (age > 17)
            return true;
        return false;
    }
    // publicはクラスの中や外からでも読み書きできる。privateはクラスの中では読み書きできるがクラスの外では読み書きができない。
    constructor(name, age) {
        this.name = name;
        this.age = age;
        // readonlyはクラスの中や外からでも読み取る専門。書くことはできない。ただconstructor内では書くことはできる
        this.id = 32;
        this.id = 31;
    }
    incrementAge() {
        this.age += 1;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
        this.explainJob();
    }
}
// name: string;
// private age: number;
// staticを使用すればインスタンスを作らずにクラスを使える
Person.species = 'Homo sapiens';
// newを用いてインスタンスを作成していない
Person.species;
Person.isAdult(18);
let person2;
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
    explainJob() {
        console.log(`Hello My name is ${this.name}. I am ${this.age} years old.`);
    }
    get subject() {
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
    constructor(name, age, _subject) {
        super(name, age);
        this._subject = _subject;
    }
    static getInstance() {
        if (Teacher.instance)
            return Teacher.instance;
        Teacher.instance = new Teacher('Quill', 38, 'Math');
        return Teacher.instance;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`);
    }
}
const teacher = Teacher.getInstance();
teacher.greeting();
teacher.subject;
teacher.subject = 'English';
