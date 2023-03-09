// TypeScriptでJavaScriptライブラリを使う

import axios from 'axios';
axios.get('https://foodapi.com');

// DefinitelyTypedの@typesパッケージをインストールして、既存の型定義ファイルを使う
// import _ from 'lodash';
// _.shuffle([1, 2, 3, 4]);

// .d.tsファイルを作って、npmからインストールしたライブラリーを使う
// import _ from 'lodash';
// _.shuffle([1, 2, 3, 4]);

// .d.tsファイルを作って、CDNからインストールしたライブラリーを使う方法
console.log(_.shuffle([1, 2, 3, 4]));

// namespaceを使う理由 (namespaceを使うことによってコンパイル時に関数化するので変数などをスコープの関係でアクセスできないようにする働きをする)
namespace myApp {
  const hello = 'hello in namespace';
  export const name = 'Quil';
  // namespaceで型を定義する方法
  export interface Nameable {
    name: string;
  }
}
// myApp内でexportしているものならアクセスできる
const hello = myApp.name;
// myAppはコンパイル時に関数となり、スコープの関係でmyApp内のhello変数にアクセスできない
// const hello = myApp.hello;
// 型定義の際に.が付与されていたらnamespaceが使用されている確率が高い
let nameable: myApp.Nameable;

// 同じ名前の値と型とnamespaceは共存できる (typescriptの概念ではデータの種類が値、型、namespaceになっているから)

// 値
let name: string;
// function name() {

// }
// enum name {
  
// }
// class name {

// }

// 型 (classとenumは同じ名前であってもエラーが起きない)
interface name {}
// type name {}
// enum name {

// }
// class name {

// }

// namespace (中に値が存在していたら、namespaceは値として見られるが、変数のみエラーが起きる。ただしenumは中の値が同じ場合にのみエラーが起きる。型を入れるのならok。)
// namespaceは同じものを使える (同じ名前のものをexportしたらエラーが起きる)
// namespace name {
//   export const first: string = 'Peter';
// }
// namespace name {
//   export const first: string = 'Peter';
// }

// interfaceは同じものを複数作成できる (同じもの同士で合体される。同じプロパティで異なる方はダメ。メソッド名が同じ場合はオーバーロードされる。)
interface nameInterface {
  first: string;
}
interface nameInterface {
  last: string;
}
let tmp: nameInterface;
tmp = {
  first: '',
  last: ''
}
tmp.first = 'first';
tmp.last = 'last';