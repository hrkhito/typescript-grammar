"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// デコレータファクトリを使用して、デコレータに引数を渡す方法
function Logging(message) {
    // デコレータを使ってClassに関数を適応する
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
// デコレータを使って簡易版のフレームワークを作成する
function Component(template, selector) {
    return function (constructor) {
        // 戻り値にクラスを指定して、新しいクラスを作り出す
        return class extends constructor {
            constructor(...args) {
                super(...args);
                const mountedElement = document.querySelector(selector);
                const instance = new constructor(32);
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1').textContent = instance.name;
                }
            }
        };
    };
}
// プロパティーデコレータを使う方法とprototype
function PropertyLogging(target, propertyKey) {
    console.log('propertyLogging');
    console.log(target);
    console.log(propertyKey);
}
// 複数のデコレータは同時に使うことができる (デコレータファクトリーは上から下に実行される。そこから得られたデコレータは下から上に実行される)
let User = class User {
    constructor(age) {
        this.age = age;
        this.name = 'Quill';
        console.log('User was created!');
    }
};
__decorate([
    PropertyLogging
], User.prototype, "name", void 0);
User = __decorate([
    Component('<h1>{{ name }}</h1>', '#app'),
    Logging('Loggin User')
], User);
