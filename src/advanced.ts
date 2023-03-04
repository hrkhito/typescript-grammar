type Engineer = {
  name: string;
  role: string;
}

type Blogger = {
  name: string;
  follower: number;
}

type EngineerBlogger = Engineer & Blogger;
// interface EngineerBlogger extends Engineer, Blogger {}

const quil: EngineerBlogger = {
  name: 'Quil',
  role: 'front-end',
  follower: 1000
}

type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber;

// 関数のオーバーロードを使って、戻り値の型を正しくTypeScriptに伝える方法 (1つでもオーバーロードがあると元の関数の型定義は無効化されてしまうので、必要な分だけオーバーロードをした方がいい)
// オーバーロードは一番上から審査されていく
// 関数型のオーバーロードはinterfaceで定義する必要がある
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number): string | number {
  if (typeof x === 'string') {
    return x.toUpperCase();
  }
  return x;
}

const upperHello = toUpperCase('hello');

interface TmpFunc {
  (x: string): number;
  (x: number): number;
}
const upperHello1: TmpFunc = function (x: string | number) { return 0 };

// 関数型のインターセクションはオーバーロードになる
// interface FuncA {
//   (a: number, b: string): number;
//   (a: string, b: number): number;
// }
// interface FuncB {
//   (a: string): number;
// }
// let intersectionFunc: FuncA & FuncB;
// intersectionFunc = function (a: number | string, b?: string | number) { return 10 };

// 関数型のユニオン型はパラメータがインターセクション型、戻り値はユニオン型になる
interface FuncA {
  (a: number): number;
}
interface FuncB {
  (a: string): number;
}
let unionFunc: FuncA | FuncB;
unionFunc = function (a: string) { return 3 }
unionFunc('a');
// 第一引数はnever型を指定しないといけない
// unionFunc('', '');

// let unionFunc: (a: never) => number;
// unionFunc = function (a: number) { return 34 };
// unionFunc(34);

type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
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
  // タグ付きユニオンを使って型を絞り込む
  kind: 'dog' = 'dog';
  speak() {
    console.log('bow-wow');
  }
}

class Bird {
  // タグ付きユニオンを使って型を絞り込む
  kind: 'bird' = 'bird';
  speak() {
    console.log('tweet-tweet');
  }
  fly () {
    console.log('flutter');
  }
}

type Pet = Dog | Bird;

function havePet(pet: Pet) {
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

// 型アサーションを使って、手動で型を上書きする
// const input = document.getElementById('input') as HTMLInputElement;
// input.value = 'initial input value';
// (document.getElementById('input') as HTMLInputElement).value ='initial input value';

// !を使って、nullじゃないと言い切る方法
// const input = document.getElementById('input')!;

// インデックスシグネチャを使用して柔軟なオブジェクトを作る方法 (後からプロパティを追加できる)
interface Designer {
  name: string;
  [index: string]: string;
}
const designer: Designer = {
  name: 'Quil',
  role: 'Web'
}
designer.position = 'backend';

interface DownloadedData {
  id: number;
  user?: {
    name?: {
      first: string;
      last: string;
    }
  }
}

const downloadedData: DownloadedData = {
  id: 1
}
console.log(downloadedData.user?.name?.first);
// Nullish Coalescingの使い方 (undefined又はnullの場合に??の右側が返される)
const userData = downloadedData.user ?? 'no-user';
// LookUp型を使ってオブジェクトのメンバーの型を取得する方法
type id = DownloadedData["id" | "user"];

// 型の互換性については慣れて覚えるしかない (都度調べればok)
// 変数の互換性や、enum、オブジェクト、クラス、関数などそれぞれの互換性があるがパターンが多いので割愛

// TypeScriptの型安全性とJavaScriptの柔軟性について (TypeScriptでも文字列+数字はエラーにならず文字列として返ってくる。厳格な型審査を行なっているのではなくJavaScriptのように柔軟に対応する一面も持っている)

// レストパラメーターに配列やタプルを指定する方法 (レストパラメータとは残余引数構文により、関数が不定数の引数を配列として受け入れることができるもの)
// readonly修飾子をつけることができる
function advancedFn(...args: readonly [number, string, boolean?, ...number[]]) {

}
advancedFn(1, 'hi', true, 2, 3, 4);

// constアサーション
let milk = 'milk' as const;
let drink = milk;

// 配列にconstアサーションを付与すればタプル型の配列でreadonly修飾子が付与される
const array = [10, 20] as const;

// オブジェクトにconstアサーションを付与すれば全てのキーにreadonly修飾子が付与されたオブジェクトになる
const peter = {
  name: 'Peter',
  age: 38
} as const;

// 型の中でのtypeofの使い方 (よく使う)
type PeterType = typeof peter;