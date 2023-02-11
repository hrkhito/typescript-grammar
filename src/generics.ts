// ジェネリクスとは型を引数として指定できる。 ただ、<>の箇所は型推論されるので指定する必要はないのかも

// extendsを使って型パラメータに制約をつける
function copy<T extends {name: string}, U extends keyof T>(value: T, key: U): T {
  value[key];
  return value;
}
console.log(copy({ name: 'Quill', age: 38}, 'age'));

// keyofを使ってオブジェクトのキーのユニオン型を作成する方法
type K = keyof {name: string; age: number}

// classに対してジェネリクスを使用する方法
class LightDatabase<T extends string | number | boolean> {
  private data: T[] = [];
  add(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
    this.data.splice(this.data.indexOf(item),1);
  }
  get() {
    return this.data;
  }
}

const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get());

// Interfaceに対してジェネリクスを使用する方法
interface TmpDatabase1<T> {
  id: number;
  data: T[];
}
const tmpDatabase1: TmpDatabase1<number> = {
  id: 3,
  data: [32,36]
}

// typeエイリアスに対してジェネリクスを使用する方法
type TmpDatabase2<T> = {
  id: number;
  data: T[];
}
const tmpDatabase2: TmpDatabase2<number> = {
  id: 3,
  data: [32,36]
}

// 内蔵されているジェネリック型であるUtility型の紹介
interface Todo {
  title: string;
  text: string;
}
type Todoable = Partial<Todo>
type ReadTodo = Readonly<Todo>

const fetchData: Promise<string> = new Promise(resolve => {
  setTimeout(()=> {
    resolve('hello')
  },3000)
})
fetchData.then(data => {
  data.toUpperCase();
})

const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];

// デフォルトの型パラメーターを指定する方法
interface ResponseData<T extends { message: string } = any> {
  data: T;
  status: number;
  message: T;
}
let tmp2: ResponseData<{message: 'hi'}>;

// 型のfor文であるMapped Typesの使い方

interface Vegetables {
  readonly tomato: string;
  pumpkin?: string;
}
let tmp3: keyof Vegetables;
type MappedTypes = {
  -readonly [P in keyof Vegetables]-?: string;
}

// 型のif文であるConditional Typesの使い方
type ConditionalTypes = 'tomato' extends string ? number : boolean;
type ConditionalTypesInfer = { tomato: string } extends { tomato: infer R } ? R : boolean;
type DistributiveConditionalTypes<T> = T extends 'tomato' ? number : boolean
let tmp4: DistributiveConditionalTypes<'tomato' | 'pumpkin'>
let tmp5: NonNullable<string | null>;