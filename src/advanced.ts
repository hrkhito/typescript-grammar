type Engineer = {
  name: string;
  role: string;
}

type Blogger = {
  name: string;
  follower: number;
}

type EngineerBlogger = Engineer & Blogger;

const quill: EngineerBlogger = {
  name: 'Quill',
  role: 'front-end',
  follower: 1000
}

// string & number という値は存在しないのでnever型になる
type tmp = string & number;

// type Engineer1 = {
//   name: string;
//   role: string;
// }

// interface Blogger1 {
//   name: string;
//   follower: number;
// }

// interface EngineerBlogger1 extends Engineer1, Blogger1 {}

// 部分集合の例
type NumberBoolean = number | boolean;
type StringNumber =  string | number;
type Mix = NumberBoolean & StringNumber;

// 条件文を使って型を絞り込む、3つのType guard

// オーバーロードは上から順に適用されていく
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: any): any;
function toUpperCase(x: string | number) {
  if (typeof x === 'string') {
    return x.toUpperCase();
  }
  return x;
}
toUpperCase('hello');
toUpperCase(3);
toUpperCase(true);

// 関数型のオーバーロードはinterfaceで定義する必要がある
interface TmpFunc {
  (x: string): number;
  (x: number): number;
}

const upperHello: TmpFunc = function(x: string | number) {return 0};

type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
  console.log(nomadWorker.name);
  if ('role' in nomadWorker) {
    console.log(nomadWorker.role);
  }
  if ('follower' in nomadWorker) {
    console.log(nomadWorker.follower);
  }
}

class Dog {
  // タグ付きUnion
  kind: 'dog' = 'dog';
  speak() {
    console.log('bow-wow');
  }
}

class Bird {
  // タグ付きUnion
  kind: 'bird' = 'bird';
  speak() {
    console.log('tweet-tweet');
  }
  fly() {
    console.log('flutter');
  }
}

type Pet = Dog | Bird;

function havePet(pet: Pet) {
  pet.speak();

  // if文での条件分岐の数が多くなりそうな時に有効
  switch (pet.kind) {
    case 'bird':
      pet.fly();
  }

  // in演算子でもいける
  if ('fly' in pet) {
    pet.fly();
  }
  // instanceofはBirdから生成されたインスタンスの時に使用できる
  if (pet instanceof Bird) {
    pet.fly();
  }
}

havePet(new Bird());

// typeof,in,instanceof演算子はjavascriptにもある

// 型アサーションを使って、手動で型を上書きする方法

// const input = <HTMLInputElement>document.getElementById('input');
const input = document.getElementById('input') as HTMLInputElement;
input.value = 'initial input value';
(<HTMLInputElement>document.getElementById('input')).value = 'initial input value';

// インデックスシグネチャを使用して柔軟なオブジェクトを作る方法(使い方に注意)
interface Designer {
  name: string;
  [index: string]: string;
}

const designer: Designer = {
  name: 'Quill',
  role: 'Web',
  age: '32',
  10: '32'
}

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

// undefined又はnullの時にno-userを返す。falseの時に必ず返すものではない
const userData = downloadedData.user ?? 'no-user';
// const userData = downloadedData.user || 'no-user';

// LookUp型を使ってオブジェクトのメンバーの型を取得する方法
type id = DownloadedData["id"];

// 関数型のインターセクションはオーバーロードになる

// interface FuncA {
//   (a: number, b: string): number;
//   (a: string, b: number): number;
// }
// interface FuncB {
//   (a: string): number;
// }

// let intersectionFunc: FuncA & FuncB;

// intersectionFunc = function(a: number | string, b?: string | number) {return 0}

// 関数型のユニオン型はパラメータがインターセクション型、戻り値はユニオン型になる
interface FuncA {
  (a: number, b: string): number;
}
interface FuncB {
  (a: string): string;
}

let unionFunc: FuncA | FuncB;

// レストパラメータに配列やタプルを指定する方法 また配列とタプルにはreadonly修飾子をつけれる

function advancedFn(...args: readonly [number, string, boolean, ...number[]]) {
}
advancedFn(0,'hi',true,1,2,3,4,5)

// constアサーションはreadonly修飾子として使える
const array = [10, 20] as const;
const peter = {
  name: 'Peter',
  age: 38
} as const;

// constアサーションのリテラル指定としての使い方
const milk = 'milk' as const;
let drink = milk;

// 型の中でのtypeofの使い方
type PeterType = typeof peter;