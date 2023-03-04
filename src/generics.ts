// ジェネリクスを使って、型を引数として受け取る
// extendsを使って型パラメータに制約を付けれる (classやインターフェースでのextendsは継承だが、ジェネリクスでのextendsはimplementsのように条件を狭めるイメージ)
function copy<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
  value[key];
  return value;
}
console.log(copy({ name: 'Quil', age: 38 }, 'age'));
// keyofを使ってオブジェクトのキーのユニオン型を作成する
type K = keyof { name: string; age: number };

// classに対してジェネリクスを使用する (型の安全性を保ちつつ、柔軟性も持てる)
class LightDatabase<T extends string | number | boolean> {
  private data: T[] = [];
  add(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
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

// interfaceに対してジェネリクスを使用する方法 (typeエイリアスに対してもジェネリクスは使える)
type TmpDatabase<T> = {
  id: number;
  data: T[];
}
const tmpDatabase: TmpDatabase<number> = {
  id: 3,
  data: [32]
}

// 内蔵されているジェネリック型であるUtility型 (importしなくてもTypeScript側で用意されているもの)
interface Todo {
  title: string;
  text: string;
}
// Partial (?を付与してくれる)
type Todoable = Partial<Todo>
// Readonly (readonlyを付与してくれる)
type ReadTodo = Readonly<Todo>

// Promise (デフォルトではPromise<unknown>を返す)
const fetchData: Promise<string> = new Promise(resolve => {
  setTimeout(() => {
    resolve('hello');
  }, 3000)
})
fetchData.then(data => {
  data.toUpperCase();
})

// Array
const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus'];

// デフォルトの型パラメータを指定する
interface ResponseData<T extends { message: string } = any > {
  data: T;
  status: number;
}
let tmp2: ResponseData<{ message: 'hi' }>;

// 型のfor文であるMapped Types
interface Vegetables {
  readonly tomato: string;
  pumpkin?: string;
}
let tmp3: keyof Vegetables;
type MappedTypes = {
  readonly [P in keyof Vegetables]-?: string
}

// 型のif文であるConditional Types
type ConditionalTypes = string extends 'tomato' ? number : boolean;
type ConditionalTypesInfer = { tomato: string } extends { tomato: infer R } ? R : boolean;
type DistributiveConditionalTypes <T> = T extends 'tomato' ? number : boolean;
let tmp4: DistributiveConditionalTypes<'tomato' | 'pumpkin'>