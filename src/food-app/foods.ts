import { Foodsable } from "./interfaces";
import { Food } from "./food";

// Foodsクラスで、全ての食べ物の要素を保持する
export class Foods implements Foodsable {
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