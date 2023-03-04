"use strict";
// ジェネリクスを使って、型を引数として受け取る
// extendsを使って型パラメータに制約を付けれる (classやインターフェースでのextendsは継承だが、ジェネリクスでのextendsはimplementsのように条件を狭めるイメージ)
function copy(value, key) {
    value[key];
    return value;
}
console.log(copy({ name: 'Quil', age: 38 }, 'age'));
// classに対してジェネリクスを使用する (型の安全性を保ちつつ、柔軟性も持てる)
class LightDatabase {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const stringLightDatabase = new LightDatabase();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());
const tmpDatabase = {
    id: 3,
    data: [32]
};
// Promise (デフォルトではPromise<unknown>を返す)
const fetchData = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});
fetchData.then(data => {
    data.toUpperCase();
});
// Array
const vegetables = ['Tomato', 'Broccoli', 'Asparagus'];
let tmp2;
let tmp3;
let tmp4;
