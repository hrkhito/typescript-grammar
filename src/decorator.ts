// デコレータファクトリを使用して、デコレータに引数を渡す方法
function Logging(message: string) {
  // デコレータを使ってClassに関数を適応する
  return function (constructor: Function) {
    console.log(message);
    console.log(constructor);
  }
}

// デコレータを使って簡易版のフレームワークを作成する
function Component(template: string, selector: string) {
  return function <T extends {new(...args: any[]): { name: string }}> (constructor: T) {
    
    // 戻り値にクラスを指定して、新しいクラスを作り出す
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const mountedElement = document.querySelector(selector);
        const instance = new constructor(32);
        if (mountedElement) {
          mountedElement.innerHTML = template;
          mountedElement.querySelector('h1')!.textContent = instance.name;
        }
      }
    }
  }
}

// プロパティーデコレータを使う方法とprototype (prototypeとはクラスのメソッドが格納される場所である。ここで言うとUserクラスが持っているprototypeは第一引数のtargetに該当する)
// プロパティーデコレータは何も返せない (returnがない)
// staticだった場合はコンストラクター関数が返ってくる (第一引数に)
function PropertyLogging(target: any, propertyKey: string) {
  console.log('propertyLogging');
  console.log(target);
  console.log(propertyKey);
}

// メソッドデコレータを使う方法とPropertyDescriptor (PropertyDescriptorは各プロパティについての情報だと思っておけばいい)
function MethodLogging(target: any, propertyKey: string, decription: PropertyDescriptor) {
  console.log('methodLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(decription);
}

// アクセサーデコレター
function AccessorLogging(target: any, propertyKey: string, decription: PropertyDescriptor) {
  console.log('accessorLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(decription);
}

// 複数のデコレータは同時に使うことができる (デコレータファクトリーは上から下に実行される。そこから得られたデコレータは下から上に実行される)
@Component('<h1>{{ name }}</h1>', '#app')
@Logging('Loggin User')
class User {
  @PropertyLogging
  name = 'Quill';
  constructor(private _age: number) {
    console.log('User was created!');
  }

  @AccessorLogging
  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }

  @MethodLogging
  greeting() {
    console.log('hello');
  }
}