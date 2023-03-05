interface Scoreable {
  readonly totalScore: number;
  render(): void;
}
interface Foodable {
  element: HTMLDivElement;
  clickEventHandler(): void;
}
interface Foodsable {
  elements: NodeListOf<HTMLDivElement>;
  readonly activeElements: HTMLDivElement[];
  readonly activeElementsScore: number[];
}

// トータルスコアを取得する
class Score implements Scoreable {
  private static instance: Score;
  get totalScore() {
    const foods = Foods.getInstance();
    return foods.activeElementsScore.reduce((total, score) => total + score, 0);
  }
  // 取得したトータルスコアを表示する
  render() {
    document.querySelector('.score__number')!.textContent = String(this.totalScore);
  }

  private constructor() {}
  static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}

// 一つの食べ物のクラス
class Food implements Foodable {
  constructor(public element: HTMLDivElement) {
    // bindメソッドに指定する第一引数はその関数に対してのthisになる (今回で言うと、thisを渡しているがそれはFoodクラスという意味になる)
    element.addEventListener('click', this.clickEventHandler.bind(this));
  }
  clickEventHandler() {
    // コールバック関数として呼ばれた関数内のthisは正しいthisではなくなる (今回で言うと、thisはFoodクラスそのものを指し示すのではなくelementを表すことになる)
    this.element.classList.toggle('food--active');
    const score = Score.getInstance();
    score.render();
  }
}

// Foodsクラスで、全ての食べ物の要素を保持する
class Foods implements Foodsable {
  private static instance: Foods;
  elements = document.querySelectorAll<HTMLDivElement>('.food');
  // activeな食べ物の配列
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];

  get activeElements() {
    this._activeElements = [];
    this.elements.forEach(element => {
      if(element.classList.contains('food--active')) {
        this._activeElements.push(element);
      }
    })
    return this._activeElements;
  }

  get activeElementsScore() {
    this._activeElementsScore = [];
    this.activeElements.forEach(element => {
      const foodScore = element.querySelector('.food__score');
      // foodScoreはnull又はElementだから
      if (foodScore) {
        // Numberに入れると、nullだった場合も0に変換してくれる
        this._activeElementsScore.push(Number(foodScore.textContent))
      }
    })
    return this._activeElementsScore;
  }

  // newでFoodsインスタンスを作成できなくするためにconstructor関数の前にprivateを付与する
  private constructor() {
    this.elements.forEach(element => {
      new Food(element);
    })
  }
  // シングルトンパターンを用いる
  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods();
    }
    return Foods.instance;
  }
}
const foods = Foods.getInstance();