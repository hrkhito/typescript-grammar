"use strict";
var _a, _b, _c;
// interface EngineerBlogger extends Engineer, Blogger {}
const quil = {
    name: 'Quil',
    role: 'front-end',
    follower: 1000
};
function toUpperCase(x) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
}
const upperHello = toUpperCase('hello');
const upperHello1 = function (x) { return 0; };
let unionFunc;
unionFunc = function (a) { return 3; };
unionFunc('a');
function describeProfile(nomadWorker) {
    // EngineerとBloggerに共通してあるプロパティはnameのみ
    console.log(nomadWorker.name);
    // オブジェクト内に指定のキーが存在していたら
    if ('role' in nomadWorker) {
        console.log(nomadWorker.role);
        console.log(nomadWorker.name);
    }
    // オブジェクト内に指定のキーが存在していたら
    if ('follower' in nomadWorker) {
        console.log(nomadWorker.follower);
        console.log(nomadWorker.name);
    }
}
class Dog {
    constructor() {
        // タグ付きユニオンを使って型を絞り込む
        this.kind = 'dog';
    }
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    constructor() {
        // タグ付きユニオンを使って型を絞り込む
        this.kind = 'bird';
    }
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}
function havePet(pet) {
    pet.speak();
    switch (pet.kind) {
        case 'bird':
            pet.fly();
    }
    // Birdから生成されたインスタンスであった時に条件を満たす
    if (pet instanceof Bird) {
        pet.fly();
        pet.speak();
    }
}
havePet(new Bird());
const designer = {
    name: 'Quil',
    role: 'Web'
};
designer.position = 'backend';
const downloadedData = {
    id: 1
};
console.log((_b = (_a = downloadedData.user) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.first);
// Nullish Coalescingの使い方 (undefined又はnullの場合に??の右側が返される)
const userData = (_c = downloadedData.user) !== null && _c !== void 0 ? _c : 'no-user';
// 型の互換性については慣れて覚えるしかない (都度調べればok)
// 変数の互換性や、enum、オブジェクト、クラス、関数などそれぞれの互換性があるがパターンが多いので割愛
// TypeScriptの型安全性とJavaScriptの柔軟性について (TypeScriptでも文字列+数字はエラーにならず文字列として返ってくる。厳格な型審査を行なっているのではなくJavaScriptのように柔軟に対応する一面も持っている)
// レストパラメーターに配列やタプルを指定する方法 (レストパラメータとは残余引数構文により、関数が不定数の引数を配列として受け入れることができるもの)
// readonly修飾子をつけることができる
function advancedFn(...args) {
}
advancedFn(1, 'hi', true, 2, 3, 4);
// constアサーション
let milk = 'milk';
let drink = milk;
// 配列にconstアサーションを付与すればタプル型の配列でreadonly修飾子が付与される
const array = [10, 20];
// オブジェクトにconstアサーションを付与すれば全てのキーにreadonly修飾子が付与されたオブジェクトになる
const peter = {
    name: 'Peter',
    age: 38
};
